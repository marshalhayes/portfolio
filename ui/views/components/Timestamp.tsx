import * as React from 'react';

export default class Timestamp extends React.Component<{
  dateTime: Date | string | number;
  className?: string;
  includeSeconds?: boolean;
}> {
  static defaultProps = {
    includeSeconds: false,
  };

  private readonly date: Date;

  constructor(props) {
    super(props);

    this.date = new Date(props.dateTime);
    if (!props.includeSeconds) {
      this.date.setSeconds(0, 0);
    }
  }

  render() {
    return (
      <time dateTime={this.date.toISOString()} className={this.props.className}>
        {this.props.includeSeconds
          ? this.date.toLocaleString()
          : this.date.toLocaleDateString()}
      </time>
    );
  }
}
