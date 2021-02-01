import { Component } from 'react';
import Message from './Message.jsx';
import api from './ClientApi';
import ClientApi from './ClientApi';

class MessageDisplay extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        // TODO: fix problem where the "I am connected!" message shows up sometimes and sometimes doesn't
        // this is likely due to asynchronicity of connection, which may or may not have properly taken place
        // before we first render... I think it's something related to that

        this.api = new ClientApi({hostUrl: `ws:localhost`, hostPort: 3000})
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


    render() {
        return (
            <div className="MessageDisplay">
                <div className="ConnectionStatus">Nevermind me</div>
                <ul> {
                    this.state.messages.map(msg => {
                        return <li key={msg.id+msg.time}>
                            <Message text={msg.text}></Message>
                        </li>
                    })
                }
                </ul>

                <button className="PingButton" onClick={this.sendPing}>
                    Send ping!
                </button>
            </div>
        )
    }

}

export default MessageDisplay
