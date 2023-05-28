const { pushNotifiedUsers } = require('../websocket');
const User = require('../models/usersModel');

function cleanPassword(user){
    user.set({password:undefined}) 
}

async function getUser(myID){
    const user = await User.findById(myID)    

    cleanPassword(user)

    return user
}

async function blockUser(myID,userId){
    const user = await User.findById(myID)

    // push user to block list
    const result = await user.updateOne({$push:{blokesList:userId},lastUpdateDate:new Date()})

    if(result.acknowledged){
        pushNotifiedUsers([myID,userId])
        return "blocked"
    }
           
    return null    
}

async function unblockUser(myID,userId){
    const user = await User.findById(myID)   

    //pull user from block list
    const result = await user.updateOne({$pull:{blokesList:userId},lastUpdateDate:new Date()})

    if(result.modifiedCount > 0)   {
        pushNotifiedUsers([myID,userId])
        return "unblocked" 
    }
                  
    return null
}

async function triggerDeleteGroup(usersIds,gid){    
    const withId = {_id:{$in:usersIds}}
    const trigger = {action:"DELETE_GROUP",parameter:gid}
    const pushTrigger = {$push:{triggers:trigger},lastUpdateDate:new Date()}
    
    const result = await User.updateMany(withId,pushTrigger)  

    if(result.acknowledged){
        pushNotifiedUsers(usersIds)
        return "triggered"
    }

    return null    
}

async function markAllTriggersDone(myID){
    const user = await User.findById(myID)  

    user.triggers = []
    user.lastUpdateDate =new Date()

    await user.save()

    pushNotifiedUsers([myID])

    return "marked"
    
}


module.exports = {getUser,blockUser,unblockUser,unblockUser,triggerDeleteGroup,markAllTriggersDone}