import React, { Component } from 'react';
import Schedule from './Schedule'

export default class Schedules extends Component {
  componentDidMount(){
   
    this.props.getSchedules();
    
  }
  render() {
    
    if(this.props.schedules!==null){
      console.log(this.props.schedules)
    }

    return (
<div className="SchedulesPage">

{/* // {this.props.schedules!=null? this.props.schedules.map((c,i)=>{return <Schedule ind={i} data={c} />}) : <div><img width="500" height="500" src="https://i.warosu.org/data/diy/img/0006/81/1408049964044.gif" alt="loading"/></div>} */}
      I am the Schedules.
      </div>
    );
  }
}
