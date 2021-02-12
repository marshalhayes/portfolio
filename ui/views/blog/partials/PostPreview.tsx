import * as React from 'react';
import Timestamp from '../../components/Timestamp';
import PrismicDOM from 'prismic-dom';

interface PostPreviewProps {
  post: any;
}

export default class PostPreview extends React.Component<PostPreviewProps> {
  render() {
    return (
      <div className="post-preview">
        <h3 className="post-title">
          <a href={`/blog/${this.props.post.node._meta.uid}`}>
            {PrismicDOM.RichText.asText(this.props.post.node.title)}
          </a>
        </h3>

        <Timestamp
          className="post-timestamp"
          dateTime={this.props.post.node._meta.firstPublicationDate}
        ></Timestamp>

        <p>{getPreviewText(this.props.post.node.body)}</p>
      </div>
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
