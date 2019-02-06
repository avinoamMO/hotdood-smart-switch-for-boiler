import React, { Component } from 'react';
 
export default class Schedule extends Component {

  deleteSchedule = () =>{
    this.props.deleteSchedule(this.props.data);
  }
  render() {
      console.log(this.props)
    return (
    <div className="Schedule">
      #{this.props.ind} schedule set to  {this.props.data} <button onClick={this.deleteSchedule}>X</button>
      
      </div>
    );
  }
}
