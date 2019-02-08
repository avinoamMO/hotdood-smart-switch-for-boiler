const request = require("request");
var rp = require("request-promise");

class TalkToShelly {

  getSchedules = async () =>{
    
    let json = "";
    const options = {
      url: "http://192.168.43.170/settings/relay/0?schedule_rules",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Charset": "utf-8"
      }
    };

    let data = await rp(options.url);
    return(JSON.parse(data));
  }

  getStatus = async () =>{
    let json = "";
    const options = {
      url: "http://192.168.43.170/settings/relay/0?status",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Charset": "utf-8"
      }
    };

    let data = await rp(options.url);
    return(JSON.parse(data.ison));
  }

  deleteAnEvent = async (eventObj) =>
  {
    let eventString = this.changeEventToShellyFormat(eventObj);
    let currentShellySchedule = await this.scheduleFromShellyToCsv();
    let newUpdatedSchedule = await this.removeEventFromSchedule(JSON.stringify(eventObj),currentShellySchedule)
    this.shellySetNewSchedule(newUpdatedSchedule);
  }

  saveNewSchedule = async (eventObj) =>{
    
    let eventString = this.changeEventToShellyFormat(eventObj);
    let currentShellySchedule = await this.scheduleFromShellyToCsv();
    let newUpdatedSchedule = this.addScheduleToOtherSchedules(eventString,currentShellySchedule)
    this.shellySetNewSchedule(newUpdatedSchedule);
  }

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

        per each value: HHMM-D-ACTION where HHMM is the time, D is the weekday (0=monday, 7=sunday), ACTION being on or off.
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

    return string;
  }

  async scheduleFromShellyToCsv() {
    // Input: Gets the current schedule from Shelly in an array format.
    // Output: Returns the same in a single CSV string.

    let json = "";
    const options = {
      url: "http://192.168.43.170/settings/relay/0?schedule_rules",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Charset": "utf-8"
      }
    };

    let data = await rp(options.url);

    let string = "";
    let shellyData = JSON.parse(data);
    let arrayFromShelly = shellyData.schedule_rules;
    arrayFromShelly.forEach(c => {
      const temp = c.split("'");

      string += temp[0] += ",";
    });

    return string;
  }

  addScheduleToOtherSchedules(newEvents, currentSchedule) {
    return (newEvents += currentSchedule);
  }

  async removeEventFromSchedule(value, list) {
    /*
            Input:
             value - an event that needs to be removed from schedule.
             list - the entire schedule.
        
            Output:
                 Returns list after removing any events that are identical to 'value'.
*/
    value = value.split(`"`)[1];
    let values = list.split(",");
    for (let i = 0; i < values.length; i++) {
      if (values[i] == value) {
        values.splice(i, 1);
        return values.join(",");
      }
    }

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
    });
  }
}

module.exports = TalkToShelly;
