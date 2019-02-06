const express = require("express")
const request = require('request');
const router = express.Router()
const TalkToShelly = require("../shellyScheduleFunctions.js") // treats this as a function???
let User = require("../models/User")
let Schedule = require("../models/Schedule")
let OperationRecord = require("../models/OperationRecord")

const talkToShelly = new TalkToShelly();

// talkToShelly.addScheduleToOtherSchedules("str1","str2");
console.log(talkToShelly)
// talkToShelly.addScheduleToOtherSchedules("str1","str2");

/*
API for getting status: 
Including uptime, connection status, etc.
http://192.168.43.170/status

API for getting the schedules:
http://192.168.43.170/settings/relay/0?schedule_rules

API for settings the schedules:
http://192.168.43.170/settings/relay/0?schedule_rules=1102-0-on

API for settings multiple schedules:
http://192.168.43.170/settings/relay/0?schedule_rules=1115-0-on,1145-0-off,1115-2-on,1117-3-on,1122-2-off,1145-2-on

API works like this: ?schedule_rules=<hhmm(ex. 1106)_day(represented by 1 digit between 0-6 where 0 is monday and 6 is sunday)_on/off(Leave one)
*/
router.get("/sanity", function (req, res) 
    {
        res.send("OK")
    });
    
    router.get("/saveNewSchedule/:sch", async function (req, res) 
    {
        /* 
                Some pseudo code:

                1. turn the object from the client to a string in the format 
                   that shelly knows:
                   let newSch = changeEventToShellyFormat(obj);

                2. fetch the existing schedule that shelly has right now
                   let currentSchedule = scheduleFromShellyToCsv();

                3. add the new schduele to the existing schduele
                   let newSchedule = addScheduleToOtherSchedules(newEvents,currentSchedule);

                4. send an order to shelly to update her schdueles
                   shellySetNewSchedule(newSchedule);

        */

        let eventObj = JSON.parse(req.params.sch); // get event from user
        console.log(`eventObj: ${JSON.stringify(eventObj)}`)
        let eventString = talkToShelly.changeEventToShellyFormat(eventObj);
        console.log(`eventString: ${eventString}`)
        let currentShellySchedule = await talkToShelly.scheduleFromShellyToCsv();
        console.log(`currentShellySchedule: ${currentShellySchedule}`)
        let newUpdatedSchedule = talkToShelly.addScheduleToOtherSchedules(eventString,currentShellySchedule)
        console.log(`newUpdatedSchedule: ${newUpdatedSchedule}`)
        talkToShelly.shellySetNewSchedule(newUpdatedSchedule);
        // console.log(`old schedule: ${currentShellySchedule}`)
        // console.log(`new schedule: ${newUpdatedSchedule}`)
        // console.log("finished getting an event from client and adding it to shelly.")
    res.send("@server: L63 API.JS")
        // res.send(`@server: client params: ${req.params.sch}`)
        // res.send(`@server: old schedule: ${currentShellySchedule}`)
        // res.send(`@server: new schedule: ${newUpdatedSchedule}`)
    });

    router.get("/getUsers", function (req, res) 
    {
        User.find({}).exec(function(err,dataFromDb)
            {
                res.send(dataFromDb)
            })    
    });

    router.get("/getSchedules", function (req, response) 
    {
        let json = ""
        const options = {  
            url: 'http://192.168.43.170/settings/relay/0?schedule_rules',
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



    });

    router.get("/getoperationrecords", function (req, res) 
    {
        OperationRecord.find({}).exec(function(err,dataFromDb)
            {
                res.send(dataFromDb)
            })    
    });
    
    router.get("/turnOff", function (req, res) 
    {
        const options = {  
            url: 'http://192.168.43.170/relay/0?turn=off',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8'
            }
        };
        
        request(options, function(err, res, body) {  
            let json = JSON.parse(body);
            console.log(json);
        });   


            res.send("something");
    });

    router.get("/turnOn", function (req, res) 
    {
        const options = {  
            url: 'http://192.168.43.170/relay/0?turn=on',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8'
            }
        };
        
        request(options, function(err, res, body) {  
            let json = JSON.parse(body);
            console.log(json);
        });   


            res.send("something2");
    });

    router.get("/turnOnWithInterval/:interval", function (req, res) 
    {
        let interval = parseInt(req.params.interval.split("=")[1])
        if(!isNaN(interval) || interval<0){
            console.log("Invalid syntax sent to server")
            res.send("Invalid syntax sent to server");
            res.end();

        }
        console.log(`turning on with interval = ${interval}`)
        const options = {  
            url: `http://192.168.43.170/relay/0?turn=on&timer=${interval}`,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8'
            }
        };
        
        request(options, function(err, res, body) {  
            // let json = JSON.parse(body);
            // console.log(json);
        });   


            res.send(`Server asking Shelly to turn on @ interval = ${interval}`);
    });


    router.get("/status", function (req, response) 
    {
        const options = {  
            url: 'http://192.168.43.170/relay/0?status',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8'
            }
        };
        
        request(options, function(err, res, body) {  
            let json = JSON.parse(body);
            console.log(json);
            response.send(json.ison)
        });   
    });




    
module.exports = router
