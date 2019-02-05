const express = require("express")
const request = require('request');
const router = express.Router()

let User = require("../models/User")
let Schedule = require("../models/Schedule")
let OperationRecord = require("../models/OperationRecord")

/*
API for getting status: 
Including uptime, connection status, etc.
http://192.168.43.170/status

API for getting the schedules:
http://192.168.43.170/settings/relay/0?schedule_rules

API for settings the schedules:
http://192.168.43.170/settings/relay/0?schedule_rules=1102-0-on

API works like this: ?schedule_rules=<hhmm(ex. 1106)_day(represented by 1 digit between 0-6 where 0 is monday and 6 is sunday)_on/off(Leave one)
*/
router.get("/sanity", function (req, res) 
    {
        res.send("OK")
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
