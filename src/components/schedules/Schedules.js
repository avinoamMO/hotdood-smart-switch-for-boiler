import React, { Component } from 'react';
import Schedule from './Schedule'
import AddSchdueleMenu from './AddSchdueleMenu'
export default class Schedules extends Component {
  constructor(){
    super()
    this.state = ({renderAddSchduele : false})
  
  }
  componentDidMount(){
   
    this.props.getSchedules();
    
  }
  handleCallPopUp = ()=>{
    this.setState({renderAddSchduele : true})

  }
  
  handleClosePopUp = ()=>{
    
    this.setState({renderAddSchduele : false})

  }

  handlesaveNewEvent = (e) => {
    this.props.setNewSchedule(e);
    console.log(e)
  }

  handleDeleteSchedule = (e) => {
    console.log(`@schedules.js: called for delete of an event in the schedule.`)
    console.log(`handling request to delete the event ${e}`)
    this.props.deleteAnEvent(e);
    this.props.getSchedules();
    let tempState = this.state
  }
  render() {
    
    if(this.props.schedules!==false){
      console.log(this.props.schedules) // this is an array of schedules
    }
    if(this.props.schedules!=null){
      if(this.props.schedules.length>0){
        
      }
    }
    return (
      <div>
      
      <div className="SchedulesPage">
      {this.state.renderAddSchduele ? <AddSchdueleMenu closePopUp={this.handleClosePopUp} saveSchedule={this.handlesaveNewEvent} /> : null}
      <div id="scheduleHeadline">Schedules</div>
      <div id="listOfCurrentSchedules">
      {this.props.schedules!=null? this.props.schedules.map((c,i)=>{return <Schedule ind={i} data={c} deleteSchedule={this.handleDeleteSchedule}/>}) : <div>loading...</div>}
      </div>
      <div id="addScheduleButton"><button onClick={this.handleCallPopUp}>Add a schedule</button></div>
      </div>
      </div>
    );
  }
}
