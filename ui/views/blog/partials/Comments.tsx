import React from 'react';

export default class DisqusComments extends React.Component {
  render() {
    return (
      <div id="disqus-wrapper">
        <noscript>
          <a href="https://disqus.com" rel="noopener">
            Disqus
          </a>{' '}
          comments require JavaScript to function. Please reload this page with
          JavaScript enabled, or use a different browser that supports
          JavaScript.
        </noscript>

        <div id="disqus_thread"></div>
        <script src="/public/js/post.bundle.js" defer></script>
      </div>
    );
  }
}
