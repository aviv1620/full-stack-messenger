const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {getUser} = require('./usersBLL');

const User = require('../models/usersModel');

async function login(username, password) {

    const user = await User.findOne({ username: username })

    if(!user)
        return null 

    const passwordValid = await bcrypt.compare(password, user.password)

    if (passwordValid) {        

        const accessToken = jwt.sign(
            { id: user.id },
            process.env.ACCESS_SECRET_TOKEN,
            { expiresIn: '1 days' }
        )

        const userDetail = await getUser(user.id)

        return {user:userDetail,accessToken:accessToken}
    }

    return null
}

module.exports = {login};
