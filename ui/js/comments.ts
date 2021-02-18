const canonicalUrl =
  document.head.querySelector('link[rel="canonical"]')?.getAttribute('href') ??
  `${location.protocol}//${location.hostname}${
    location.pathname === '/' ? '' : location.pathname
  }`;

const wrapper = document.getElementById('disqus-wrapper');

function loadComments() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // Ugh this stupid thing has to be global
  window.disqus_config = function () {
    this.page.url = canonicalUrl;
    this.page.identifier = canonicalUrl;
  };

  const script = document.createElement('script');
  const props = {
    src: 'https://marshalhayes-dev.disqus.com/embed.js',
    async: true,
    'data-timestamp': new Date().valueOf(),
  };

  Object.keys(props).forEach((p) => script.setAttribute(p, props[p]));

  document.head.insertAdjacentElement('beforeend', script);
}

if (window.matchMedia('(prefers-reduced-data: reduce)').matches) {
  // The user prefers reduced data, show a button to show comments
  const button = document.createElement('button');

  button.addEventListener('click', (e: Event) => {
    e.preventDefault();

    loadComments();
    button.remove();
  });

  button.className = 'p-4 text-white bg-gray-900 block w-auto mx-auto';
  button.innerText = 'Load Comments';

  wrapper.insertAdjacentElement('beforeend', button);
} else {
  const isInViewportNow =
    0 < window.innerHeight &&
    wrapper.getBoundingClientRect().top < window.innerHeight;

  if (isInViewportNow || !IntersectionObserver) {
    loadComments();
  } else {
    const observer = new IntersectionObserver(
      (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver,
      ) => {
        if (entries[0].intersectionRatio <= 0) return;

        loadComments();

        observer.disconnect();
      },
      {
        rootMargin: '650px',
      },
    );

    observer.observe(wrapper);
  }
}
