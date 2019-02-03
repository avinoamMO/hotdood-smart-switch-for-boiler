// DB stuff:
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//client Schema:
const operationRecordSchema = new Schema({
    _opid: {type: String, required: true},
    uid : String,
    timeStamp : Date,
    onOrOff : Boolean,
 
})

//client model:
const OperationRecord = mongoose.model("OperationRecord", operationRecordSchema);

// Make this accessible.
module.exports = OperationRecord
