import * as React from 'react';
import * as PrismicDOM from 'prismic-dom';
import { renderFromBody } from '../view.helpers';
import Timestamp from '../components/Timestamp';
import BaseLayout from '../layouts/Base';
import DisqusComments from './partials/Comments';
import { BlogPost } from 'src/blog/blog.models';

interface PostProps {
  post: BlogPost;
}

export default class Post extends React.Component<PostProps> {
  render() {
    const title = PrismicDOM.RichText.asText(this.props.post.title);
    const renderComments =
      this.props.post.comments_enabled === null ||
      this.props.post.comments_enabled;

    return (
      <BaseLayout>
        <div className="container mx-auto sm:px-3">
          <section className="flex flex-col lg:flex-row justify-between">
            <main className="px-3">
              <a
                href="/"
                title="Return to blog"
                className="text-sizzling-red no-underline"
              >
                &lt; Go back
              </a>

              <h1 className="mb-1">{title}</h1>

              <div id="metadata" className="mb-5 text-gray-400">
                Posted{' '}
                <Timestamp
                  dateTime={this.props.post._meta.firstPublicationDate}
                ></Timestamp>
              </div>

              <div id="content" {...renderFromBody(this.props.post.body)}></div>
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

          {renderComments ? (
            <div className="px-3">
              <DisqusComments></DisqusComments>
            </div>
          ) : null}
        </div>

        <link rel="stylesheet" href="/public/css/prism.css" />
      </BaseLayout>
    );
  }
}
