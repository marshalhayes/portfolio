import * as React from 'react';
import Page from '../layouts/Page';
import * as PrismicDOM from 'prismic-dom';
import Timestamp from '../components/Timestamp';
import { renderFromBody } from '../view.helpers';

interface BlogIndex {
  posts?: any[];
}

export default class Index extends React.Component<BlogIndex> {
  render() {
    return (
      <Page {...this.props}>
        <h1>Blogs</h1>

        <ol className="list-unstyled">
          {this.props.posts.map((edge, i) => {
            return (
              <li key={i} className="post-preview-wrapper">
                <h3>
                  <a href={`/blog/${edge.node._meta.uid}`}>
                    {PrismicDOM.RichText.asText(edge.node.title)}
                  </a>
                </h3>

                <Timestamp
                  className="post-date"
                  dateTime={edge.node._meta.firstPublicationDate}
                ></Timestamp>

                <p {...renderFromBody(edge.node.body)}></p>

                <a href={`/blog/${edge.node._meta.uid}`}>Read More</a>
              </li>
            );
          })}
        </ol>
      </Page>
    );
  }
}
