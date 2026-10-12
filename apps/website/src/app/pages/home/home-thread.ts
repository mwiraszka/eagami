import {
  TIMELINE_HEIGHT,
  TIMELINE_NODE_PATH,
  TIMELINE_WIDTH,
} from './home-process-timeline.component';

/** A rectangle in the home page's own coordinate space, in px */
export interface ThreadBox {
  top: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
}

export interface HomeThreadLayout {
  width: number;
  height: number;
  /** Distance from the page edge to where section content starts */
  contentInset: number;
  /** Rendered height of the section curves, which shrink with the page width */
  curveHeight: number;
  hero: ThreadBox;
  services: ThreadBox;
  process: ThreadBox;
  timeline: ThreadBox;
  projects: ThreadBox;
  contact: ThreadBox;
  contactTitle: ThreadBox;
  contactTitleLine: number;
  /** Where the contact heading's first line of text starts, which centring moves */
  contactTitleStart: number;
}

export interface HomeThread {
  viewBox: string;
  height: number;
  d: string;
  endX: number;
  endY: number;
  endRadius: number;
  /** Gradient offsets where the line eases into, holds, and eases out of its on-band tone */
  bandStops: readonly [number, number, number, number];
}

/* The section curves are drawn in a 1440 x 96 box scaled to their rendered size,
   so the line follows them by scaling the same coordinates */
const CURVE_WIDTH = 1440;
const CURVE_HEIGHT = 96;

type Point = readonly [x: number, y: number];
type Cubic = readonly [Point, Point, Point, Point];

/* The projects curve's top edge, lowered so the line runs just inside the band */
const BAND_TRACK: readonly Cubic[] = [
  [
    [1440, 52],
    [1180, 100],
    [820, 108],
    [520, 68],
  ],
  [
    [520, 68],
    [300, 39],
    [140, 44],
    [0, 76],
  ],
];
/* How far in from each gutter the line joins and leaves the band's top curve */
const BAND_TURN = 64;

const END_RADIUS = 6;
/* Space between the end dot and the heading it points at */
const END_GAP = 24;
/* The line stops short of the end dot by its own round cap, so the cap just meets the dot's edge */
const LINE_CAP = 1;

class PathBuilder {
  private readonly commands: string[] = [];

  move(x: number, y: number): this {
    this.commands.push(`M${round(x)},${round(y)}`);
    return this;
  }

  line(x: number, y: number): this {
    this.commands.push(`L${round(x)},${round(y)}`);
    return this;
  }

  curve(x1: number, y1: number, x2: number, y2: number, x: number, y: number): this {
    this.commands.push(
      `C${round(x1)},${round(y1)} ${round(x2)},${round(y2)} ${round(x)},${round(y)}`,
    );
    return this;
  }

  toString(): string {
    return this.commands.join(' ');
  }
}

function round(value: number): number {
  return Math.round(value * 10) / 10;
}

