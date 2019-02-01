import React, { Component } from 'react';
import { BarChart, CartesianGrid , XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';


// "AnswerRef": "two",
// "Text": "Avinoam",
// "Score": 0,
// "RespondentPercentage": 32,
// "Rank": 2

export default class UsersDeviceUsageTimeBarChart extends Component{
    render(){
        
        if(this.props.deviceUsageByUsers===null)
        {
            return(
                <div>Loading device usage by users bar chart</div>
            )
        }
        else{
        return(
            <div id="UsageBarChart">
                <center>This month's usage by users</center>
         <ResponsiveContainer width={300} height={300}>
         <BarChart layout={"horizontal"} width={250} height={250} data={this.props.deviceUsageByUsers}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Text" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="UsageInHours" fill="#8884d8" />
         </BarChart>
         </ResponsiveContainer>
         </div>
         )
    }
}
}
