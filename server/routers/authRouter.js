const express = require('express');
const { login } = require('../BLL/authenticationBLL');


const router = express.Router();

// Entry Point: 'http://url/auth'

router.route('/login').post(async (req, res) => {
    const { username, password } = req.body

    const token = await login(username, password)

    if (token) {
        res.json(token);

    }else {
        res.status(401).json("Wrong username or password.")     
    }
});

module.exports = router;
