import * as React from 'react';
import BaseLayout, { BaseLayoutProps } from './Base';

export default class PageWithAsideLayout extends React.Component<BaseLayoutProps> {
  render() {
    return (
      <BaseLayout {...this.props}>
        <section className="flex flex-col lg:flex-row">
          <main className="container px-3">
            <a
              href="/blog"
              style={{ textDecoration: 'none' }}
              title="Return to blog"
              className="text-sizzling-red"
            >
              &lt; Go back
            </a>

            {this.props.children}
          </main>

          <aside className="px-3 lg:px-0 xs:max-w-full sm:max-w-sm">
            <div className="p-5 shadow-lg dark:text-white border-l-4 border-b-4 border-sizzling-red dark:bg-gray-900">
              <div className="font-medium">
                <h3 className="mb-3">About the Author</h3>
              </div>

              <div className="flex flex-row-reverse">
                <div className="mx-auto">
                  <img src="/public/images/me.jpg" loading="lazy" alt="" />
                </div>

                <div>
                  <p>
                    Marshal Hayes is a Software Engineer at MCR Safety in
                    Tennessee.
                  </p>

                  <p>
                    <a href="/about">Read more</a>
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </BaseLayout>
    );
  }
}
