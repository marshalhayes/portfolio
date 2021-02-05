import * as React from 'react';
import Page from '../layouts/Page';
import * as PrismicDOM from 'prismic-dom';
import { renderFromBody } from '../view.helpers';

interface PostProps {
  post: any;
}

export default class Post extends React.Component<PostProps> {
  render() {
    return (
      <Page {...this.props}>
        <h1>{PrismicDOM.RichText.asText(this.props.post.title)}</h1>

        <div id="content" {...renderFromBody(this.props.post.body)}></div>
      </Page>
    );
  }
}
