/**
 * Canonical t-shirt size scale shared by every sized component. A component's
 * own size type (e.g. `ButtonSize`) aliases this so the scale is defined once.
 */
export type EaSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Size scale for width-based components (panels such as drawer and dialog),
 * adding a full-bleed option on top of the standard scale.
 */
export type EaWidth = EaSize | 'full';
