const express = require("express")
const request = require('request');
const router = express.Router()

router.get("/sanity", function (req, res) 
    {
        res.send("OK")
    });

    router.get("/mockTurnOff", function (req, res) 
    {
        const mockTurnOffResponse = 
            {
                "ison": false,
                "has_timer": false
            }
            res.send(mockTurnOffResponse);
    });

    router.get("/mockTurnOn", function (req, res) 
    {
        const mockTurnOnResponse = 
            {
                "ison": true,
                "has_timer": false
            }
            res.send(mockTurnOnResponse);
    });

module.exports = router
