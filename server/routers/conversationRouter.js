const express = require('express');
const {addMessageConversations,getConversation, markRead} = require('../BLL/ConversationsBLL')
const { respondedToBusinessLogicFunction } = require("./utilsRouter");

const router = express.Router();

// Entry Point: 'http://url/conversations'

router.route('/message').post(async (req, res, next) => {
    const { userDestinationID, content} = req.body 
    func = addMessageConversations
    param = [userDestinationID,content]
    await respondedToBusinessLogicFunction(req, res,func,param)   
    next()   
})

router.route('/:userDestinationID').get(async (req, res, next) => {    
    const {userDestinationID} = req.params
    func = getConversation
    param = [userDestinationID]
    await respondedToBusinessLogicFunction(req, res,func,param)    
    next() 
})

router.route('/markread').post(async (req, res, next) => {
    const { destinationID} = req.body 
    func = markRead
    param = [destinationID]
    await respondedToBusinessLogicFunction(req, res,func,param)   
    next()   
})



module.exports = router;