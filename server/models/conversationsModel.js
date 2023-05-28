const mongoose = require('mongoose');
const {ObjectId,Date} = mongoose

const conversationsSchema = new mongoose.Schema(
  {
    userIdFirst: ObjectId,
    ReadMessagesCountFirst:Number,
    userIdSecond: ObjectId,
    ReadMessagesCountSecond:Number,
    otherID:ObjectId,
    length:Number,
    lastUpdateDate:Date,
    lastMessageTime:Date,
    messages:[{
      sender:ObjectId,
      sendTime:Date,
      content:String
    }]
  },
  { versionKey: false }
);


const Conversation = mongoose.model('conversations', conversationsSchema);

module.exports = Conversation;
