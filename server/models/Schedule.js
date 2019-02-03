// DB stuff:
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//client Schema:
const scheduleSchema = new Schema({
    _sid: {type: String, required: true},
    uid : {type: String, required: true},
	timeOn : Date,
	timeOff : Date
})


//client model:
const Schedule = mongoose.model("Schedule", scheduleSchema);

// Make this accessible.
module.exports = Schedule

