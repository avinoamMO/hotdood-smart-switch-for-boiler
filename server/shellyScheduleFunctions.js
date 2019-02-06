const request = require("request");
var rp = require('request-promise');


class TalkToShelly {
  
  changeEventToShellyFormat(event) {
    /*
        Input: 
        event = 
                {
                timeOn: "11:15",
                timeOff: "11:45",
                monday: true,
                tuesday: false,
                wednsday: true,
                thursday: true,
                friday: false,
                saturday: false,
                sunday: false,
                }
        
        Output:
        string = "1115-0-on,1145-0-off,1115-2-on,1117-3-on,1122-2-off,1145-2-on"
        */

    let string = "";
    let arr = [];
    event.monday === true ? arr.push("0") : null;
    event.tuesday === true ? arr.push("1") : null;
    event.wednsday === true ? arr.push("2") : null;
    event.thursday === true ? arr.push("3") : null;
    event.friday === true ? arr.push("4") : null;
    event.saturday === true ? arr.push("5") : null;
    event.sunday === true ? arr.push("6") : null;
    arr.forEach(c => {
      string += `${event.timeOn.split(":")[0]}${
        event.timeOn.split(":")[1]
      }-${c}-on,${event.timeOff.split(":")[0]}${
        event.timeOff.split(":")[1]
      }-${c}-off,`;
    });
    console.log(string);
    return string;

    // TODO: MAKE SURE THERE'S NO DANGLING COMMA!!!!! (unless shelly is forgiving for that.)
  }

  async scheduleFromShellyToCsv() {
    let json = "";
    const options = {
      url: "http://192.168.43.170/settings/relay/0?schedule_rules",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Charset": "utf-8"
      }
    };

    let data = await rp(options.url) 
      // logic goes here
      console.log("server talking to shelly");
      
      //   console.log("L68 [dis mins talktoshelly talked to shelly.]")
      let string = ""
        let lorem = JSON.parse(data);
        let arrayFromShelly = lorem.schedule_rules;
        console.log(`arrayfromShelly: ${arrayFromShelly}`)
        arrayFromShelly.forEach(c => {
        const  temp = c.split("'");
          // string+=c.split("'")[1]
          string += temp[0] += ",";
        }); // NOTE : there's a dangling comma issue HERE (use c,i in the forEach).

      console.log(`string l72: ${string}`);
      console.log(`String returned from server (currentSchedule): ${string}`)
      return (string)

  }

  /* 
           Input : none
        
           Output : 
           1115-0-on,1145-0-off,1115-2-on,1117-3-on,1122-2-off,1145-2-on
           */

  // let string = "";
  // console.log("trying to get current schedule from shelly")

  // const options = {
  //     url: 'http://192.168.43.170/settings/relay/0?schedule_rules',
  //     method: 'GET',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Accept-Charset': 'utf-8'
  //     }
  // };

  // request(options, function(err, res, body) {
  //     //   arrayFromShelly = JSON.parse(body.scheduleRules);
  //   console.log("L68 [dis mins talktoshelly talked to shelly.]")
  //   let lorem = JSON.parse(body);
  //   let arrayFromShelly = lorem.schedule_rules;
  //   arrayFromShelly.forEach(c => {
  //   const  temp = c.split("'");
  //     // string+=c.split("'")[1]
  //     string += temp[0] += ",";
  //   }); // NOTE : there's a dangling comma issue.

  //   console.log(string);
  //   return string;
  // });
  // console.log("endOfscheduleFromShellyToCsv");

  addScheduleToOtherSchedules(newEvents, currentSchedule) {
    /*
            Input:
            (1) str1 = "1115-0-on,1145-0-off,1115-2-on,1117-3-on,1122-2-off,1145-2-on"
            (2) str2 = "1115-0-on,1145-0-off,1115-2-on,1117-3-on,1122-2-off,1145-2-on"
        
            Output:
            "1115-0-on,1145-0-off,1115-2-on,1117-3-on,1122-2-off,1145-2-on, 1115-0-on,1145-0-off,1115-2-on,1117-3-on,1122-2-off,1145-2-on"
        */
    console.log((newEvents += currentSchedule));
    return (newEvents += currentSchedule);
  }
  async removeEventFromSchedule(value, list){
/*
            Input:
            (1) str1 = "1115-0-on"
            (2) str2 = "1115-0-on,1145-0-off,1115-2-on,1117-3-on,1122-2-off,1145-2-on"
        
            Output:
                strO  = "1145-0-off,1115-2-on,1117-3-on,1122-2-off,1145-2-on"
        */
       value = value.split(`"`)[1]
        console.log(`list before removal: ${list}`)
       console.log(`need to remove:  ${value}`)
  let values = list.split(",");
  for(let i = 0 ; i < values.length ; i++) {
    if(values[i] == value) {
      values.splice(i, 1);
      return values.join(",");
    }
  }
  console.log(`list after removal: ${list}`)
  return list;
  }
  shellySetNewSchedule(newSchedule) {
    /*
        Input: Weekly schedule for Shelly.
        Output: Get request to Shelly that sets the new schedule.
        */
    let json = "";
    const options = {
      url: `http://192.168.43.170/settings/relay/0?schedule_rules=${newSchedule}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Charset": "utf-8"
      }
    };

    request(options, function(err, res, body) {
      json = JSON.parse(body);
      console.log(json);
      // response.send(json);
    });
  }
}

module.exports = TalkToShelly;
/// TESTING :

// Stage 1:
// changeEventToShellyFormat(
//     {timeOn: "11:15",
//     timeOff: "11:45",
//     monday: true,
//     tuesday: false,
//     wednsday: true,
//     thursday: true,
//     friday: false,
//     saturday: false,
//     sunday: false}); // DIS WORKS!

// Stage 2:
// scheduleFromShellyToCsv(); // DIS WORKS!

//Stage 3:

// addScheduleToOtherSchedules("str1","str2"); // DIS WORKS!

// Stage 4:
// shellySetNewSchedule("1115-02-on"); // DIS WORKS!!!@
