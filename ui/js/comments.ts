function loadComments() {
  const canonicalUrl =
    document.querySelector('link[rel="canonical"]')?.getAttribute('href') ??
    `${location.protocol}//${location.hostname}${
      location.pathname === '/' ? '' : location.pathname
    }`;

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

  document.body.insertAdjacentElement('beforeend', script);
}

const wrapper = document.getElementById('disqus-wrapper');
const isInViewportNow =
  0 < window.innerHeight &&
  wrapper.getBoundingClientRect().top < window.innerHeight;

if (isInViewportNow || !IntersectionObserver) {
  loadComments();
} else {
  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entries[0].intersectionRatio <= 0) return;

      loadComments();

      observer.disconnect();
    },
  );

  observer.observe(wrapper);
}