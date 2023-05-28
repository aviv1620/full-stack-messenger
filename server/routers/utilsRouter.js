const { verify } = require('../BLL/verifyBLL');


async function respondedToBusinessLogicFunction(req, res, func, param) {

    const token = req.headers['x-access-token'];

    if (!token){
        res.status(401).json('No Token Provided');
        return
    }        

    const myId = verify(token);

    if(!myId){       
        res.status(401).json('JWT is invalid or expired');    
        return
    }        

    const result = await func(myId, ...param);

    if (!result){
        res.status(400).json('Bad Request');  
        return
    }         

    res.json(result);
}
module.exports = { respondedToBusinessLogicFunction };
