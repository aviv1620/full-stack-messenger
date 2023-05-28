const express = require('express');
const {createGroup,getGroup,addMessageGroup,addFriendsGroup,removeFriendsGroup, markRead, leaveGroup} = require('../BLL/groupBLL')
const { respondedToBusinessLogicFunction } = require("./utilsRouter");

const router = express.Router();

// Entry Point: 'http://url/groups'

router.route('').post(async (req, res, next) => {    
    const { name } = req.body 
    func = createGroup
    param = [name]
    await respondedToBusinessLogicFunction(req, res,func,param)
    next()
})

router.route('/:groupID').get(async (req, res, next) => {
    const {groupID} = req.params
    func = getGroup
    param = [groupID]
    await respondedToBusinessLogicFunction(req, res,func,param)
    next()
})

router.route('/message').post(async (req, res, next) => {
    const {groupID,content} = req.body
    func = addMessageGroup
    param = [groupID,content]
    await respondedToBusinessLogicFunction(req, res,func,param)
    next()
})

router.route('/addFriends').post(async (req, res, next) => {   
    const {groupID,usersIds} = req.body
    func = addFriendsGroup
    param = [groupID,usersIds]
    await respondedToBusinessLogicFunction(req, res,func,param)
    next()
})

router.route('/removeFriends').post(async (req, res, next) => {
    const {groupID,usersIds} = req.body
    func = removeFriendsGroup
    param = [groupID,usersIds]
    await respondedToBusinessLogicFunction(req, res,func,param)
    next()
})

router.route('/leave').post(async (req, res, next) => {    
    const {groupID} = req.body
    func = leaveGroup
    param = [groupID]
    await respondedToBusinessLogicFunction(req, res,func,param)
    next()
})

router.route('/markread').post(async (req, res, next) => {
    const { groupID} = req.body 
    func = markRead
    param = [groupID]
    await respondedToBusinessLogicFunction(req, res,func,param) 
    next()     
})

module.exports = router;

