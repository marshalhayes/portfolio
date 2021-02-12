import * as React from 'react';
import BaseLayout, { BaseLayoutProps } from './Base';

export default class PageWithAsideLayout extends React.Component<BaseLayoutProps> {
  render() {
    return (
      <BaseLayout {...{ bodyClassName: 'aside-collapsed', ...this.props }}>
        <div className="pure-g">
          <main className="pure-u-1 pure-u-lg-3-4">
            <a
              href="/blog"
              className="d-inline-block mt-1"
              style={{ textDecoration: 'none' }}
              title="Return to blog"
            >
              &lt; Go back
            </a>

            {this.props.children}
          </main>

          <div className="pure-u-1 pure-u-lg-1-4">
            <aside>
              <h4 className="m-0">About the Author</h4>

              <img
                src="/public/images/me.jpg"
                className="pure-img mb-1 mx-auto aside-img"
                style={{ maxHeight: '175px' }}
                alt="A selfie of me wearing a black cloth facemask"
              />

              <p>
                Marshal Hayes is a Software Engineer currently working at MCR
                Safety in Tennessee.
              </p>

              <p>
                <a href="/about">Read more</a>
              </p>
            </aside>
          </div>
        </div>
      </BaseLayout>
    );
  }
}
