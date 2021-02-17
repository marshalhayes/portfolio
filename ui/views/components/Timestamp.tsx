import React from 'react';

export default class Timestamp extends React.Component<{
  dateTime: Date | string | number;
  className?: string;
  includeSeconds?: boolean;
}> {
  private readonly includeSeconds: boolean = false;
  private readonly className: string | null = null;
  private readonly date: Date;

  constructor(props) {
    super(props);

    this.includeSeconds = props.includeSeconds ?? false;
    this.className = props.className ?? null;

    this.date = new Date(props.dateTime);
    if (!this.includeSeconds) {
      this.date.setSeconds(0, 0);
    }
  }

  render() {
    return (
      <time dateTime={this.date.toISOString()} className={this.className}>
        {this.props.includeSeconds
          ? this.date.toLocaleString()
          : this.date.toLocaleDateString()}
      </time>
    );
  }
}
