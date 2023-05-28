const mongoose = require('mongoose');
const {ObjectId} = mongoose


const userSchema = new mongoose.Schema(
  {
    triggers:[{action:String,parameter:String}],
    name: String,
    username: String,
    password:String,
    lastUpdateDate:Date,
    blokesList:[ObjectId],
    img:String,
  },
  { versionKey: false }
);


const User = mongoose.model('users', userSchema);

module.exports = User;
