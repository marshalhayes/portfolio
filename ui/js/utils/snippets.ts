export function copyText(text: string) {
  return navigator.clipboard.writeText(text);
}

document.documentElement.addEventListener(
  'click',
  function copySnippet(e: Event) {
    const target = e.target as Element;
    if (!target.matches('.copy-snippet[data-target]')) {
      return;
    }

    const snippetTarget = target.getAttribute('data-target');
    const snippetText =
      (document.querySelector(snippetTarget) as HTMLElement)?.innerText ?? '';

    if (snippetText.length > 0) {
      copyText(snippetText)
        .then(() => (target.innerHTML = 'Copied!'))
        .finally(() => {
          setTimeout(() => {
            target.innerHTML = 'Copy';
          }, 350);
        });
    }
  },
);
