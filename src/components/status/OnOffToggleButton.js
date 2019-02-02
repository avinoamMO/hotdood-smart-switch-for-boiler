import React, { Component } from 'react';
import axios from 'axios';

export default class OnOffToggleButton extends Component {
  

     handleButtonClick(){
       
    if(this.props.switchStatus===true){
        console.log("handling turn off")
        this.props.turnSwitchOff();
    }
    else{
        console.log("handling turn on")
        this.props.turnSwitchOn();    
    }

    }

  render() {    
    
    
    return(
    <div id = "toggleButton">    {<form>
      {this.props.label}
      <input className="ch" 
      type="checkbox" 
      name="temperature" 
      value={this.props.value} 
      onClick={this.handleButtonClick.bind(this)}/>
    </form>}
    </div>)
      }
      }
      
      
