import React, { Component } from 'react';

export default class AddSchdueleMenu extends Component{
    constructor (){
        super()
        this.state = {
                            timeOn: "00:00",
                            timeOff: "00:00", 
                            duration : "0",
                            sunday : false,
                            monday : false,
                            tuesday : false,
                            wednsday : false,
                            thursday : false,
                            friday : false,
                            saturday : false
                     }
    }
    handleElementChange=(e)=>{
        
        if(e.target.value==="on"){
            this.setState({[e.target.name] : e.target.checked})
        }
        else{
            this.setState({[e.target.name] : e.target.value})
        }
    }
    sendNewSchedule = () =>{
    this.props.saveSchedule({
                            timeOn: this.state.timeOn,
                            timeOff: this.state.timeOff,
                            sunday : this.state.sunday,
                            monday : this.state.monday,
                            tuesday : this.state.tuesday,
                            wednsday : this.state.wednsday,
                            thursday : this.state.thursday,
                            friday : this.state.friday,
                            saturday : this.state.saturday 
                        })
    this.props.closePopUp();
    }
    render(){
        return(
        <div className="AddSchduelePopUpMenu">            
                <div className="AddSchduelePopUpMenuContents">            
                <p/>        
                ON:  <input type="Time"  name="timeOn" onChange={this.handleElementChange} /> 
                <p/>
                OFF: <input type="Time" name="timeOff" onChange={this.handleElementChange} />
        
                <p/>
                Every:
                <p/>
                <label>
                <input type="checkbox" name={"sunday"} onChange={this.handleElementChange} /> 
                <span>Sunday</span>
                </label><p/>
                <label>
                <input type="checkbox" name={"monday"} onChange={this.handleElementChange}/>
                <span>Monday</span>
                </label><p/>
                <label>
                <input type="checkbox" name={"tuesday"} onChange={this.handleElementChange} />
                <span>Tuesday</span>
                </label><p/>
                <label>
                <input type="checkbox" name={"wednsday"} onChange={this.handleElementChange}/>
                <span>Wednsday</span>
                </label><p/>
                <label>
                <input type="checkbox" name={"thursday"} onChange={this.handleElementChange}/>
                <span>Thursday</span>
                </label><p/>
                <label>
                <input type="checkbox" name={"friday"} onChange={this.handleElementChange}/>
                <span>Friday</span>
                </label><p/>
                <label>
                <input type="checkbox" name={"saturday"} onChange={this.handleElementChange}/>
                <span>Saturday</span>
                </label><p/>
                </div>
                <p/>
                <center>
                <button id="saveEventButton" onClick={this.sendNewSchedule}>Add</button><button id="cancelEventButton" onClick={this.props.closePopUp}>Cancel</button>
                </center>
        </div>)
    }
}