function lerp(a: Point, b: Point, t: number): Point {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

/** Splits a cubic at `t` into the parts before and after it */
function splitCubic([p0, p1, p2, p3]: Cubic, t: number): [Cubic, Cubic] {
  const a = lerp(p0, p1, t);
  const b = lerp(p1, p2, t);
  const c = lerp(p2, p3, t);
  const ab = lerp(a, b, t);
  const bc = lerp(b, c, t);
  const mid = lerp(ab, bc, t);
  return [
    [p0, a, ab, mid],
    [mid, bc, c, p3],
  ];
}

/** Where a cubic whose x only ever decreases reaches `x` */
function tAtX([p0, p1, p2, p3]: Cubic, x: number): number {
  let low = 0;
  let high = 1;
  for (let i = 0; i < 32; i++) {
    const t = (low + high) / 2;
    const u = 1 - t;
    const tx =
      u * u * u * p0[0] +
      3 * u * u * t * p1[0] +
      3 * u * t * t * p2[0] +
      t * t * t * p3[0];
    if (tx > x) {
      low = t;
    } else {
      high = t;
    }
  }
  return (low + high) / 2;
}

/** The stretch of a right-to-left track between two x positions */
function sliceTrack(track: readonly Cubic[], from: number, to: number): Cubic[] {
  const pieces: Cubic[] = [];
  for (const cubic of track) {
    const start = cubic[0][0];
    const end = cubic[3][0];
    if (start <= to || end >= from) {
      continue;
    }
    const t1 = end < to ? tAtX(cubic, to) : 1;
    const t0 = start > from ? tAtX(cubic, from) : 0;
    const [head] = splitCubic(cubic, t1);
    pieces.push(splitCubic(head, t0 / t1)[1]);
  }
  return pieces;
}

/** A point `distance` from `from`, heading toward `toward` */
function along(from: Point, toward: Point, distance: number): Point {
  const length = Math.hypot(toward[0] - from[0], toward[1] - from[1]);
  return lerp(from, toward, distance / length);
}

/**
 * One continuous line from the hero's bottom curve to the contact heading:
 * along the hero curve, down the right margin, across the foot of the services,
 * through every node of the process timeline, along the projects band's top
 * curve, down the left margin and into the contact section.
 */
export function buildHomeThread(layout: HomeThreadLayout): HomeThread {
  const { width } = layout;
  // The vertical runs sit in the middle of the gutter beside the content
  const left = layout.contentInset / 2;
  const right = width - left;
  const scale = width / CURVE_WIDTH;
  const curveScale = layout.curveHeight / CURVE_HEIGHT;
  const path = new PathBuilder();

  const heroCurveTop = layout.hero.bottom - layout.curveHeight;
  const hx = (x: number): number => x * scale;
  const hy = (y: number): number => heroCurveTop + y * curveScale;
  path
    .move(0, hy(62))
    .curve(hx(300), hy(14), hx(620), hy(6), hx(900), hy(46))
    .curve(hx(1110), hy(82), right, hy(66), right, layout.hero.bottom);

  const services = layout.services;
  path
    .curve(
      right + width * 0.005,
      services.top + services.height * 0.3,
      right - width * 0.005,
      services.top + services.height * 0.6,
      right,
      services.bottom - 72,
    )
    .curve(
      right,
      services.bottom - 36,
      right - width * 0.06,
      services.bottom - 36,
      width / 2,
      services.bottom - 36,
    )
    .curve(
      left + width * 0.06,
      services.bottom - 36,
      left,
      services.bottom - 36,
      left,
      services.bottom,
    );

  const timeline = layout.timeline;
  const tx = (x: number): number => timeline.left + (x / TIMELINE_WIDTH) * timeline.width;
  const ty = (y: number): number =>
    timeline.top + (y / TIMELINE_HEIGHT) * timeline.height;
  const [startX, startY] = TIMELINE_NODE_PATH.start;
  path
    .line(left, ty(startY) - 64)
    .curve(
      left,
      ty(startY) - 16,
      left + (tx(startX) - left) * 0.3,
      ty(startY),
      tx(startX),
      ty(startY),
    );
  for (const [x1, y1, x2, y2, x, y] of TIMELINE_NODE_PATH.segments) {
    path.curve(tx(x1), ty(y1), tx(x2), ty(y2), tx(x), ty(y));
  }
  const [endNodeX, endNodeY] = TIMELINE_NODE_PATH.end;
  path
    .curve(
      tx(endNodeX) + (right - tx(endNodeX)) * 0.7,
      ty(endNodeY),
      right,
      ty(endNodeY) + 8,
      right,
      ty(endNodeY) + 72,
    )
    .line(right, layout.process.bottom);

  const projects = layout.projects;
  const bandTop = projects.top + layout.curveHeight;
  const bandBottom = projects.bottom - layout.curveHeight;
  const toPage = ([x, y]: Point): Point => [x * scale, projects.top + y * curveScale];
  const track = BAND_TRACK.map(([p0, p1, p2, p3]): Cubic => [
    toPage(p0),
    toPage(p1),
    toPage(p2),
    toPage(p3),
  ]);
  const turn = BAND_TURN * Math.min(scale, 1);
  const band = sliceTrack(track, right - turn, left + turn);
  const [entry, entryHandle] = band[0];
  const [, , exitHandle, exit] = band[band.length - 1];
  const above = layout.process.bottom;
  const entryControl = along(entry, entryHandle, -turn * 0.6);
  path.curve(
    right,
    above + (entry[1] - above) * 0.55,
    entryControl[0],
    entryControl[1],
    entry[0],
    entry[1],
  );
  for (const [, c1, c2, end] of band) {
    path.curve(c1[0], c1[1], c2[0], c2[1], end[0], end[1]);
  }
  const exitControl = along(exit, exitHandle, -turn * 0.6);
  path.curve(
    exitControl[0],
    exitControl[1],
    left,
    bandTop - (bandTop - exit[1]) * 0.45,
    left,
    bandTop,
  );
  path
    .curve(
      left - width * 0.006,
      bandTop + (bandBottom - bandTop) * 0.35,
      left + width * 0.006,
      bandTop + (bandBottom - bandTop) * 0.65,
      left,
      bandBottom,
    )
    .line(left, projects.bottom);

  const title = layout.contactTitle;
  const endY = title.top + layout.contactTitleLine / 2;
  const endX = layout.contactTitleStart - END_GAP - END_RADIUS;
  path.curve(
    left,
    endY - (endY - layout.contact.top) * 0.2,
    left + (endX - left) * 0.2,
    endY,
    endX - END_RADIUS - LINE_CAP,
    endY,
  );

  const offset = (y: number): number => round((y / layout.height) * 1000) / 1000;

  return {
    viewBox: `0 0 ${round(width)} ${round(layout.height)}`,
    height: round(layout.height),
    d: path.toString(),
    endX: round(endX),
    endY: round(endY),
    endRadius: END_RADIUS,
    bandStops: [
      offset(projects.top),
      offset(bandTop),
      offset(bandBottom),
      offset(projects.bottom),
    ],
  };
}

/* How far the page must scroll per px of mostly horizontal line, so runs that
   cross the page draw progressively instead of appearing all at once */
const HORIZONTAL_SCROLL_RATIO = 0.25;
const SAMPLE_STEP = 6;

export interface ThreadSamples {
  total: number;
  lengths: Float64Array;
  reach: Float64Array;
}

/**
 * Pairs points along the drawn path with the scroll depth at which each should
 * appear. Depth is the point's own height on the page, never decreasing, and
 * always advancing a little along horizontal runs.
 */
export function sampleThread(path: SVGPathElement): ThreadSamples {
  const total = path.getTotalLength();
  const count = Math.ceil(total / SAMPLE_STEP) + 1;
  const lengths = new Float64Array(count);
  const reach = new Float64Array(count);

  for (let i = 0; i < count; i++) {
    const length = Math.min(i * SAMPLE_STEP, total);
    const y = path.getPointAtLength(length).y;
    lengths[i] = length;
    reach[i] =
      i === 0
        ? y
        : Math.max(y, reach[i - 1] + (length - lengths[i - 1]) * HORIZONTAL_SCROLL_RATIO);
  }

  return { total, lengths, reach };
}

/** Length of line to show when the drawing tip sits at `depth` px down the page */
export function threadLengthAt(samples: ThreadSamples, depth: number): number {
  const { lengths, reach } = samples;
  if (depth < reach[0]) {
    return 0;
  }

  let low = 0;
  let high = reach.length - 1;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    if (reach[mid] <= depth) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }
  return lengths[low];
}
