import * as PrismicDOM from 'prismic-dom';
import Prism from 'prismjs';
import { createHash } from 'crypto';

/**
 * Dynamically render the Prismic body (slices)
 *
 * @param body
 */
export function renderFromBody(body: any[]) {
  if (!body || body.length <= 0) {
    return null;
  }

  const html = body
    .map((slice) => {
      if (slice.type === 'text') {
        return (slice.fields ?? [slice.primary])
          .map((f) =>
            f.text
              ? PrismicDOM.RichText.asHtml(f.text)
                  // I sometimes use backticks to highlight simple snippets of code, usually just names of stuff
                  .replace(
                    /\`([^`]+)\`/g,
                    '<code class="lang-markup inline p-1">$1</code>',
                  )
              : '',
          )
          .join('');
      }

      if (slice.type === 'code_snippet') {
        const snippetLanguage = slice.primary.snippet_language;
        const snippetText = PrismicDOM.RichText.asText(slice.primary.snippet);

        return renderCodeSnippetFromText(snippetText, snippetLanguage)
          .dangerouslySetInnerHTML.__html;
      }
    })
    .join('');

  return {
    dangerouslySetInnerHTML: {
      __html: html,
    },
  };
}

export function renderCodeSnippetFromText(
  snippetText: string,
  snippetLanguage: string,
) {
  snippetLanguage = snippetLanguage.toLowerCase();

  const grammar = Prism.languages[snippetLanguage];
  if (!grammar) {
    throw new Error(`Prism language "${snippetLanguage}" not found`);
  }

  // This may be overkill, but hash the snippet so we can use it as a unique ID
  const snippetHash = createHash('sha1').update(snippetText).digest('hex');

  const html = `
    <div class="code-snippet relative">
      <code class="lang-${snippetLanguage}" id="snippet-${snippetHash}">
        [placeholder]
      </code>

      <button type="button" class="absolute top-0 right-0 mr-3 mt-3 copy-snippet" data-target="#snippet-${snippetHash}">Copy</button>
    </div>
  `
    .replace(/\s\s+/g, '')
    .replace(
      '[placeholder]',
      Prism.highlight(snippetText, grammar, snippetLanguage),
    )

    // I hate relying on white space, so replace it with html entities. Idk if this is weird or not...
    .replace(/\n/g, '<br />')
    .replace(/\s\s/g, '&nbsp;&nbsp;');

  return {
    dangerouslySetInnerHTML: {
      __html: html,
    },
  };
}
