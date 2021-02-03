import * as React from 'react';
import BaseLayout, { BaseLayoutProps } from './Base';
import Header from '../components/Header';
import Nav from '../components/Nav';

export default class Page extends React.Component<BaseLayoutProps> {
  render() {
    return (
      <BaseLayout {...this.props}>
        <Header>
          <h1>Marshal Hayes</h1>
          <Nav></Nav>
        </Header>

        <main>{this.props.children}</main>
      </BaseLayout>
    );
  }
}
