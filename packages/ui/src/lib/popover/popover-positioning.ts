/**
 * Placement of the popover relative to its anchor. Each placement names the
 * side of the anchor the popover attaches to, optionally followed by a corner
 * suffix (`-start` or `-end`) that decides the alignment along the perpendicular
 * axis. The plain side names (`top`, `bottom`, `left`, `right`) centre the
 * popover on that axis.
 */
export type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'right';

export interface PopoverPositionResult {
  /** Top coordinate in viewport (px); pairs with `position: fixed`. */
  readonly top: number;
  /** Left coordinate in viewport (px). */
  readonly left: number;
  /** Width hint when the popover should match the anchor's width. */
  readonly width?: number;
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

/** True for cardinal placements that centre the popover on the perpendicular axis. */
function isCardinal(
  placement: PopoverPlacement,
): placement is 'top' | 'bottom' | 'left' | 'right' {
  return (
    placement === 'top' ||
    placement === 'bottom' ||
    placement === 'left' ||
    placement === 'right'
  );
}

/** The dominant side of a placement (`top-start` → `top`, `bottom` → `bottom`, etc.). */
function side(placement: PopoverPlacement): 'top' | 'bottom' | 'left' | 'right' {
  if (placement.startsWith('top')) return 'top';
  if (placement.startsWith('bottom')) return 'bottom';
  if (placement === 'left') return 'left';
  return 'right';
}

/** Maps `top → bottom`, `bottom-start → top-start`, etc. for flip logic. */
function flipPlacement(placement: PopoverPlacement): PopoverPlacement {
  if (placement === 'top') return 'bottom';
  if (placement === 'bottom') return 'top';
  if (placement === 'left') return 'right';
  if (placement === 'right') return 'left';
  if (placement === 'top-start') return 'bottom-start';
  if (placement === 'top-end') return 'bottom-end';
  if (placement === 'bottom-start') return 'top-start';
  return 'top-end';
}

/** Computes the top/left for a given placement without any flip or clamp logic. */
function placeRaw(
  anchor: AnchorRect,
  popover: Rect,
  placement: PopoverPlacement,
  offset: number,
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
    } else if (placement === 'top-start' || placement === 'bottom-start') {
      left = anchor.left;
    } else {
      left = anchor.right - popover.width;
    }
  } else {
    top = anchor.top + (anchor.height - popover.height) / 2;
  }

  return { top, left };
}

/**
 * Computes the viewport-space top/left for a popover anchored to `anchorRect`,
 * applying optional flip-on-overflow and edge-clamp logic. Pure function — no
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

  let placement = options.placement;
  let pos = placeRaw(anchorRect, popoverRect, placement, offset);

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
      const flippedPos = placeRaw(anchorRect, popoverRect, flipped, offset);
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
    const maxLeft = viewport.width - popoverRect.width - margin;
    const maxTop = viewport.height - popoverRect.height - margin;
    pos = {
      top: Math.max(margin, Math.min(pos.top, Math.max(margin, maxTop))),
      left: Math.max(margin, Math.min(pos.left, Math.max(margin, maxLeft))),
    };
  }

  return {
    top: pos.top,
    left: pos.left,
    placement,
    ...(options.matchAnchorWidth ? { width: anchorRect.width } : {}),
  };
}
