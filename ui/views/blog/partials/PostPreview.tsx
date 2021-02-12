import * as React from 'react';
import Timestamp from '../../components/Timestamp';
import PrismicDOM from 'prismic-dom';

interface PostPreviewProps {
  post: any;
}

export default class PostPreview extends React.Component<PostPreviewProps> {
  render() {
    return (
      <>
        <h3 className="text-2xl">
          <a
            href={`/blog/${this.props.post.node._meta.uid}`}
            className="text-sizzling-red"
          >
            {PrismicDOM.RichText.asText(this.props.post.node.title)}
          </a>
        </h3>

        <Timestamp
          dateTime={this.props.post.node._meta.firstPublicationDate}
        ></Timestamp>

        <p>{getPreviewText(this.props.post.node.body)}</p>
      </>
    );
  }
}

function getPreviewText(body: any[], maxLength = 125) {
  return (
    body
      .filter((slice) => slice.type === 'text')
      .map((slice) =>
        slice.fields.map((f) => PrismicDOM.RichText.asText(f.text)).join(' '),
      )
      .join('')
      .substring(0, maxLength) + '...'
  );
}
