import { Component } from 'react';
import Message from './Message';
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
        this.api = new ClientApi({hostUrl: `ws:localhost`, hostPort: 3000})
        this.api.socket.on('message', (message) => {
            const date = new Date()
            console.log(`[${date.toLocaleString()} (${date.getMilliseconds()}) ms] Got message: ${message}`)


            this.setState((state, props) => ({
                //messages: state.messages.concat({
                //    text: message,
                //    id: Math.floor(Math.random())
                //})
                
                messages: [...state.messages, {
                    // TODO: fix this, should pass id from server
                    id: Math.ceil(Math.random()),
                    text: message
                }]
                
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
        this.api.sendMessage(`Hi! This is a ping from ${this.api.socket.id} made at ${date.toLocaleString()} (${date.getMilliseconds()} ms)`)
    }


    render() {
        return (
            <div className="MessageDisplay">
                <div className="ConnectionStatus">Nevermind me</div>
                <ul> {
                    this.state.messages.map(msg => {
                        //return 
                        return <li key={msg.id}>
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
