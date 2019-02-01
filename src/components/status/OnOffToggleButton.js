import React, { Component } from 'react';
import axios from 'axios';

export default class OnOffToggleButton extends Component {
  

    async handleButtonClick(){
       
        this.props.turnSwitchOff();

    if(this.props.switchStatus===true){
        this.props.turnSwitchOff();
    }
    if(this.props.switchStatus===false){
    this.props.turnSwitchOn();
   }

    }

  render() {    
    
    
    return(
    <div>
    {<form>
      {this.props.label}
      <input className="ch" type="checkbox" name="temperature" value={this.props.value} onClick={this.handleButtonClick.bind(this)}/>
    </form>}
    </div>)
      }
      }
      
      
