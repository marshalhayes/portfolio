import * as React from 'react';

export type BaseLayoutProps = {
  title?: string;
  description?: string;
};

export default class BaseLayout extends React.Component<BaseLayoutProps> {
  render() {
    return (
      <html>
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

          {this.props.description?.length > 0 ? (
            <meta name="description" content={this.props.description} />
          ) : null}

          <title>
            {this.props.title?.length > 0
              ? `${this.props.title} | Marshal Hayes`
              : 'Marshal Hayes'}
          </title>
        </head>

        <body>{this.props.children}</body>
      </html>
    );
  }
}
