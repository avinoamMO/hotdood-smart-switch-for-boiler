const express = require("express")
const request = require('request');
const router = express.Router()
const TalkToShelly = require("../shellyScheduleFunctions.js") // treats this as a function???
let User = require("../models/User")
let Schedule = require("../models/Schedule")
let OperationRecord = require("../models/OperationRecord")
const talkToShelly = new TalkToShelly();

const deviceIP = "192.168.43.170" // Change to IP address of device.

/*
Useful API routes:
http://192.168.43.170/status
http://192.168.43.170/settings/relay/0?schedule_rules
http://192.168.43.170/settings/relay/0?schedule_rules=1115-0-on,1145-0-off,1115-2-on,1117-3-on,1122-2-off,1145-2-on
*/
    
router.get("/turnOff", function (req, res) 
    {
        const options = {  
            url: `http://${deviceIP}/relay/0?turn=off`,
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
            url: `http://${deviceIP}/relay/0?turn=on`,
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
            url: `http://${deviceIP}/relay/0?turn=on&timer=${interval}`,
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


router.get("/deleteAnEvent/:sch", async function (req, res) 
    {
        talkToShelly.deleteAnEvent(JSON.parse(req.params.sch))
    });


    router.get("/saveNewSchedule/:sch", async function (req, res) 
    {
        talkToShelly.saveNewSchedule(JSON.parse(req.params.sch))
    });

    


    router.get("/getSchedules", function (req, response) 
    {
        
            response.send(talkToShelly.getSchedules());
        
    });

    router.get("/getUsers", function (req, res) 
    {
        User.find({}).exec(function(err,dataFromDb)
            {
                res.send(dataFromDb)
            })    
    });
    router.get("/getoperationrecords", function (req, res) 
    {
        OperationRecord.find({}).exec(function(err,dataFromDb)
            {
                res.send(dataFromDb)
            })    
    });
    
    


    router.get("/status", async function (req, response) 
    {
        let data = await talkToShelly.getStatus()

        return data
    });

module.exports = router
