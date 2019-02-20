const request = require("request");
var rp = require("request-promise");

class TalkToShelly {
  constructor(deviceIP) {
    this.deviceIP = deviceIP;
  }

  turnOff() {
    rp(`http://${this.deviceIP}/relay/0?turn=off`);
  }

  turnOn() {
    rp(`http://${this.deviceIP}/relay/0?turn=on`);
  }

  turnOnWithInterval(interval) {
    rp(`http://${this.deviceIP}/relay/0?turn=on&timer=${interval}`);
  }

  async getSchedules() {
    return JSON.parse(
      await rp(`http://${this.deviceIP}/settings/relay/0?schedule_rules`)
    );
  }

  async getStatus() {
    return JSON.parse(
      await rp(`http://${this.deviceIP}/settings/relay/0?status`)
    ).ison
  }

  async deleteAnEvent(event) {
     
      this.shellySetNewSchedule(
      await this.removeEventFromSchedule(JSON.stringify(event),await this.scheduleFromShellyToCsv()))
  
    }

  async saveNewSchedule(event) {
    
    this.shellySetNewSchedule(
      await this.addScheduleToOtherSchedules(
        await this.changeEventToShellyFormat(event), await this.scheduleFromShellyToCsv())
    )
  }

  async changeEventToShellyFormat(event) {
    /*
        Receives: 
        {timeOn: "HH:MM",timeOff: "HH:MM",monday: boolean,tuesday: boolean,wednsday: boolean,thursday: boolean,friday: boolean,saturday: boolean,sunday: boolean}
        
        Returns:
        string = "HHMM-D-ACTION" (if multiple weekdays are true, it retuns a CSV string of the events)
        Where D is the weekday (0=monday, 7=sunday), ACTION is on or off
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
    // Returns shelly's schedule in a single CSV string.

    let json = "";
    const options = {
      url: `http://${this.deviceIP}/settings/relay/0?schedule_rules`,
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
            Receives: A specific event that needs to be removed and the entire shcedule.
            Returns: The schedule without any occurances of said event.
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
        Receives: Weekly schedule.
        Output: Sets said schedule as the new schedule on Shelly.
        */
    console.log(newSchedule);
    let json = "";
    const options = {
      url: `http://${
        this.deviceIP
      }/settings/relay/0?schedule_rules=${newSchedule}`,
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
