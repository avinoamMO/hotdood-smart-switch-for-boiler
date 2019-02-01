import React, { Component } from 'react';
import axios from 'axios';

export default class OnOffToggleButton extends Component {
  

    handleButtonClick(){
        
    }
  render() {    
    
    
    return(
    <div>
    {<form>
      {this.props.label}
      <input className="ch" type="checkbox" name="temperature" value={this.props.value} onClick={this.props.turnSwitchOn}/>
    </form>}
    </div>)
      }
      }
      
      
