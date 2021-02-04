import * as React from 'react';

export default class Nav extends React.Component {
  render() {
    return (
      <nav>
        <ul className="list-unstyled nav-items">
          <li>
            <a href="/blog">Blog</a>
          </li>

          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
    );
  }
}
