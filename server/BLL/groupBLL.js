const Group = require('../models/groupsModel')
const { pushNotifiedUsers } = require('../websocket');
const { triggerDeleteGroup } = require('./usersBLL');

async function createGroup(myID,name){
    const group = new Group({
        name,
        usersMember:[myID],
        messages:[]
    })

    group.length = 0
    group.lastUpdateDate = new Date()
    const map = new Map()
    map.set(myID,0)
    group.readMessagesCounts = map  
    group.save()   
    
    pushNotifiedUsers(group.usersMember)
    
    return "created"
}



async function getGroup(myID,groupID){

    let group = await Group.findById(groupID)  

    return group

}

async function markRead(myID,groupID){    
    let group = await Group.findById(groupID)      

    group.readMessagesCounts.set(myID,group.length)

    group.lastUpdateDate =new Date()

    group.save()

    pushNotifiedUsers(group.usersMember)

    return "marked"
}

async function addMessageGroup(myID,groupID,content){

    let group = await Group.findById(groupID) 

    const sendTime = new Date

    const newMassage = {
        sender:myID,
        sendTime:sendTime,
        content: content
    }

    group.messages.push(newMassage)
    group.length = group.messages.length
    group.lastUpdateDate = sendTime
    group.lastMessageTime = sendTime

    group.save()

    pushNotifiedUsers(group.usersMember)

    return "added"
}

async function addFriendsGroup(myID,groupID,usersIds){    
    let group = await Group.findById(groupID) 

    group.usersMember.push(...usersIds)

    usersIds.forEach(userId=>{
        group.readMessagesCounts.set(userId,0)
    })    

    group.lastUpdateDate = new Date()

    group.save()

    pushNotifiedUsers(group.usersMember)

    return "added"
}

async function leaveGroup(myID,groupID){
    const status = await removeFriendsGroup(myID,groupID,[myID])
    if (status === "removed")
        return "left"
    else
        return status
}

async function removeFriendsGroup(myID,groupID,usersIds){
    let group = await Group.findById(groupID)     
    
    group.usersMember = group.usersMember.filter(uid => {
        return !usersIds.includes(uid.toString())        
    })

    usersIds.forEach(userId=>{
        group.readMessagesCounts.delete(userId)
    })    

    group.lastUpdateDate = new Date

    group.save()

    //say to clients delete the group data in their computer.
    await triggerDeleteGroup(usersIds,groupID)
    
    pushNotifiedUsers(group.usersMember)

    return "removed"
}

module.exports = {createGroup,getGroup,addMessageGroup,addFriendsGroup,removeFriendsGroup,markRead,leaveGroup}