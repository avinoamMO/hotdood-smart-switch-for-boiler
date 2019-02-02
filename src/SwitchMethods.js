import axios from "axios";

// This file should only contain functions that are effective immediately. 
// Scheduled operations are to be performed on server-side or shelly1-side.

// export function getSwitchStatus() {
//   axios.get(`http://localhost:3007/status`).then(res => {
//         this.setState({dataLoaded:true,switchStatus:res.data})
//         console.log(`this.state.switchStatus = ${this.state.switchStatus}`)
//       }).catch(function(error){
//         console.log(error);
//       })
  
// }

export function turnSwitchOn() {
console.log("sending turn on request")  
  axios.get(`http://localhost:3007/turnOn`).then(res => {
  if(res.data.ison===false){
    console.log(res.data)
      // setTimeout(turnSwitchOn,1500)
  }
  }).catch(function(error){
    console.log(error);
  });

}

export function turnSwitchOff() {
  console.log("sending turn off request")
  axios.get(`http://localhost:3007/turnOff`).then(res => {
  if(res.data.ison===true){
      console.log(res.data)
        // setTimeout(turnSwitchOff,1500)
    }
  }).catch(function(error){
    console.log(error);
  });
}
