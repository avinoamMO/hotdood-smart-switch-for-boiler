// DB stuff:
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//client Schema:
const userSchema = new Schema({
    _uid: {type: String, required: true},
    name: String,
    phoneNum : String,
	photoUrl : String,
	userCreated : Date,
	isOwner : Boolean,
    isAdmin : Boolean,
    kidMode : Boolean
})

//client model:
const User = mongoose.model("User", userSchema);

// Make this accessible.
module.exports = User
