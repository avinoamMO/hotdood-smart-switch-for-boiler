import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export default class YearlyUsageTrendLineChart extends Component{
    render(){

        // const data = [];
            // if(this.props.yearlyUsageData!=null){
            //     this.props.yearlyUsageData.map(c=>{
            //     let newDay =
            //     {
            //         year: c._id.year,
            //         month: c._id.month,
            //         day: c._id.day,
            //         date: c._id.day+"/"+c._id.month+"/"+c._id.year,
            //         count: c.count
            //     }
            //     data.push(newDay)
                // return null // Added this to eliminate compile warning.
            // })
        
        if(this.props.yearlyUsageData!=null)
        {
        return(
            <div>
               {/* Usage since: {data[data.length-1].date}*  */}
                                <p/>
         <ResponsiveContainer width={350} height={175}>
         <LineChart width={600} height={300} data={this.props.yearlyUsageData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="date"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Line type="monotone" dataKey="count" stroke="red" activeDot={{r: 8}}/>
            </LineChart>
         </ResponsiveContainer>
         </div>
         )
        }
        else{
            return(<div>loading...</div>)
        }
    }
}
