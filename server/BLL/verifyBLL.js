const jwt = require('jsonwebtoken');

function verify(token) {
    try {

        const data = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);

        return data.id;

    } catch (error) {

        console.log(error.message);

        return null;
    }



}

module.exports = { verify };