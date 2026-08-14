// Enforces the documented CSS property order (CONTRIBUTING.md, "CSS/SCSS
// property order") so the ordering never depends on a reviewer noticing it.
// Properties outside the documented groups are ignored, as are custom
// properties, at-rules, and nested selectors.
//
// `--since=<ref>` reports only lines the working tree adds on top of that ref,
// which is how CI and the pre-push hook run it: the stylesheets predate the
// rule by some hundreds of declarations, so a whole-tree run is an audit rather
// than a gate.
//
// Usage: node scripts/check-css-property-order.mjs [--since=<ref>] [dir ...]
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '../../..');

const GROUPS = [
  // 1. Display and positioning
  `z-index position top right bottom left overflow overflow-x overflow-y opacity
   visibility display vertical-align object-fit object-position container-type place-self
   justify-self align-self table-layout`,
  // 2. Flexbox and grid
  `flex flex-flow flex-direction flex-wrap flex-grow flex-shrink flex-basis align-items
   align-content justify-content gap row-gap column-gap grid grid-area grid-template
   grid-template-columns grid-template-rows grid-template-areas grid-column grid-row
   grid-auto-columns grid-auto-rows grid-auto-flow grid-gap`,
  // 3. Box model
  `box-sizing width min-width max-width height min-height max-height padding padding-top
   padding-right padding-bottom padding-left padding-block padding-inline margin
   margin-top margin-right margin-bottom margin-left margin-block margin-inline
   aspect-ratio`,
  // 4. Typography
  `font-size font-weight line-height text-align text-transform white-space word-wrap
   letter-spacing font-family font-style text-decoration text-overflow text-shadow
   word-break overflow-wrap list-style text-rendering text-size-adjust
   -webkit-line-clamp -webkit-box-orient line-clamp break-inside column-count`,
  // 5. Colour and borders
  `border border-top border-right border-bottom border-left border-width border-style
   border-color border-radius border-top-left-radius border-top-right-radius
   border-bottom-left-radius border-bottom-right-radius border-spacing outline
   outline-offset box-shadow background background-color background-image background-size
   background-position background-repeat color accent-color filter backdrop-filter`,
  // 6. Interaction
  `cursor pointer-events user-select appearance resize scrollbar-gutter scroll-behavior`,
  // 7. Animation
  `transition transform animation animation-delay animation-duration
   animation-timing-function animation-iteration-count animation-direction
   animation-fill-mode animation-play-state will-change transform-origin`,
  // 8. Miscellaneous
  `content quotes page-break-inside`,
];

const RANK = new Map();
GROUPS.forEach((group, index) => {
  for (const property of group.split(/\s+/).filter(Boolean)) {
    RANK.set(property, index);
  }
});

// `column-gap` and `gap` belong to the flex group; `column-count` to typography.
// A property listed twice would otherwise take whichever rank came last.
RANK.set('gap', 1);
RANK.set('column-gap', 1);

function scssFiles(dir) {
  const found = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      found.push(...scssFiles(path));
    } else if (name.endsWith('.scss')) {
      found.push(path);
    }
  }
  return found;
}

/**
 * Line numbers each `.scss` file gains on top of `ref`, keyed by absolute path.
 * One diff of the working tree against the merge base, so the numbers it
 * reports and the numbers the files are read at are the same coordinates.
 */
function addedLines(ref) {
  const git = (...args) => execFileSync('git', args, { cwd: repo, encoding: 'utf8' });
  let base = ref;
  try {
    base = git('merge-base', ref, 'HEAD').trim();
  } catch {
    // A shallow clone has no common ancestor to find; diffing the ref itself
    // still covers every line this branch adds, plus any the ref moved on
  }
  const lines = new Map();
  let file = null;
  for (const line of git('diff', '-U0', base, '--', '*.scss').split('\n')) {
    const header = line.match(/^\+\+\+ b\/(.+)$/);
    if (header) {
      file = resolve(repo, header[1]);
      continue;
    }
    const hunk = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/);
    if (hunk && file) {
      const start = Number(hunk[1]);
      const count = hunk[2] === undefined ? 1 : Number(hunk[2]);
      const seen = lines.get(file) ?? new Set();
      for (let i = 0; i < count; i++) {
        seen.add(start + i);
      }
      lines.set(file, seen);
    }
  }
  return lines;
}

/** Declarations in source order per block, with blocks kept separate. */
function checkFile(path) {
  const source = readFileSync(path, 'utf8');
  const problems = [];
  // Highest rank seen so far in each open block, innermost last
  const stack = [{ rank: -1, property: null }];
  let pending = '';
  let pendingLine = 0;

  source.split('\n').forEach((raw, index) => {
    const line = raw.replace(/\/\/.*$/, '').trim();
    if (!line) {
      return;
    }

    // A declaration may wrap over several lines, e.g. a long `var()` fallback
    if (pending) {
      pending += ` ${line}`;
    } else if (/^[-\w]+\s*:/.test(line) && !line.startsWith('--')) {
      pending = line;
      pendingLine = index + 1;
    }

    if (pending) {
      if (!pending.includes(';')) {
        return;
      }
      const property = pending.slice(0, pending.indexOf(':')).trim();
      pending = '';
      const rank = RANK.get(property);
      const block = stack[stack.length - 1];
      if (rank !== undefined) {
        if (rank < block.rank) {
          problems.push({
            path,
            line: pendingLine,
            message: `${property} belongs above ${block.property}`,
          });
        }
        // Resync either way, so one misplaced declaration reports once instead
        // of flagging every properly ordered property that follows it
        block.rank = rank;
        block.property = property;
      }
      return;
    }

    for (const char of line) {
      if (char === '{') {
        stack.push({ rank: -1, property: null });
      } else if (char === '}' && stack.length > 1) {
        stack.pop();
      }
    }
  });

  return problems;
}

const args = process.argv.slice(2);
const since = args.find(arg => arg.startsWith('--since='))?.slice('--since='.length);
const targets = args.filter(arg => !arg.startsWith('--'));
const roots = (
  targets.length > 0 ? targets : ['packages/ui/src', 'apps/website/src']
).map(dir => resolve(repo, dir));

let problems = roots.flatMap(root => scssFiles(root).flatMap(checkFile));

if (since) {
  const touched = addedLines(since);
  problems = problems.filter(problem => touched.get(problem.path)?.has(problem.line));
}

if (problems.length > 0) {
  console.error(`\nCSS property order (${problems.length}):`);
  for (const problem of problems) {
    console.error(
      `  ${relative(repo, problem.path)}:${problem.line}  ${problem.message}`,
    );
  }
  console.error('\nSee the CSS/SCSS property order list in CONTRIBUTING.md.\n');
  process.exitCode = 1;
} else {
  console.log(
    since
      ? `CSS property order OK (lines added since ${since})`
      : 'CSS property order OK',
  );
}
