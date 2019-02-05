import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class AddSchdueleMenu extends Component{
    constructor (){
        super()
        this.state = {
                            time:     "yo",
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
                            time: this.state.time,
                            duration : this.state.duration,
                            sunday : this.state.sunday,
                            monday : this.state.monday,
                            tuesday : this.state.tuesday,
                            wednsday : this.state.wednsday,
                            thursday : this.state.thursday,
                            friday : this.state.friday,
                            saturday : this.state.saturday 
                        })
    }
    render(){
        return(
        <div className="AddSchduelePopUpMenu">            
                <div className="AddSchduelePopUpMenuContents">            
                <p/>        
                ON: <input type="Time" name="time" onChange={this.handleElementChange} /> for: <input type="Number" name="duration" min={1} max={999} onChange={this.handleElementChange} /> min
        
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
                <center><button onClick={this.sendNewSchedule}>Add</button><button onClick={this.props.closePopUp}>Cancel</button></center>
                
        </div>)
    }
}