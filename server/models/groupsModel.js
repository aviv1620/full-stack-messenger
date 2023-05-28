const mongoose = require('mongoose');
const {ObjectId} = mongoose

const groupsSchema = new mongoose.Schema(
  {
    usersMember:[ObjectId],
    readMessagesCounts:{
      type: Map,
      of: Number
    },
    name:String,
    length:Number,   
    lastUpdateDate:Date,
    lastMessageTime:Date,
    messages:[{
      sender:ObjectId,
      sendTime:Date,
      content:String
    }],
    img:String
  },
  { versionKey: false }
);


const Group = mongoose.model('groups', groupsSchema);

module.exports = Group;
