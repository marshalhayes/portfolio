import * as React from 'react';
import BaseLayout from '../layouts/Base';
import PostPreview from './partials/PostPreview';

interface BlogIndex {
  posts?: any[];
}

export default class Index extends React.Component<BlogIndex> {
  render() {
    return (
      <BaseLayout {...this.props}>
        <main className="container mx-auto px-3">
          <h1>Blogs</h1>

          <ul>
            {this.props.posts.map((post, i) => (
              <li
                key={i}
                className={i < this.props.posts.length - 1 ? 'mb-5' : ''}
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
