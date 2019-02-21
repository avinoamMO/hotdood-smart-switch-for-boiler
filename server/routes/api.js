const express = require("express")
const router = express.Router()
const TalkToShelly = require("../shelly1.js")
const talkToShelly = new TalkToShelly("192.168.43.170")

// TODO: change names 'event' and 'schedule' to be consistent throughout all server and client.

router.get("/switchRelayMode", function(req, res) {

  talkToShelly.switchRelayMode(req.params.interval)
    res.end()
})

router.get("/deleteAnEvent/:sch", async function(req, res) {
  talkToShelly.deleteAnEvent(JSON.parse(req.params.sch))
  res.send("deleting event")
})

router.get("/saveNewSchedule/:sch", async function(req, res) {  
    // console.log(req.params.sch)
  talkToShelly.saveNewSchedule(JSON.parse(req.params.sch))
  res.send("saving schedule")
})

router.get("/getSchedules", async function(req, response) {
  response.send(await talkToShelly.getSchedules())
})

router.get("/status", async function(req, response) {
  let data = await talkToShelly.getStatus()
  response.send(data)
})

module.exports = router
