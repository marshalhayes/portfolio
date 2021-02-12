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
        <main className="container mx-auto px-3">
          <h1>Latest Posts</h1>

          <ul>
            {this.props.latestPosts.map((post, i) => (
              <li
                key={i}
                className={i < this.props.latestPosts.length - 1 ? 'mb-5' : ''}
              >
                <PostPreview post={post}></PostPreview>
              </li>
            ))}
          </ul>
        </main>
      </BaseLayout>
    );
  }
}
