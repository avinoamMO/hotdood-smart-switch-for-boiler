const express = require("express");
const router = express.Router();
const TalkToShelly = require("../shelly1.js");
const talkToShelly = new TalkToShelly("192.168.43.170");

router.get("/switchRelayMode/:interval", function(req, res) {
  talkToShelly.switchRelayMode(parseInt(req.params.interval));
  res.end();
});

router.get("/deleteAnEvent/:sch", async function(req, res) {
  // Add input validation.
  talkToShelly.deleteAnEvent(JSON.parse(req.params.sch));
  res.send("deleting event");
});

router.get("/saveNewEvent/:event", async function(req, res) {
  // Add input validation.
  
  res.send(await talkToShelly.saveNewEvent(JSON.parse(req.params.event)));
});

router.get("/getSchedules", async function(req, response) {
  response.send(await talkToShelly.getSchedules());
});

router.get("/status", async function(req, response) {
  let data = await talkToShelly.getStatus();
  response.send(data);
});

module.exports = router;
