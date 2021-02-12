import * as React from 'react';
import * as PrismicDOM from 'prismic-dom';
import { renderFromBody } from '../view.helpers';
import PageWithAsideLayout from '../layouts/PageWithAside';
import DisqusComments from './partials/Comments';

interface PostProps {
  post: any;
}

export default class Post extends React.Component<PostProps> {
  render() {
    const title = PrismicDOM.RichText.asText(this.props.post.title);

    return (
      <PageWithAsideLayout {...{ title, ...this.props }}>
        <h1>{title}</h1>

        <div
          id="content"
          className="mb-2"
          {...renderFromBody(this.props.post.body)}
        ></div>

        {process.env.NODE_ENV === 'production' ? (
          <DisqusComments></DisqusComments>
        ) : null}

        <link rel="stylesheet" href="/public/css/prism.css" />
      </PageWithAsideLayout>
    );
  }
}
