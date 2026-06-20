import { Pipe, type PipeTransform } from '@angular/core';

const GITHUB_BLOB = 'https://github.com/mwiraszka/eagami/blob/main/packages/ui/';

/**
 * Renders the small inline-markdown subset the changelog uses (code spans,
 * bold, and links) to safe HTML. The input is HTML-escaped first, so only these
 * patterns produce markup; relative `.md` links resolve to the repo on GitHub.
 */
@Pipe({ name: 'inlineMarkdown' })
export class InlineMarkdownPipe implements PipeTransform {
  transform(value: string): string {
    const escaped = value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return escaped
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text: string, url: string) => {
        const href = /^https?:\/\//.test(url) ? url : `${GITHUB_BLOB}${url}`;
        return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
      });
  }
}
