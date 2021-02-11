import * as io from 'socket.io'
import express from 'express'
import { createServer } from 'http'



class ChatServer
{
    constructor({port}) 
    {
        this.sockets = null
        this.state = {
            messages: []
        }

        this.initServer({port: port})
    }

    initServer({port}) 
    {
        console.log(`Initializing server on port ${port}`)
        this.app = express()
        this.setupExpressRoutes(this.app)

        this.httpServer = createServer(this.app)

        this.socketsSetup()
        //this.registerCallbacks()

        this.httpServer.listen(port, '0.0.0.0')
    }

    // pass in express app after it's been initialized
    setupExpressRoutes(app)
    {
        app.get(`/msg`, (req, res) => {
            res.json(this.state.messages)
        })


        app.get(`/clear`, (req, res) => {
            this.state.messages = []
            res.json({done: true})
        })
    }


    onConnection = (socket) =>
    {
        console.log(`[${new Date().toLocaleString()}] A user connected with id "${socket.id}"`)

        this.registerCallbacks(socket)
    }
    

    socketsSetup() 
    {
        this.sockets = new io.Server(this.httpServer, { cors: { origin: '*' } })
        this.sockets.on('connection', this.onConnection)
    }


    getEventListeners(socket) 
    {
        return {
            'message': (messageText) => {
                console.log(`[${new Date().toLocaleString()}] New message: "${messageText}"`)

                const message = {
                    time: Date.now(),
                    id: socket.id,
                    text: messageText
                }

                this.state.messages.push(message)

                //socket.broadcast(
                socket.broadcast.emit('message', message)
            },
        }
    }


    registerCallbacks(connectedSocket) 
    {
        Object.entries(this.getEventListeners(connectedSocket)).map(([eventName, eventListener]) => {
            connectedSocket.on(eventName, eventListener)
        })
    }

} 

export default ChatServer
