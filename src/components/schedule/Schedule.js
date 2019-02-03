import React, { Component } from 'react';

export default class Schedule extends Component {
  componentDidMount(){
   
    this.props.getSchedules();
   
  }
  render() {
    return (
<div className="mainContainer">
      I am the Schedule.
      </div>
    );
  }
}
