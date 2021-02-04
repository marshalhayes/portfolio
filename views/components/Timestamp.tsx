import * as React from 'react';

export default class Timestamp extends React.Component<{
  dateTime: Date | string;
  includeSeconds?: boolean;
}> {
  static defaultProps = {
    includeSeconds: false,
  };

  render() {
    const date = new Date(this.props.dateTime);
    if (!this.props.includeSeconds) {
      date.setSeconds(0, 0);
    }

    return (
      <time dateTime={date.toISOString()}>
        {this.props.includeSeconds
          ? date.toLocaleString()
          : date.toLocaleDateString()}
      </time>
    );
  }
}
