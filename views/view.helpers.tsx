import * as PrismicDOM from 'prismic-dom';

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
          .map((f) => PrismicDOM.RichText.asText(f.text))
          .join(' ');
      }
    })
    .join('');

  return {
    dangerouslySetInnerHTML: {
      __html: html,
    },
  };
}
