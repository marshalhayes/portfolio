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

        return `<code class="code-snippet">${Prism.highlight(
          snippet,
          grammar,
          lang,
        )}</code>`;
      }
    })
    .join('');

  return {
    dangerouslySetInnerHTML: {
      __html: html,
    },
  };
}
