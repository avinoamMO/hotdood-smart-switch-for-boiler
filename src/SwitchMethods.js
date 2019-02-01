import axios from "axios";

// This file should only contain functions that are effective immediately. 
// Scheduled operations are to be performed on server-side or, via built-in shelly features exclusively, here.


export function getSwitchStatus() {
  axios.get(`http://192.168.43.170/relay/0?status`).then(res => {
    if(res.data.ison===true){
        return true
    }
    if(res.data.ison===false){
        return false
    }
    if(res.data!==true && res.data!==false){
        return "NA"
    }
  });
  
}

export function turnSwitchOn() {
  
  axios.get(`http://192.168.43.170/relay/0?turn=on`).then(res => {

  if(res.data.ison!==true){
      setTimeout(turnSwitchOn,1500)
  }
  });
}

export function turnSwitchOff() {
  console.log("switchmethodsl23");
  const deviceIP = "192.168.43.170";

  axios.get(`http://${deviceIP}/relay/0?turn=off`).then(res => {
    if(res.data.ison!==false){
        setTimeout(turnSwitchOff,1500)
    }
  });
}
