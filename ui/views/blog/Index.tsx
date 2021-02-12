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
        <h1>Blogs</h1>

        <ul className="pure-menu-list">
          {this.props.posts.map((post, i) => (
            <li key={i} className="pure-menu-item">
              <PostPreview post={post}></PostPreview>
            </li>
          ))}
        </ul>
      </BaseLayout>
    );
  }
}
