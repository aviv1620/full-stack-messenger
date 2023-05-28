const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const {runWebSocket, notifyAll} = require('./websocket')

const authRouter = require('./routers/authRouter')
const groupRouter = require('./routers/groupRouter')
const conversationRouter = require('./routers/conversationRouter')
const userRouter = require('./routers/userRouter')

async function main(){
    dotenv.config()

    //mongodb
    await mongoose.connect(process.env.MONGODB_CONNECT_URL)
    console.log('mongoDB connected to messengerDB!')  
    
    //WebSocket
    runWebSocket()
    
    //express
    const app = express()
    const port = process.env.PORT_HTTP

    app.use(cors())
    app.use(express.json())
        
    app.use('/auth', authRouter)
    app.use('/user',userRouter)
    app.use('/group',groupRouter)
    app.use('/conversation',conversationRouter)
    app.use(notifyMiddleware)
    
    app.listen(port, () => {
        console.log(`app is listening at http://localhost:${port}`)
      });     
}

function notifyMiddleware(req, res){ 
  notifyAll()
}

main()