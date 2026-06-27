import {
  EAGAMI_STYLE_PATH,
  resolveIndexPath,
  withEagamiFonts,
  withEagamiStyle,
} from './utils';

describe('ng-add utils', () => {
  describe('withEagamiStyle', () => {
    it('prepends the stylesheet when it is absent', () => {
      const result = withEagamiStyle(['src/styles.scss']);

      expect(result).toEqual([EAGAMI_STYLE_PATH, 'src/styles.scss']);
    });

    it('does not add the stylesheet twice', () => {
      const existing = [EAGAMI_STYLE_PATH, 'src/styles.scss'];

      const result = withEagamiStyle(existing);

      expect(result).toBe(existing);
    });

    it('recognises an object-form entry by its input path', () => {
      const styles = [{ input: EAGAMI_STYLE_PATH }];

      const result = withEagamiStyle(styles);

      expect(result).toBe(styles);
    });
  });

  describe('withEagamiFonts', () => {
    it('inserts the font links just before </head>', () => {
      const html = '<html>\n  <head>\n    <title>x</title>\n  </head>\n</html>';

      const result = withEagamiFonts(html);

      expect(result).toContain('family=DM+Sans');
      expect(result.indexOf('family=DM+Sans')).toBeLessThan(result.indexOf('</head>'));
    });

    it('does not duplicate the font links on a second run', () => {
      const once = withEagamiFonts('<head>\n</head>');

      const twice = withEagamiFonts(once);

      expect(twice).toEqual(once);
      expect(twice.match(/family=DM\+Sans/g)?.length).toBe(1);
    });
  });

  describe('resolveIndexPath', () => {
    it('returns a string index as-is', () => {
      expect(resolveIndexPath('src/index.html')).toBe('src/index.html');
    });

    it('reads the input path from an object index', () => {
      expect(resolveIndexPath({ input: 'src/index.html', output: 'index.html' })).toBe(
        'src/index.html',
      );
    });

    it('returns undefined when no index is configured', () => {
      expect(resolveIndexPath(undefined)).toBeUndefined();
    });
  });
});
