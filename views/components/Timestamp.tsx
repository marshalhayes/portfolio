import * as React from 'react';

export default class Timestamp extends React.Component<{
  dateTime: Date | string;
  className?: string;
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
      <time dateTime={date.toISOString()} className={this.props.className}>
        {this.props.includeSeconds
          ? date.toLocaleString()
          : date.toLocaleDateString()}
      </time>
    );
  }
}
