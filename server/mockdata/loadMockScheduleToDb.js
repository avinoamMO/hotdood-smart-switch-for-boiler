const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/hotDood')

const data = require(`C:/Users/Avinoam/Desktop/Bootcamp/HotDood/server/models/mockScheduleData.json`)
const Schedule = require(`./Schedule`)

data.forEach(d=> {
   let schedule = new Schedule(d)
   schedule.save()
})