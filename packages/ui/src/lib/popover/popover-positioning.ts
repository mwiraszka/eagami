/**
 * Placement of the popover relative to its anchor. Each outside placement names
 * the side of the anchor the popover attaches to, optionally followed by a corner
 * suffix (`-start` or `-end`) that decides the alignment along the perpendicular
 * axis. The plain side names (`top`, `bottom`, `left`, `right`) centre the
 * popover on that axis. The `inside-` placements sit over the anchor instead,
 * see {@link PopoverInsidePlacement}.
 */
export type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'right'
  | PopoverInsidePlacement;

/**
 * Placements that sit over the anchor rather than beside it: pinned inside one of
 * its corners (`inside-top-start`), centred along one of its edges (`inside-top`,
 * `inside-start`), or centred on it (`inside-center`). `start` and `end` follow the
 * reading direction, so `inside-top-start` is the top-left corner in LTR and the
 * top-right corner in RTL. The offset insets the popover from the edges it is
 * pinned to, and it never flips.
 */
export type PopoverInsidePlacement =
  | 'inside-top-start'
  | 'inside-top'
  | 'inside-top-end'
  | 'inside-start'
  | 'inside-center'
  | 'inside-end'
  | 'inside-bottom-start'
  | 'inside-bottom'
  | 'inside-bottom-end';

/** A point in viewport coordinates, such as a pointer event's `clientX` and `clientY`. */
export interface PopoverAnchorPoint {
  readonly x: number;
  readonly y: number;
}

export interface PopoverPositionResult {
  /** Top coordinate in viewport (px); pairs with `position: fixed`. */
  readonly top: number;
  /** Left coordinate in viewport (px). */
  readonly left: number;
  /** Width hint when the popover should match the anchor's width. */
  readonly width?: number;
  /** The anchor's measured width, for a caller capping the popover against it. */
  readonly anchorWidth: number;
  /** Effective placement after any flip logic ran. */
  readonly placement: PopoverPlacement;
}

export interface PopoverPositionOptions {
  readonly placement: PopoverPlacement;
  /** Gap in px between the anchor and the popover. Default 4. */
  readonly offset?: number;
  /** Flip to the opposite side when the requested side overflows the viewport. Default true. */
  readonly flip?: boolean;
  /** Clamp inside the viewport when the popover still overflows after any flip. Default true. */
  readonly clamp?: boolean;
  /** Margin from the viewport edge in px when clamping. Default 8. */
  readonly margin?: number;
  /** Set the popover's width to match the anchor's. Useful for dropdown-style menus. */
  readonly matchAnchorWidth?: boolean;
  /** Right-to-left context. Swaps `-start`/`-end` alignment so they track the reading direction. */
  readonly rtl?: boolean;
  /**
   * Viewport point to position against instead of the anchor's box, as a zero-size
   * anchor. The anchor still supplies the width for `matchAnchorWidth`.
   */
  readonly point?: PopoverAnchorPoint | null;
}

interface Rect {
  readonly width: number;
  readonly height: number;
}

interface AnchorRect extends Rect {
  readonly top: number;
  readonly bottom: number;
  readonly left: number;
  readonly right: number;
}

interface Viewport {
  readonly width: number;
  readonly height: number;
}

type OutsidePlacement = Exclude<PopoverPlacement, PopoverInsidePlacement>;

function isInside(placement: PopoverPlacement): placement is PopoverInsidePlacement {
  return placement.startsWith('inside-');
}

/** True for cardinal placements that centre the popover on the perpendicular axis. */
function isCardinal(
  placement: OutsidePlacement,
): placement is 'top' | 'bottom' | 'left' | 'right' {
  return (
    placement === 'top' ||
    placement === 'bottom' ||
    placement === 'left' ||
    placement === 'right'
  );
}

/** The dominant side of a placement (`top-start` and `top` both give `top`, etc.). */
function side(placement: OutsidePlacement): 'top' | 'bottom' | 'left' | 'right' {
  if (placement.startsWith('top')) {
    return 'top';
  }
  if (placement.startsWith('bottom')) {
    return 'bottom';
  }
  if (placement === 'left') {
    return 'left';
  }
  return 'right';
}

/** Maps `top` to `bottom`, `bottom-start` to `top-start`, etc. for flip logic. */
function flipPlacement(placement: OutsidePlacement): OutsidePlacement {
  if (placement === 'top') {
    return 'bottom';
  }
  if (placement === 'bottom') {
    return 'top';
  }
  if (placement === 'left') {
    return 'right';
  }
  if (placement === 'right') {
    return 'left';
  }
  if (placement === 'top-start') {
    return 'bottom-start';
  }
  if (placement === 'top-end') {
    return 'bottom-end';
  }
  if (placement === 'bottom-start') {
    return 'top-start';
  }
  return 'top-end';
}

/** Computes the top/left for a given placement without any flip or clamp logic. */
function placeRaw(
  anchor: AnchorRect,
  popover: Rect,
  placement: OutsidePlacement,
  offset: number,
  rtl: boolean,
): { top: number; left: number } {
  const s = side(placement);
  let top = 0;
  let left = 0;

  if (s === 'top') {
    top = anchor.top - popover.height - offset;
  } else if (s === 'bottom') {
    top = anchor.bottom + offset;
  } else if (s === 'left') {
    left = anchor.left - popover.width - offset;
  } else {
    left = anchor.right + offset;
  }

  if (s === 'top' || s === 'bottom') {
    if (isCardinal(placement)) {
      left = anchor.left + (anchor.width - popover.width) / 2;
    } else {
      // `-start` aligns to the anchor's leading edge: left in LTR, right in RTL.
      const isStart = placement === 'top-start' || placement === 'bottom-start';
      left = isStart !== rtl ? anchor.left : anchor.right - popover.width;
    }
  } else {
    top = anchor.top + (anchor.height - popover.height) / 2;
  }

  return { top, left };
}

