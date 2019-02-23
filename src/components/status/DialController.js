import Roundy from 'roundy';
import React, { Component } from 'react';

// Roundy: https://github.com/themre/roundy

export default class dialController extends Component{
    constructor(){
        super()
        this.state ={value:0}
    }

    render(){
        //TODO: roundy needs to retrieve value  when initialized.
        return(
            <div>
        <Roundy
         value={this.props.dialValue}
         min={0}
         max={120}
         stepSize={1}
         radius={140}
         arcSize={360}
         color='black'
         onChange={value => this.props.changeDialValue(value)}      
         sliced={true}
         bgColor='gray'
      /> 
            </div>
        )
    }
}