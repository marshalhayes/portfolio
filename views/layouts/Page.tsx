import * as React from 'react';
import BaseLayout, { BaseLayoutProps } from './Base';
import Nav from '../components/Nav';

export default class Page extends React.Component<BaseLayoutProps> {
  render() {
    return (
      <BaseLayout {...this.props}>
        <header>
          <div className="container flex-wrapper flex-items-center flex-content-between">
            <div className="branding-wrapper">
              <img src="/static/images/me.jpg" className="branding-img"></img>
              <h1>Marshal Hayes</h1>
            </div>

            <Nav></Nav>
          </div>
        </header>

        <main className="container">{this.props.children}</main>
      </BaseLayout>
    );
  }
}
