import React from 'react';

export type BaseLayoutProps = {
  title?: string;
  isPreview?: boolean;
  canonicalUrl?: string;
  description?: string;
};

export default class BaseLayout extends React.Component<BaseLayoutProps> {
  private readonly title: string;

  constructor(props) {
    super(props);

    this.title =
      this.props.title?.length > 0
        ? `${this.props.title} // Marshal Hayes`
        : 'Marshal Hayes';
  }

  render() {
    return (
      <html className="dark" dir="ltr" lang="en">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

          <title>{this.title}</title>

          {this.props.title ? (
            <meta name="og:title" content={this.props.title} />
          ) : null}

          {this.props.description?.length > 0 ? (
            <>
              <meta name="description" content={this.props.description} />
              <meta name="og:description" content={this.props.description} />
            </>
          ) : null}

          {this.props.canonicalUrl?.length > 0 ? (
            <>
              <meta name="og:url" content={this.props.canonicalUrl} />
              <link rel="canonical" href={this.props.canonicalUrl} />
            </>
          ) : null}

          <link rel="preload" as="style" href="/public/css/main.bundle.css" />
          <link rel="stylesheet" href="/public/css/main.bundle.css" />

          <link
            rel="shortcut icon"
            href="/public/images/me.jpg"
            type="image/jpg"
          />
        </head>

        <body className="bg-gray-100 dark:bg-black text-black dark:text-gray-100">
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
