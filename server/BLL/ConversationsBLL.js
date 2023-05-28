const { pushNotifiedUsers } = require('../websocket');
const Conversation = require('../models/conversationsModel');

async function addMessageConversations(myID,dstID,content){ 

    const bothID = {'$or':[{userIdFirst:myID,userIdSecond:dstID},{userIdSecond:myID,userIdFirst:dstID}]}

    let conversation = await Conversation.findOne(bothID)

    if(!conversation)
        conversation = new Conversation({userIdFirst:myID,userIdSecond:dstID,messages:[]});

    const sendTime = new Date

    const newMassage = {
        sender:myID,
        sendTime:sendTime,
        content: content
    }
    
    conversation.messages.push(newMassage)
    conversation.length = conversation.messages.length
    conversation.lastUpdateDate = sendTime
    conversation.lastMessageTime = sendTime
    conversation.save()

    pushNotifiedUsers([myID,dstID])

    return "added"
}



async function getConversation(myID,dstID){

    const bothID = {'$or':[{userIdFirst:myID,userIdSecond:dstID},{userIdFirst:dstID,userIdSecond:myID}]}

    const conversation = await Conversation.findOne(bothID)    

    if(myID === dstID)
        console.log('read conversation of my self')    

    return conversation
}

async function markRead(myID,dstID){
    const conversation = await getConversation(myID,dstID)

    if(myID === conversation.userIdFirst.toString()){
        conversation.ReadMessagesCountFirst = conversation.length
    }else if(myID === conversation.userIdSecond.toString()){
        conversation.ReadMessagesCountSecond = conversation.length
    }else{
        console.error('not the first not the second')  
    }

    conversation.lastUpdateDate =new Date()

    conversation.save()

    pushNotifiedUsers([myID,dstID])

    return "marked"
}

module.exports = {addMessageConversations,getConversation,markRead}