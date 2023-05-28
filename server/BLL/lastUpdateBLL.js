const Conversation = require("../models/conversationsModel")
const Group = require("../models/groupsModel")
const User = require("../models/usersModel")

async function getLastUpdate(myID,lastUpdateClient){
    const conversations = await getConversations(myID,lastUpdateClient)
    const users = await getUsers(myID,lastUpdateClient)
    const groups = await getGroups(myID,lastUpdateClient)

    return({conversations,users,groups})
}

async function getGroups(myID,lastUpdateClient){    
    const after = { "lastUpdateDate": { $gt: lastUpdateClient }}   
    const member = {usersMember:{$all:myID}}
    let groups = await Group.find({...member,...after})  

    groups.forEach((group)=>{       
        group.set({messages:undefined})        
    })

    return groups

}

async function getUsers(myID,lastUpdateClient){    
    const after = { "lastUpdateDate": { $gt: lastUpdateClient }}    
    const users = await User.find(after)    

    //clean password
    users.forEach((user)=>{
        user.set({password:undefined}) 
    })

    return users
}

async function getConversations(myID,lastUpdateClient){
   
    const after = { "lastUpdateDate": { $gt: lastUpdateClient }}
    const oneWithID = {'$or':[{userIdFirst:myID},{userIdSecond:myID}]}

    let conversations = await Conversation.find({...oneWithID,...after})      
    
    conversations.forEach((conversation)=>{       
        conversation.set({messages:undefined})        
    })    

    return conversations
}

module.exports = {getLastUpdate}