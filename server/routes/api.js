const express = require("express");
const router = express.Router();
const TalkToShelly = require("../shellyScheduleFunctions.js");
const talkToShelly = new TalkToShelly("192.168.43.170");

router.get("/turnOff", function(req, res) {
  talkToShelly.turnOff();
  res.send(`@api.js: turning off`)
});

router.get("/turnOn", function(req, res) {
  talkToShelly.turnOn();
  res.send(`@api.js: turning on`)
});

router.get("/turnOnWithInterval/:interval", function(req, res) {
  let interval = parseInt(req.params.interval.split("=")[1]);
  talkToShelly.turnOnWithInterval(interval);
  res.send(`@api.js: turning on Shelly with ${req.params.interval}ms`);
});

router.get("/deleteAnEvent/:sch", async function(req, res) {
  talkToShelly.deleteAnEvent(JSON.parse(req.params.sch));
  res.send("deleting event")
});

router.get("/saveNewSchedule/:sch", async function(req, res) {
  talkToShelly.saveNewSchedule(JSON.parse(req.params.sch));
  res.send("saving schedule")
});

router.get("/getSchedules", async function(req, response) {
  response.send(await talkToShelly.getSchedules());
});

router.get("/getUsers", function(req, res) {
  // TODO (for users support)
  res.end()
});

router.get("/getoperationrecords", function(req, res) {
  // TODO (for analytics module)
  res.end()
});

router.get("/status", async function(req, response) {
  let data = await talkToShelly.getStatus();
  console.log(data)
  response.send(data);
});

module.exports = router;
