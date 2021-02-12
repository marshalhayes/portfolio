import * as React from 'react';

export type BaseLayoutProps = {
  title?: string;
  canonicalUrl?: string;
  description?: string;
  bodyClassName?: string;
};

export default class BaseLayout extends React.Component<BaseLayoutProps> {
  render() {
    return (
      <html className="dark">
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

          {this.props.canonicalUrl?.length > 0 ? (
            <link rel="canonical" href={this.props.canonicalUrl} />
          ) : null}

          <link rel="preload" as="style" href="/public/css/main.bundle.css" />
          <link rel="stylesheet" href="/public/css/main.bundle.css" />

          <link
            rel="shortcut icon"
            href="/public/images/me.jpg"
            type="image/jpg"
          />
        </head>

        <body className={this.props.bodyClassName}>
          {this.props.children}

          <script src="/public/js/main.bundle.js" defer></script>
        </body>
      </html>
    );
  }
}
