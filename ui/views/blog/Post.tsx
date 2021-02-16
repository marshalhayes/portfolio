import React from 'react';
import * as PrismicDOM from 'prismic-dom';
import { renderFromBody } from '../view.helpers';
import Timestamp from '../components/Timestamp';
import BaseLayout, { BaseLayoutProps } from '../layouts/Base';
import DisqusComments from './partials/Comments';
import { BlogPostResponse } from 'src/blog/blog.models';

type PostProps = { post: BlogPostResponse } & BaseLayoutProps;

export default class Post extends React.Component<PostProps> {
  private readonly title: string;
  private readonly renderComments: boolean;

  constructor(props) {
    super(props);

    this.title = PrismicDOM.RichText.asText(this.props.post.title);
    this.renderComments =
      props.post.comments_enabled === null || props.post.comments_enabled;
  }

  render() {
    return (
      <BaseLayout {...this.props}>
        <div className="container mx-auto sm:px-3 overflow-x-hidden">
          <section className="flex flex-col lg:flex-row justify-between">
            <main className="w-full px-3 mt-4">
              <a href="/" title="Return to blog" className="no-underline">
                &lt; Go back
              </a>

              <h1 className="mb-1">{this.title}</h1>

              <div
                id="metadata"
                className="mb-5 text-gray-600 dark:text-gray-400"
              >
                Posted{' '}
                <Timestamp
                  dateTime={this.props.post._meta.firstPublicationDate}
                ></Timestamp>
              </div>

              <div id="content" {...renderFromBody(this.props.post.body)}></div>
            </main>

            <aside className="px-3 lg:px-0 max-w-full lg:max-w-sm">
              <div className="p-5 shadow-lg dark:text-white border lg:border-t-0 border-sizzling-red dark:bg-gray-900">
                <div className="font-medium">
                  <h3 className="mb-3">About the Author</h3>
                </div>

                <div className="flex flex-row-reverse">
                  <div className="mx-auto">
                    <img src="/public/images/me.jpg" alt="" />
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

          {this.renderComments ? (
            <div className="px-3">
              <DisqusComments></DisqusComments>
            </div>
          ) : null}
        </div>

        <link rel="stylesheet" href="/public/css/prism.css" />

        {this.props.isPreview ? (
          <script
            src="https://static.cdn.prismic.io/prismic.js?new=true&repo=marshalhayes"
            defer
          ></script>
        ) : null}
      </BaseLayout>
    );
  }
}
