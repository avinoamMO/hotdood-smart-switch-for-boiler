import React, { Component } from 'react';
import OnOffToggleButton from './OnOffToggleButton'

export default class Status extends Component {
  
  
  render() {    
    
    
    return(
    <div>
    <OnOffToggleButton 
    label ="labeltextfromstatus" 
    status='true' 
    value="is_on" 
    turnSwitchOn={this.props.turnSwitchOn}
    turnSwitchOff={this.props.turnSwitchOff}/>
    </div>)
      }
      }
      
      
