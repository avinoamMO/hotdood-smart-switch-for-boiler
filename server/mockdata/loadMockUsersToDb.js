const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/hotDood')

const data = require(`C:/Users/Avinoam/Desktop/Bootcamp/HotDood/server/models/mockUserData.json`)
const User = require(`./User`)

data.forEach(d=> {
   let user = new User(d)
   user.save()
})