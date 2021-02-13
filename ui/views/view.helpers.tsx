import * as PrismicDOM from 'prismic-dom';
import Prism from 'prismjs';
import { createHash } from 'crypto';

/**
 * Dynamically render the Prismic body (slices)
 *
 * @param body
 */
export function renderFromBody(body: any[]) {
  const html = body
    .map((slice) => {
      if (slice.type === 'text') {
        return slice.fields
          .map((f) => PrismicDOM.RichText.asHtml(f.text))
          .join('');
      }

      if (slice.type === 'code_snippet') {
        const lang = 'html';
        const grammar = Prism.languages[lang];
        const snippet = PrismicDOM.RichText.asText(slice.primary.snippet);

        // This may be overkill, but hash the snippet so we can use it as a unique ID
        const snippetHash = createHash('sha256').update(snippet).digest('hex');

        return `<div class="code-snippet relative">
            <code class="lang-${lang}" id="snippet-${snippetHash}">
              ${Prism.highlight(snippet, grammar, lang)}
            </code>

            <button class="absolute top-0 right-0 pr-6 pt-3 copy-snippet" data-target="#snippet-${snippetHash}">Copy</button>
          </div>`;
      }
    })
    .join('');

  return {
    dangerouslySetInnerHTML: {
      __html: html,
    },
  };
}
