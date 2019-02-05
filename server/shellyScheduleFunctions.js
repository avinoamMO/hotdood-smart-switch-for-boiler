
changeEventToShellyFormat = (event) =>{
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
let string = ""
let arr = []
event.monday===true? arr.push("0") : null
event.tuesday===true? arr.push("1") : null
event.wednsday===true? arr.push("2") : null
event.thursday===true? arr.push("3") : null
event.friday===true? arr.push("4") : null
event.saturday===true? arr.push("5") : null
event.sunday===true? arr.push("6") : null
arr.forEach(c=>{
                    string+=`${event.timeOn.split(":")[0]}${event.timeOn.split(":")[1]}-${c}-on,${event.timeOff.split(":")[0]}${event.timeOn.split(":")[1]}-${c}-off`
                })

                // -0- is the number of day and not the relay number!!!!!!
return string;

}

scheduleFromShellyToCsv = () =>{
   /* 
   Input : none

   Output : 
   1115-0-on,1145-0-off,1115-2-on,1117-3-on,1122-2-off,1145-2-on
   */ 
  let arrayFromShelly = []
  let string = ""
  const options = {  
      url: 'http://192.168.43.170/settings/relay/0',
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Accept-Charset': 'utf-8'
      }
  };
  
  request(options, function(err, res, body) {  
      arrayFromShelly = JSON.parse(body.scheduleRules);
      arrayFromShelly.forEach(c=>
                                {
                                 string+=c.split("")[1]
                                })
     return string;

  });   

};

addScheduleToOtherSchedules = (newEvents,currentSchedule) =>{
/*
    Input:
    (1) str1 = "1115-0-on,1145-0-off,1115-2-on,1117-3-on,1122-2-off,1145-2-on"
    (2) str2 = "1115-0-on,1145-0-off,1115-2-on,1117-3-on,1122-2-off,1145-2-on"

    Output:
    "1115-0-on,1145-0-off,1115-2-on,1117-3-on,1122-2-off,1145-2-on, 1115-0-on,1145-0-off,1115-2-on,1117-3-on,1122-2-off,1145-2-on"
*/

return  newEvents+=currentSchedule;
}


shellySetNewSchedule(newSchedule) = () =>{


/*
Input: Weekly schedule for Shelly.
Output: Get request to Shelly that sets the new schedule.
*/
let json = ""
const options = {  
    url: `http://192.168.43.170/settings/relay/0?schedule_rules=${newSchedule}`,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }
};

request(options, function(err, res, body) {  
    json = JSON.parse(body);
    console.log(json);
    response.send(json);        

});   


}
