const WebSocket = require('ws');
var url = require('url');
const { verify } = require('./BLL/verifyBLL');
const { getLastUpdate } = require('./BLL/lastUpdateBLL');
const unixEpoch = new Date(0)
const clients = new Map();
const notifiedUsers = new Set();

function runWebSocket(){
    const port = process.env.PORT_WEBSOCKET
    const webSocketServer = new WebSocket.Server({ port: port });
        
    webSocketServer.on('connection', (ws,req) => {      
        const queryData = url.parse(req.url, true).query;
        const token = queryData.token    
    
        if(!token)
            ws.close(401,'No Token Provided')  
    
        const id = verify(token)
        const lastUpdate = unixEpoch

        clients.set(id,{ws,lastUpdate});

        notify(ws,id,lastUpdate)
    
        ws.on("close", () => {
            clients.delete(id);
        });
    })
    
    console.log(`Web Socket server up and run on port ${port}`);
}

async function notify(ws,uid,lastUpdate){    
    const contacts = await getLastUpdate(uid,lastUpdate)
    ws.send(JSON.stringify(contacts))

    clients.set(uid,{ws,lastUpdate:new Date()});
}


function pushNotifiedUsers(usersIDs){        
    usersIDs.forEach(uid => {
        notifiedUsers.add(uid.toString())
    })           
}

function notifyAll(){       
    notifiedUsers.forEach(uid=>{
        const client = clients.get(uid) 
        
        if(client){  
            const {ws,lastUpdate} = client
            notify(ws,uid,lastUpdate)
        }
    })

    notifiedUsers.clear()   
}


module.exports = {runWebSocket,pushNotifiedUsers,notifyAll}


