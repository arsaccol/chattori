import { io } from 'socket.io-client'

class ClientApi
{
    constructor({hostUrl, hostPort})
    {
        console.log(`Connecting client API to host ${hostUrl} at port ${hostPort}...`)
        this.hostUrl = hostUrl 
        this.hostPort = hostPort 
        this.socket = io('http://localhost:3000')
        this.socket.on('connect', this.onConnect)

        //this.socket = new io.Socket()
    }

    onConnect = (socket) => {
        console.log(`It would seem that we are connected! Connection state is ${this.socket.connected}`)

        this.socket.on('disconnect', () => {
            console.log(`Disconnected from server socket... Connection state is ${this.socket.connected}`)
        })

        this.sendMessage(`Hello there! My id is ${this.socket.id} and I am connected!`)
    }

    sendMessage(message) 
    {
        this.socket.emit('message', message)
    }


}



export default ClientApi
