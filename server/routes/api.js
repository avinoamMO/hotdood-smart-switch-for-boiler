const express = require("express")
const request = require('request');
const router = express.Router()

let User = require("../models/User")
let Schedule = require("../models/Schedule")
let OperationRecord = require("../models/OperationRecord")


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

    router.get("/getSchedules", function (req, res) 
    {
        Schedule.find({}).exec(function(err,dataFromDb)
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
