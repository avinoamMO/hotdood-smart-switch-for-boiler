import React, { Component } from 'react';

export default class Schedule extends Component {

  render() {
      console.log(this.props)
    return (
    <div className="Schedule">
      #{this.props.ind} schedule set to  {this.props.data} <button>X</button>
      
      </div>
    );
  }
}
