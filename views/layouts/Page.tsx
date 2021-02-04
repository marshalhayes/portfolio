import * as React from 'react';
import BaseLayout, { BaseLayoutProps } from './Base';
import Nav from '../components/Nav';

export default class Page extends React.Component<BaseLayoutProps> {
  render() {
    return (
      <BaseLayout {...this.props}>
        <header>
          <h1>Marshal Hayes</h1>
          <Nav></Nav>
        </header>

        <main>{this.props.children}</main>
      </BaseLayout>
    );
  }
}
