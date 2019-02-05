import Roundy from 'roundy';
import React, { Component } from 'react';

//Roundy: https://github.com/themre/roundy

export default class dialController extends Component{
    constructor(){
        super()
        this.state ={value:0}
    }

    render(){
        const value = this.state.something

        //TODO: roundy needs to be able to set start the device.
        //TODO: roundy needs to retrieve value from device when initialized.
        return(
            <div>
        <Roundy
         value={this.state.value}
         min={1}
         max={120}
         stepSize={1}
         radius={100}
         arcSize={180}
         color='red'
         onChange={value => this.setState({value})}
         onAfterChange={value => this.props.turnSwitchOnWithInterval(this.state.value)}
         sliced={false}
         bgColor='blue'

        //  onAfterChange={value => this.props.turnSwitchOnWithInterval(value)}
        //  `hsl(${state.value}, 50%, 50%)`
        //  onAfterChange={(value, props) => ... }
        //  overrideStyle={ ... string template as CSS ...}
      /> 
      <div className="dial" id="dialDigit" font-size="150"><b>{this.state.value}</b></div>
            </div>
        )
    }
}