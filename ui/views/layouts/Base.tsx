import React from 'react';

export type BaseLayoutProps = {
  title?: string;
  isPreview?: boolean;
  canonicalUrl?: string;
  description?: string;
};

export default class BaseLayout extends React.Component<BaseLayoutProps> {
  render() {
    return (
      <html className="dark" dir="ltr" lang="en">
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

        <body className="bg-white dark:bg-black text-black dark:text-gray-100">
          {this.props.children}

          {this.props.isPreview ? (
            <div className="fixed top-0 right-0 mr-3 mt-3 px-3 py-2 bg-gray-900 text-white rounded">
              Preview Mode
            </div>
          ) : null}

          <script src="/public/js/main.bundle.js" defer></script>
        </body>
      </html>
    );
  }
}
