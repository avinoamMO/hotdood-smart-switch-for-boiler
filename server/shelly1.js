var rp = require("request-promise")

module.exports = class TalkToShelly {
// TalkToShelly is an object that represents the shelly1 device and interacts with it on behalf of the server.
// shelly1 API documentation: https://shelly-api-docs.shelly.cloud/
// note: there is no official documentation for all the functions regarding the scheduling system on Shelly1,
// these were uncovered by insepcting the source code of the product's web interface.

  constructor(deviceIP) {
    this.deviceIP = deviceIP
    this.status = null
  }

  async switchRelayMode(interval) {
    // Switches Shelly on or off. 
    // If shelly is off and the method receives an internval (miliseconds) it will turn it on with a set-off timer.
    //TODO: add input validation
    let status = await this.getStatus()

    if (interval > 0 && !status)
       rp(`http://${this.deviceIP}/relay/0?turn=on&timer=${interval}`)
    else if (status) 
       rp(`http://${this.deviceIP}/relay/0?turn=off`)
    else 
       rp(`http://${this.deviceIP}/relay/0?turn=on`)
  }

  async getSchedules() {
    // Returns device's current weekly schedule (data directly from device)
    return JSON.parse(
      await rp(`http://${this.deviceIP}/settings/relay/0?schedule_rules`)
    )
  }

  async getStatus() {
    // Returns whether Shelly is on or off (data directly from device)
    this.status = JSON.parse(
      await rp(`http://${this.deviceIP}/settings/relay/0?status`)
    ).ison
    return this.status
  }

  async deleteAnEvent(event) {
    // Receives an event and deletes it from Shelly's schedule
    //TODO: add input validation
    this.shellySetNewSchedule(
      await this.removeEventFromSchedule(
        JSON.stringify(event),
        await this.scheduleFromShellyToCsv()
      )
    )
  }

   async saveNewEvent(event) {
    // Receives an event and add's it to Shelly's schedule
    //TODO: add input validation
    return this.shellySetNewSchedule(
       this.addScheduleToOtherSchedules(await this.changeEventToShellyFormat(event),await this.scheduleFromShellyToCsv())
      )
    
  }

  changeEventToShellyFormat(event) {
    /*
        Receives event object: 
        {timeOn: "HH:MM",timeOff: "HH:MM",monday: boolean,tuesday: boolean,wednsday: boolean,thursday: boolean,friday: boolean,saturday: boolean,sunday: boolean}
        Returns CSV string:
        "HHMM-D-ACTION, HHMM-D-ACTION,...." Where D is the weekday number (0=monday, 6=sunday), ACTION is on or off
        
    */
    let weekdays = [
      "monday",
      "tuesday",
      "wednsday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ]
    
    let activityDescription = ""
    let activeDays = []

    for (let day in weekdays) if (event[weekdays[day]]) activeDays.push(day)

    for (let day in activeDays)
      activityDescription += `${event.timeOn.split(":")[0]}${
        event.timeOn.split(":")[1]
      }-${day}-on,${event.timeOff.split(":")[0]}${
        event.timeOff.split(":")[1]
      }-${day}-off,`

    return activityDescription
  }

  async scheduleFromShellyToCsv() {
    // Returns shelly's current schedule in a single CSV string.

    let activityDescription = ""
    let schedule = JSON.parse(
      await rp(`http://${this.deviceIP}/settings/relay/0?schedule_rules`)
    ).schedule_rules

    for (let event of schedule)
      activityDescription += event.split("'")[0] += ","

    return activityDescription
  }

  addScheduleToOtherSchedules (newEvents, currentSchedule){return newEvents += currentSchedule}  
  

  removeEventFromSchedule(eventToRemove, schedule) {
    // Receives the entire schedule and a specific event to be removed. Returns the schedule string without occurances of the event.
    let events = schedule.split(",")
    eventToRemove = eventToRemove.split(`"`)[1]

    for (let i in events) if (events[i] === eventToRemove) events.splice(i, 1)
    return events
  }

  shellySetNewSchedule(newSchedule) {
    rp(`http://${this.deviceIP}/settings/relay/0?schedule_rules=${newSchedule}`)
    return newSchedule
  }
}
