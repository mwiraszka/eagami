import { type TopLayerStubs, installTopLayerStubs } from '../test-setup';
import { enterTopLayer, leaveTopLayer } from './top-layer';

describe('top layer', () => {
  let stubs: TopLayerStubs;
  let modal: HTMLElement;
  let anchor: HTMLElement;
  let surface: HTMLElement;

  beforeEach(() => {
    stubs = installTopLayerStubs();

    modal = document.createElement('dialog');
    anchor = document.createElement('button');
    surface = document.createElement('div');
    modal.appendChild(anchor);
    document.body.append(modal, surface);
  });

  afterEach(() => {
    stubs.restore();
    modal.remove();
    surface.remove();
  });

  describe('with an anchor inside a modal', () => {
    beforeEach(() => stubs.openAsModal(modal));

    it('raises the surface into the top layer', () => {
      enterTopLayer(surface, anchor);

      expect(surface.getAttribute('popover')).toBe('manual');
      expect(stubs.shown()).toEqual([surface]);
    });

    it('promotes a surface anchored inside an already promoted surface', () => {
      const nestedAnchor = document.createElement('button');
      const nestedSurface = document.createElement('div');
      surface.appendChild(nestedAnchor);
      document.body.appendChild(nestedSurface);
      enterTopLayer(surface, anchor);

      enterTopLayer(nestedSurface, nestedAnchor);

      expect(stubs.shown()).toEqual([surface, nestedSurface]);

      nestedSurface.remove();
    });

    it('leaves an already promoted surface untouched', () => {
      enterTopLayer(surface, anchor);

      expect(() => enterTopLayer(surface, anchor)).not.toThrow();
      expect(stubs.shown()).toEqual([surface]);
    });

    it('falls back to plain stacking when promotion is refused', () => {
      surface.showPopover = () => {
        throw new DOMException('refused', 'InvalidStateError');
      };

      enterTopLayer(surface, anchor);

      expect(surface.hasAttribute('popover')).toBe(false);
    });

    it('skips a surface that is not in the document', () => {
      surface.remove();

      enterTopLayer(surface, anchor);

      expect(surface.hasAttribute('popover')).toBe(false);
    });

    it('returns the surface to the normal layer', () => {
      enterTopLayer(surface, anchor);

      leaveTopLayer(surface);

      expect(surface.hasAttribute('popover')).toBe(false);
      expect(stubs.shown()).toEqual([]);
    });

    it('ignores a leave for a surface that was never promoted', () => {
      expect(() => leaveTopLayer(surface)).not.toThrow();
      expect(stubs.shown()).toEqual([]);
    });
  });

  it('leaves the surface alone when the anchor is outside the top layer', () => {
    enterTopLayer(surface, anchor);

    expect(surface.hasAttribute('popover')).toBe(false);
    expect(stubs.shown()).toEqual([]);
  });

  it('no-ops without browser support for the popover API', () => {
    stubs.openAsModal(modal);
    stubs.restore();

    enterTopLayer(surface, anchor);

    expect(surface.hasAttribute('popover')).toBe(false);
  });
});