/** Computes the top/left for an inside placement, inset from each edge it is pinned to. */
function placeInside(
  anchor: AnchorRect,
  popover: Rect,
  placement: PopoverInsidePlacement,
  inset: number,
  rtl: boolean,
): { top: number; left: number } {
  const edges = placement.slice('inside-'.length);
  let top = anchor.top + (anchor.height - popover.height) / 2;
  if (edges.startsWith('top')) {
    top = anchor.top + inset;
  } else if (edges.startsWith('bottom')) {
    top = anchor.bottom - popover.height - inset;
  }
  let left = anchor.left + (anchor.width - popover.width) / 2;
  if (edges.endsWith('start') || edges.endsWith('end')) {
    const atLeft = edges.endsWith('start') !== rtl;
    left = atLeft ? anchor.left + inset : anchor.right - popover.width - inset;
  }
  return { top, left };
}

/** Pulls `value` back inside `[margin, extent - size - margin]`, favouring the start edge. */
function clampAxis(value: number, size: number, extent: number, margin: number): number {
  return Math.max(margin, Math.min(value, Math.max(margin, extent - size - margin)));
}

/**
 * Computes the viewport-space top/left for a popover anchored to `anchorRect`,
 * applying optional flip-on-overflow and edge-clamp logic. Pure function, no
 * DOM access. Both `<ea-popover>` and `[eaTooltip]` consume this.
 *
 * @param anchorRect  The anchor element's `getBoundingClientRect()`.
 * @param popoverRect Width and height of the popover (post-render measurement).
 * @param viewport    Viewport dimensions (`window.innerWidth/Height`).
 * @param options     Placement and behavior flags.
 */
export function computePopoverPosition(
  anchorRect: AnchorRect,
  popoverRect: Rect,
  viewport: Viewport,
  options: PopoverPositionOptions,
): PopoverPositionResult {
  const offset = options.offset ?? 4;
  const margin = options.margin ?? 8;
  const flip = options.flip ?? true;
  const clamp = options.clamp ?? true;
  const rtl = options.rtl ?? false;
  const point = options.point;
  const anchor: AnchorRect = point
    ? {
        top: point.y,
        bottom: point.y,
        left: point.x,
        right: point.x,
        width: 0,
        height: 0,
      }
    : anchorRect;
  const sizing = {
    anchorWidth: anchorRect.width,
    ...(options.matchAnchorWidth ? { width: anchorRect.width } : {}),
  };

  const requested = options.placement;
  if (isInside(requested)) {
    // Covering the anchor is the point of an inside placement, so it has no side
    // to flip to and both axes are fair game for the clamp
    const inside = placeInside(anchor, popoverRect, requested, offset, rtl);
    return {
      top: clamp
        ? clampAxis(inside.top, popoverRect.height, viewport.height, margin)
        : inside.top,
      left: clamp
        ? clampAxis(inside.left, popoverRect.width, viewport.width, margin)
        : inside.left,
      placement: requested,
      ...sizing,
    };
  }

  let placement: OutsidePlacement = requested;
  let pos = placeRaw(anchor, popoverRect, placement, offset, rtl);

  if (flip) {
    const overflowsTop = pos.top < margin;
    const overflowsBottom = pos.top + popoverRect.height > viewport.height - margin;
    const overflowsLeft = pos.left < margin;
    const overflowsRight = pos.left + popoverRect.width > viewport.width - margin;
    const s = side(placement);

    const shouldFlip =
      (s === 'top' && overflowsTop) ||
      (s === 'bottom' && overflowsBottom) ||
      (s === 'left' && overflowsLeft) ||
      (s === 'right' && overflowsRight);

    if (shouldFlip) {
      const flipped = flipPlacement(placement);
      const flippedPos = placeRaw(anchor, popoverRect, flipped, offset, rtl);
      const flippedFitsBetter =
        (s === 'top' &&
          flippedPos.top + popoverRect.height <= viewport.height - margin) ||
        (s === 'bottom' && flippedPos.top >= margin) ||
        (s === 'left' &&
          flippedPos.left + popoverRect.width <= viewport.width - margin) ||
        (s === 'right' && flippedPos.left >= margin);

      if (flippedFitsBetter) {
        placement = flipped;
        pos = flippedPos;
      }
    }
  }

  if (clamp) {
    // Only clamp the cross-axis (perpendicular to the placement). For
    // bottom-side placements we clamp `left` so the popover doesn't slip off
    // the left/right of the viewport, but we leave `top` alone; clamping it
    // when the popover is taller than the available space below the anchor
    // would yank it up over the anchor itself (the common Storybook-docs-
    // iframe failure mode where viewports are short). Better to let it
    // overflow and scroll than to overlap its own trigger.
    const s = side(placement);
    const isVertical = s === 'top' || s === 'bottom';
    if (isVertical) {
      pos = {
        top: pos.top,
        left: clampAxis(pos.left, popoverRect.width, viewport.width, margin),
      };
    } else {
      pos = {
        top: clampAxis(pos.top, popoverRect.height, viewport.height, margin),
        left: pos.left,
      };
    }
  }

  return {
    top: pos.top,
    left: pos.left,
    placement,
    ...sizing,
  };
}
