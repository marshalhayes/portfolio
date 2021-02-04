import * as React from 'react';
import { BaseLayoutProps } from './layouts/Base';
import Page from './layouts/Page';
import Timestamp from './components/Timestamp';
import { renderFromBody } from './view.helpers';
import * as PrismicDOM from 'prismic-dom';

interface HomeProps {
  latestPosts: any[];
}

export default class Home extends React.Component<BaseLayoutProps & HomeProps> {
  render() {
    return (
      <Page {...this.props}>
        <h2>Latest Posts</h2>

        <ol className="list-unstyled">
          {this.props.latestPosts.map((edge, i) => {
            return (
              <li key={i}>
                <h5 style={{ marginBottom: 0, fontSize: '18px' }}>
                  <a href={`/blog/${edge.node._meta.uid}`}>
                    {PrismicDOM.RichText.asText(edge.node.title)}
                  </a>
                </h5>

                <Timestamp
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
