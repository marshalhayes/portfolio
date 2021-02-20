export function copyText(text: string) {
  return navigator.clipboard.writeText(text);
}

document.documentElement.addEventListener(
  'click',
  function copySnippet(e: Event) {
    const target = e.target as HTMLElement;
    if (!target.matches('.copy-snippet[data-target]')) {
      return;
    }

    const snippetTarget = target.getAttribute('data-target');
    const snippetText =
      (document.querySelector(snippetTarget) as HTMLElement)?.innerText ?? '';

    if (snippetText.length > 0) {
      const originalText = target.innerText;

      copyText(snippetText)
        .then(() => (target.innerText = 'Copied!'))
        .finally(() => {
          setTimeout(() => {
            target.innerText = originalText;
          }, 350);
        });
    }
  },
  {
    passive: true,
  },
);
