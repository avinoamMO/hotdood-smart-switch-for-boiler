import React, { Component } from 'react';
  
export default class Schedule extends Component {

  deleteSchedule = () =>{
    this.props.deleteSchedule(this.props.data);
    
  }
  returnDayOfWeekByNum = (dayNum) =>{
    
    if(parseInt(dayNum)===0){
      return "Monday"
    }
    if(parseInt(dayNum)===1){
      return "Tuesday"
    }
    if(parseInt(dayNum)===2){
      return "Wednsday"
    }
    if(parseInt(dayNum)===3){
      return "Thursday"
    }
    if(parseInt(dayNum)===4){
      return "Friday"
    }
    if(parseInt(dayNum)===5){
      return "Saturday"
    }
    if(parseInt(dayNum)===6){
      return "Sunday"
    }
  }
  render() {
      console.log(this.props.data)
      this.props.data.split("-")
      let timeOfDay = this.props.data.split("-")[0] 
      let dayOfWeek = this.returnDayOfWeekByNum(this.props.data.split("-")[1])
      let actionType = this.props.data.split("-")[2] 
      // 0-time
      // 1-day
      // 2-action
    return (
    <div id="event">
      Every {dayOfWeek} turn {actionType} at {timeOfDay}
      <button onClick={this.deleteSchedule}>X</button>
      
      </div>
    );
  }
}
