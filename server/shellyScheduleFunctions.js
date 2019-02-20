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
        Receives event object: 
        {timeOn: "HH:MM",timeOff: "HH:MM",monday: boolean,tuesday: boolean,wednsday: boolean,thursday: boolean,friday: boolean,saturday: boolean,sunday: boolean}
        Returns CSV string:
        "HHMM-D-ACTION, HHMM-D-ACTION,...." Where D is the weekday number (0=monday, 6=sunday), ACTION is on or off
        
    */
    let weekdays = ["monday","tuesday","wednsday","thursday","friday","saturday","sunday"]
    let activityDescription  = ""
    let activeDays = []
    
    for(let day in weekdays)
         if (event[weekdays[day]]) activeDays.push(day)

    for(let day in activeDays)
            activityDescription+=`${event.timeOn.split(":")[0]}${event.timeOn.split(":")[1]}-${day}-on,${event.timeOff.split(":")[0]}${event.timeOff.split(":")[1]}-${day}-off,`
    
    return activityDescription 
  }

  async scheduleFromShellyToCsv() {
    // Returns shelly's current schedule in a single CSV string.
    
    let activityDescription = ""
    let schedule =  
    JSON.parse(await rp(`http://${this.deviceIP}/settings/relay/0?schedule_rules`)).schedule_rules
       
    for(let event of schedule)
          activityDescription += event.split("'")[0] += ","
    
    return activityDescription
  }

  addScheduleToOtherSchedules(newEvents, currentSchedule) {
    return (newEvents += currentSchedule)
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
