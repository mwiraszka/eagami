// Enforces the CHANGELOG conventions on the entry a release is about to ship:
// Keep a Changelog section headings, one short sentence per bullet, and a
// present-tense verb up front. Only the topmost (or named) version is checked,
// since the historical entries predate the rules.
//
// Usage: node scripts/check-changelog-format.mjs <changelog> [version]
import { readFileSync } from 'node:fs';

const SECTIONS = new Set(['Added', 'Changed', 'Fixed']);

// Opening verbs the changelogs already use. Extend it when an entry genuinely
// needs a verb that is not here yet; the point is to catch a noun phrase, not
// to police vocabulary.
const VERBS = new Set(
  `Accept Add Align Allow Anchor Animate Announce Apply Balance Bring Build Bump Cap Capitalise
   Capitalize Carry Center Centre Change Clear Confine Consolidate Correct Cycle Darken Deepen
   Default Deliver Deprecate Derive Direct Disable Dismiss Display Document Double
   Download Draw Drop Eliminate Emit Enlarge Ensure Expand Export Expose Extend Feature
   Fill Fix Flatten Fold Follow Forward Gate Generate Give Group Guard Handle Hide Hold Honor
   Host Improve Increase Inline Inset Integrate Introduce Keep Lay Layer Let Lift Lighten
   Limit Link List Load Localize Make Mark Match Mention Migrate Mirror Move Name Narrow Normalize
   Observe Offer Offset Open Overlap Override Pick Pin Point Polish Preload Present Preserve
   Prevent Publish Put Quiet Rebalance Rebuild Redesign Redraw Reduce Refine Reformat
   Refresh Reinstate Release Remove Rename Render Replace Reposition Rescale Reserve
   Resolve Restate Restore Restructure Retire Retune Reword Rework Rewrite Round Route
   Run Scaffold Scale Scope Scroll Send Separate Set Share Shift Ship Shorten Show
   Showcase Shrink Simplify Sit Size Skip Soften Sort Space Span Split Spread Stack Stage
   Standardize State Step Stop Stretch Strip Stub Support Suppress Surface Swap Sweep
   Switch Sync Take Tidy Tighten Toggle Tone Translate Trim Tuck Tune Turn Unify Untangle Unwrap
   Update Upgrade Use Wire Wrap`.split(/\s+/),
);

const [file, version] = process.argv.slice(2);
if (!file) {
  console.error('usage: check-changelog-format.mjs <changelog> [version]');
  process.exit(2);
}

const lines = readFileSync(file, 'utf8').split('\n');
const heading = version ? `## [${version}]` : null;
const start = lines.findIndex(line =>
  heading ? line.startsWith(`${heading} `) : /^## \[/.test(line),
);
if (start === -1) {
  console.error(`${file}: no ${heading ?? 'version'} entry found`);
  process.exit(1);
}

const end = lines.findIndex((line, i) => i > start && /^## \[/.test(line));
const body = lines.slice(start, end === -1 ? lines.length : end);
const label = body[0].trim();
const problems = [];

let section = null;
let entries = 0;
for (const line of body.slice(1)) {
  const sectionMatch = line.match(/^### (.+)$/);
  if (sectionMatch) {
    section = sectionMatch[1].trim();
    if (!SECTIONS.has(section)) {
      problems.push(`section "${section}" is not one of ${[...SECTIONS].join(', ')}`);
    }
    continue;
  }
  if (!line.startsWith('- ')) {
    continue;
  }

  entries++;
  const entry = line.slice(2).trim();
  const first = entry.replace(/^\*\*Breaking:\*\* /, '').split(/[\s,:]/)[0];
  if (!VERBS.has(first)) {
    problems.push(
      `"${entry}" does not open with a known present-tense verb ("${first}"); ` +
        'reword it, or add the verb to VERBS in this script',
    );
  }
  if (!entry.endsWith('.')) {
    problems.push(`"${entry}" does not end with a period`);
  }
  if (/\.\s+[A-Z(]/.test(entry)) {
    problems.push(`"${entry}" runs to more than one sentence; keep entries to one`);
  }
  if (entry.includes('—')) {
    problems.push(`"${entry}" contains an em-dash`);
  }
  if (!section) {
    problems.push(`"${entry}" sits outside an Added/Changed/Fixed section`);
  }
}

if (entries === 0) {
  problems.push('entry has no bullets');
}

if (problems.length > 0) {
  console.error(`\n${file} ${label}`);
  for (const problem of problems) {
    console.error(`  - ${problem}`);
  }
  console.error('');
  process.exit(1);
}

console.log(`${file} ${label}: format OK (${entries} entries)`);
