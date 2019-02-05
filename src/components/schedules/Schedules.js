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

  handleSaveNewSchedule = (e) => {
    this.props.setNewSchedule(e);
    console.log(e)
  }
  render() {
    
    if(this.props.schedules!==false){
      console.log(this.props.schedules) // this is an array of schedules
    }

    return (
      <div className="SchedulesPage">
      {this.state.renderAddSchduele ? <AddSchdueleMenu closePopUp={this.handleClosePopUp} saveSchedule={this.handleSaveNewSchedule} /> : null}
      List of active schedules:
      {this.props.schedules!=null? this.props.schedules.map((c,i)=>{return <Schedule ind={i} data={c} />}) : <div>loading...</div>}
      <button onClick={this.handleCallPopUp}>Add a schedule.</button>
      </div>
    );
  }
}
