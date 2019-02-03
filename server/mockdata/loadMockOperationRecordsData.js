const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/hotDood')

const data = require(`C:/Users/Avinoam/Desktop/Bootcamp/HotDood/server/models/mockOperationRecordData.json`)
const OperationRecord = require(`./OperationRecord`)

data.forEach(d=> {
   let operationRecord = new OperationRecord(d)
   operationRecord.save()
})