import * as React from 'react';
import Timestamp from '../../components/Timestamp';
import PrismicDOM from 'prismic-dom';

interface PostPreviewProps {
  post: any;
}

export default class PostPreview extends React.Component<PostPreviewProps> {
  private readonly url: string;

  constructor(props) {
    super(props);

    this.url = `/blog/${this.props.post.node._meta.uid}`;
  }

  render() {
    return (
      <>
        <h3 className="text-2xl">
          <a href={this.url} className="text-sizzling-red">
            {PrismicDOM.RichText.asText(this.props.post.node.title)}
          </a>
        </h3>

        <Timestamp
          dateTime={this.props.post.node._meta.firstPublicationDate}
          className="font-mono text-xs block mb-3"
        ></Timestamp>

        <p>{PrismicDOM.RichText.asText(this.props.post.node.preview_text)}</p>
      </>
    );
  }
}
