import React, { Component } from 'react';
import ClientApi from './ClientApi.js';
import SocketContext from './SocketContext.jsx'

const { Provider } = SocketContext


class SocketProvider extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            messages: [
            ]
        }
    }


    componentDidMount()
    {
        this.api = new ClientApi( { hostUrl: process.env.REACT_APP_SOCKET_URL } )
        this.api.socket.on('message', (incomingMessage) => {
            const date = new Date()
            console.log(`[${date.toLocaleString()} (${date.getMilliseconds()}) ms] Got message: ${incomingMessage}`)


            this.setState((state, props) => ({
                messages: [...state.messages, incomingMessage]
            }))
        })
    }

    componentWillUnmount() {
        this.api.socket.disconnect()
    }

    sendPing = () => 
    {
        console.log(`Sending ping over!`)
        const date = new Date()
        const outgoingMessageText = `Hi! This is a ping from ${this.api.socket.id} made at ${date.toLocaleString()} (${date.getMilliseconds()} ms)`
        const outgoingMessage = {
            id: this.api.socket.id,
            time: Date.now(),
            text: outgoingMessageText
        }

        this.api.sendMessage(outgoingMessageText)

        this.setState( (state, props) => ({
            messages: [...state.messages, outgoingMessage]
        }))
    }

    sendMessage = (messageText) => 
    {
        console.log(`Sending message over!`)
        const date = new Date()
        const outgoingMessageText = messageText
        const outgoingMessage = {
            id: this.api.socket.id,
            time: Date.now(),
            text: outgoingMessageText
        }

        this.api.sendMessage(outgoingMessageText)

        this.setState( (state, props) => ({
            messages: [...state.messages, outgoingMessage]
        }))

    }


    render()
    {
        return (
            <Provider value={{
                api: this.api, 
                messages:this.state.messages, 
                sendPing:this.sendPing, 
                sendMessage:this.sendMessage
            }}>
            {this.props.children}
            </Provider>
        )
    }
}

export { SocketProvider }
