import { io } from 'socket.io-client'

class ClientApi
{
    constructor({hostUrl})
    {
        this.hostUrl = hostUrl 
        console.log(`Connecting client API at ${this.hostUrl}...`)
        this.socket = io(`${this.hostUrl}`)
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


const API = new ClientApi({ 
    hostUrl: process.env.REACT_APP_SOCKET_URL
})

export default API

//export default ClientApi
