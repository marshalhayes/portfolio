import * as React from 'react';
import * as PrismicDOM from 'prismic-dom';
import { renderFromBody } from '../view.helpers';
import PageWithAsideLayout from '../layouts/PageWithAside';
import Timestamp from '../components/Timestamp';

interface PostProps {
  post: any;
}

export default class Post extends React.Component<PostProps> {
  render() {
    const title = PrismicDOM.RichText.asText(this.props.post.title);

    return (
      <PageWithAsideLayout {...{ title, ...this.props }}>
        <h1 className="mb-1">{title}</h1>

        <div id="metadata" className="mb-5 text-gray-400">
          Posted{' '}
          <Timestamp
            dateTime={this.props.post._meta.firstPublicationDate}
          ></Timestamp>
        </div>

        <div id="content" {...renderFromBody(this.props.post.body)}></div>
        <link rel="stylesheet" href="/public/css/prism.css" />
      </PageWithAsideLayout>
    );
  }
}
