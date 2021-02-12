import * as PrismicDOM from 'prismic-dom';
import Prism from 'prismjs';

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

        return `<div class="code-snippet relative">
            <code class="lang-${lang}">
              ${Prism.highlight(snippet, grammar, lang)}
            </code>

            <button class="absolute top-0 right-0 pr-6 pt-3 copy-snippet">Copy</button>
          </div>`.replace(/\s\s+/g, ' ');
      }
    })
    .join('');

  return {
    dangerouslySetInnerHTML: {
      __html: html,
    },
  };
}
