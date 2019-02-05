import React, { Component } from 'react';

export default class Schedule extends Component {

  render() {
      console.log(this.props)
    return (
    <div className="Schedule">
      {this.props.data.timeOn}
      </div>
    );
  }
}
