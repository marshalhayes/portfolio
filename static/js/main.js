!(function () {
  'use strict';

  const detectTheme = function () {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      const vars = {
        '--bg-color': '#fff',
        '--text-color': '#000',
        '--link-color': '#5800b0',
        '--link-hover-color': '#320064',
      };

      // HACK?
      const style = document.createElement('style');
      style.innerText = `:root { ${Object.keys(vars)
        .map((val) => {
          return `${val}: ${vars[val]};`;
        })
        .join('')} }`;

      document.head.insertAdjacentElement('beforeend', style);
    }
  };

  const onDOMContentLoaded = [detectTheme];

  window.addEventListener('DOMContentLoaded', function (e) {
    onDOMContentLoaded.forEach(function (f, i) {
      f(e, i, onDOMContentLoaded.length);
    });
  });
})();
