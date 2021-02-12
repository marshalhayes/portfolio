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
        <h1>Latest Posts</h1>

        <ul className="pure-menu-list">
          {this.props.latestPosts.map((post, i) => (
            <li key={i} className="pure-menu-item">
              <PostPreview post={post}></PostPreview>
            </li>
          ))}
        </ul>
      </BaseLayout>
    );
  }
}
