const request = require("request");
var rp = require("request-promise");
const deviceIP = "192.168.43.170"; //TODO: Make the IP address be a parameter when instantiating new class (oop)

class TalkToShelly {
  constructor() {}


  async turnOnWithInterval(interval){


    console.log(`http://${deviceIP}/relay/0?turn=on&timer=${interval}`)
    const options = {
      url: `http://${deviceIP}/relay/0?turn=on&timer=${interval}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Charset": "utf-8"
      }
    };

    let responseData = await rp(options.url);
   
    }
    
  async getSchedules() {
    let json = "";
    const options = {
      url: `http://${deviceIP}/settings/relay/0?schedule_rules`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Charset": "utf-8"
      }
    };

    let data = await rp(options.url);
    data = JSON.parse(data);
    return data;
  }

  async getStatus() {
    // Checks if relay is open or closed and returns boolean

    const options = {
      url: `http://${deviceIP}/settings/relay/0?status`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Charset": "utf-8"
      }
    };

    let data = await rp(options.url);
    return JSON.parse(data).ison;
  }

  async deleteAnEvent(eventObj) {
    let currentShellySchedule = await this.scheduleFromShellyToCsv();
    let newUpdatedSchedule = await this.removeEventFromSchedule(
      JSON.stringify(eventObj),
      currentShellySchedule
    );
    this.shellySetNewSchedule(newUpdatedSchedule);
  }

  async saveNewSchedule(eventObj) {
    let eventString = this.changeEventToShellyFormat(eventObj);
    let currentShellySchedule = await this.scheduleFromShellyToCsv();
    let newUpdatedSchedule = this.addScheduleToOtherSchedules(
      eventString,
      currentShellySchedule
    );
    this.shellySetNewSchedule(newUpdatedSchedule);
  }

  async changeEventToShellyFormat(event) {
    /*
        Input: 
        event = 
                {
                timeOn: "HH:MM",
                timeOff: "HH:MM",
                monday: boolean,
                tuesday: boolean,
                wednsday: boolean,
                thursday: boolean,
                friday: boolean,
                saturday: boolean,
                sunday: boolean,
                }
        
        Output:
        string = "HHMM-D-on/off"
        
        per each value: HHMM-D-ACTION where HHMM is the time, D is the weekday (0=monday, 7=sunday), ACTION is on or off.
        */

    let string = "";
    let dayOfWeekArr = [];
    event.monday === true ? dayOfWeekArr.push("0") : null;
    event.tuesday === true ? dayOfWeekArr.push("1") : null;
    event.wednsday === true ? dayOfWeekArr.push("2") : null;
    event.thursday === true ? dayOfWeekArr.push("3") : null;
    event.friday === true ? dayOfWeekArr.push("4") : null;
    event.saturday === true ? dayOfWeekArr.push("5") : null;
    event.sunday === true ? dayOfWeekArr.push("6") : null;
    dayOfWeekArr.forEach(c => {
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
      url: `http://${deviceIP}/settings/relay/0?schedule_rules`,
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

  async removeEventFromSchedule(event, schedule) {
    /*
            Input:
             event - an event that needs to be removed from schedule.
             schedule - the entire schedule.
        
            Output:
                 Returns schedule after removing any occurances identical to 'event'.
*/
    event = event.split(`"`)[1];
    let values = schedule.split(",");
    for (let i = 0; i < values.length; i++) {
      if (values[i] == event) {
        values.splice(i, 1);
        return values.join(",");
      }
    }

    return schedule;
  }
  shellySetNewSchedule(newSchedule) {
    /*
        Input: Weekly schedule for Shelly.
        Output: Get request to Shelly that sets the new schedule.
        */
    let json = "";
    const options = {
      url: `http://${deviceIP}/settings/relay/0?schedule_rules=${newSchedule}`,
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
