import React, { Component } from 'react';
import UsersDeviceUsageTimeBarChart from './UsersDeviceUsageTimeBarChart'
import YearlyUsageTrendLineChart from './YearlyUsageTrendLineChart'
export default class Analytics extends Component {
  componentDidMount(){
    
    this.props.getOperationRecords();
  }

  render() {

// Mock data:    
    const deviceUsageByUsers = [ 
      {
        "AnswerRef": "one",
        "Text": "Lidor",
        "UsageInHours": 20,
        "RespondentPercentage": 12,
        "Rank": 1
      },
      {
        "AnswerRef": "two",
        "Text": "Avinoam",
        "UsageInHours": 2,
        "RespondentPercentage": 32,
        "Rank": 2
      },
      {
        "AnswerRef": "three",
        "Text": "Netta",
        "UsageInHours": 10,
        "RespondentPercentage": 41,
        "Rank": 3
      },
      {
        "AnswerRef": "four",
        "Text": "Guest",
        "UsageInHours": 5,
        "RespondentPercentage": 16,
        "Rank": 4
      }
  ];
  
// Mock data:
  const yearlyUsageData = [
    {date: 'Page A', count: 4000, pv: 2400, amt: 2400},
    {date: 'Page B', count: 3000, pv: 1398, amt: 2210},
    {date: 'Page C', count: 2000, pv: 9800, amt: 2290},
    {date: 'Page D', count: 2780, pv: 3908, amt: 2000},
    {date: 'Page E', count: 1890, pv: 4800, amt: 2181},
    {date: 'Page F', count: 2390, pv: 3800, amt: 2500},
    {date: 'Page G', count: 3490, pv: 4300, amt: 2100},
  ]

    return (
        <div className="AnalyticsPage">
      <UsersDeviceUsageTimeBarChart deviceUsageByUsers={deviceUsageByUsers}/>  
      <YearlyUsageTrendLineChart yearlyUsageData={yearlyUsageData}/>
      </div>
    );
  }
}
