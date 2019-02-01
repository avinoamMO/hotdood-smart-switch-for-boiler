import React, { Component } from 'react';
import OnOffToggleButton from './OnOffToggleButton'

export default class Status extends Component {
  
  
  render() {    
     let switchStatus =  this.props.getSwitchStatus()
        console.log(switchStatus)
    
    return(
    <div id = "toggleButton">
    <OnOffToggleButton 
    label ="On/Off" 
    switchStatus= {false}
    value="is_on" 
    turnSwitchOn={this.props.turnSwitchOn}
    turnSwitchOff={this.props.turnSwitchOff}/>
    </div>)
      }
      }
      
      
