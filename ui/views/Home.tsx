import BaseLayout, { BaseLayoutProps } from './layouts/Base';
import PostPreview from './blog/partials/PostPreview';
import React from 'react';

interface HomeProps {
  latestPosts: any[];
}

export default class Home extends React.Component<BaseLayoutProps & HomeProps> {
  render() {
    return (
      <BaseLayout {...this.props}>
        <main className="min-h-screen flex flex-col lg:flex-row">
          <div className="min-h-screen -mb-48 lg:mb-0 lg:w-2/6 dark:text-white dark:bg-gray-900">
            <div
              className="bg-cover bg-fixed bg-no-repeat w-full lg:bg-local h-screen"
              style={{
                backgroundImage: 'url("/public/images/me-in-new-york.jpg")',
              }}
            ></div>
          </div>

          <div className="lg:w-4/6 container mx-auto p-7 lg:p-14">
            <h1 className="p-3 bg-black text-white lg:p-0 lg:bg-transparent">
              Hi, I'm Marshal.
            </h1>
            <p className="p-3 bg-black text-white lg:p-0 lg:bg-transparent">
              I'm a full stack Software Engineer.
            </p>

            <div className="my-14">
              <div className="text-sm uppercase font-mono">Latest Posts</div>

              {this.props.latestPosts.length > 0 ? (
                <ol>
                  {this.props.latestPosts.map((post, i) => (
                    <li
                      key={i}
                      {...(i < this.props.latestPosts.length - 1
                        ? { className: 'mb-5' }
                        : {})}
                    >
                      <PostPreview post={post}></PostPreview>
                    </li>
                  ))}
                </ol>
              ) : (
                <p>I haven't made any posts yet :(</p>
              )}
            </div>

            <div className="text-sm uppercase font-mono mb-2">
              Find me on Social Media
            </div>

            <ul>
              <li className="inline-block mr-3">
                <a href="https://github.com/marshalhayes">GitHub</a>
              </li>

              <li className="inline-block mr-3">
                <a href="https://twitter.com/marshalhayes">Twitter</a>
              </li>

              <li className="inline-block">
                <a href="https://linkedin.com/in/marshalhayes">LinkedIn</a>
              </li>
            </ul>
          </div>
        </main>
      </BaseLayout>
    );
  }
}
