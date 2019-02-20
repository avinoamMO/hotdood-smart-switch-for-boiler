const express = require("express");
const request = require("request");
const router = express.Router();
const TalkToShelly = require("../shellyScheduleFunctions.js");
// let User = require("../models/User"); // TODO: Implement analytics module
// let OperationRecord = require("../models/OperationRecord"); // TODO: Implement analytics module

const talkToShelly = new TalkToShelly();

const deviceIP = "192.168.43.170"; // Change to IP address of device.

router.get("/turnOff", function(req, res) {
  talkToShelly.turnOn();
  res.send(`@api.js: turning off`)
});

router.get("/turnOn", function(req, res) {
  talkToShelly.turnOff();
  res.send(`@api.js: turning on`)
});

router.get("/turnOnWithInterval/:interval", function(req, res) {
  let interval = parseInt(req.params.interval.split("=")[1]);
  talkToShelly.turnOnWithInterval(interval);
  res.send(`@api.js: turning on Shelly with ${req.params.interval}ms`);
});

router.get("/deleteAnEvent/:sch", async function(req, res) {
  talkToShelly.deleteAnEvent(JSON.parse(req.params.sch));
});

router.get("/saveNewSchedule/:sch", async function(req, res) {
  talkToShelly.saveNewSchedule(JSON.parse(req.params.sch));
});

router.get("/getSchedules", async function(req, response) {
  response.send(await talkToShelly.getSchedules());
});

router.get("/getUsers", function(req, res) {
  // TODO (for users support)
});

router.get("/getoperationrecords", function(req, res) {
  // TODO (for analytics module)
});

router.get("/status", async function(req, response) {
  let data = await talkToShelly.getStatus();
  response.send(data);
});

module.exports = router;
