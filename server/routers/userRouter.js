const express = require('express');
const {getUser,blockUser,unblockUser, markAllTriggersDone} = require('../BLL/usersBLL');
const { respondedToBusinessLogicFunction } = require("./utilsRouter");

const router = express.Router();

// Entry Point: 'http://url/users'

router.route('').get(async (req, res, next) => {
    func = getUser
    param = []
    await respondedToBusinessLogicFunction(req, res,func,param)
    next()
})

router.route('/block').post(async (req, res, next) => {    
    const { uid } = req.body 
    func = blockUser
    param = [uid]
    await respondedToBusinessLogicFunction(req, res,func,param)        
    next()  
})

router.route('/unblock').post(async (req, res, next) => {   
    const { uid } = req.body 
    func = unblockUser
    param = [uid]
    await respondedToBusinessLogicFunction(req, res,func,param)
    next()
})

router.route('/trigger/done').post(async (req, res, next) => {   
    func = markAllTriggersDone
    param = []
    await respondedToBusinessLogicFunction(req, res,func,param)
    next()
})

module.exports = router;