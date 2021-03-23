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

      navigator.clipboard
        .writeText(snippetText)
        .then(() => {
          target.innerText = 'Copied!';
          target.style.display = 'block';
          target.style.opacity = '1';
          target.style.visibility = 'visible';
        })
        .finally(() => {
          setTimeout(() => {
            target.innerText = originalText;
            target.style.display = '';
            target.style.opacity = '';
            target.style.visibility = '';
          }, 750);
        });
    }
  },
  {
    passive: true,
  },
);
