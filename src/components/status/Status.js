import React, { Component } from 'react';
import OnOffToggleButton from './OnOffToggleButton'

export default class Status extends Component {
  
  
  render() {    
    return(
    <div className = "statusPage">
    <OnOffToggleButton 
    label ="" 
    switchStatus= {this.props.switchStatus} 
    turnSwitchOn={this.props.turnSwitchOn}
    turnSwitchOff={this.props.turnSwitchOff}/>
    </div>)
      }
      }
      
      
