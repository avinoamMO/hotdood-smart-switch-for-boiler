import React, { Component } from 'react';
import axios from 'axios';

export default class OnOffToggleButton extends Component {
  
        
     handleButtonClick=()=>{
       
        
    this.props.turnSwitchOnWithInterval(this.props.dialValue);
    this.props.turnOnTimerRendering();
    
    if(this.props.switchStatus===true){
        console.log("handling turn off")
        this.props.turnSwitchOff();
    }
    else{
        console.log("handling turn on")
        // this.props.turnSwitchOn();    
    }

    }

  render() {    
  
    console.log(this.props)
    console.log(this.props.switchStatus)
    
    if(this.props.switchStatus!==null){
        return(
            <div id = "toggleButton">    {<form>
               
              <input className="ch" 
              type="checkbox" 
              name="temperature" 
              checked ={this.props.switchStatus}
              value={true} 
              onClick={this.handleButtonClick}/>
            </form>}
            </div>)
    }
    else{
        return(<div>lost connection to device</div>)
    }
      }
      }
      
      
