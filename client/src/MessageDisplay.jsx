import { Component } from 'react';
import Message from './Message.jsx';
import SocketContext from './SocketContext.jsx'

import MessageForm from './MessageForm.jsx'




class MessageDisplay extends Component
{
    static contextType = SocketContext

    constructor(props)
    {
        super(props)
        //this.state.connected = this.context.api.socket.connected

    }

    componentDidMount()
    {
        this.setState({
            connected: this.context.api.socket.connected
        })

        this.context.registerApiCallback('connect', () => {
            console.log(`Connect callback`)
            this.setState({ connnected: true })
        })

        this.context.registerApiCallback('disconnect', () => {
            console.log(`Disconnect callback`)
            this.setState({ connected: false })
        })


    }

    


    render() 
    {
        if(this.context.api.socket.connected === false) {
            console.log(`We aren't connected, not rendering message display`)
            return (
                <div className="MessageDisplay">
                    Not connected to the chat server
                </div>
            )
        }
        else {
            console.log(`Rendering message display`)
            return (
                <div className="MessageDisplay">
                    <h1> hello there fellers </h1>

                    <div className="ConnectionStatus">
                        We are connected to the chat server!
                    </div>
                
                    <ul> {
                        this.context.messages.map(msg => {
                            return <li key={msg.id+msg.time}>
                                <Message text={msg.text}></Message>
                            </li>
                        })
                    }
                    </ul>

                    <MessageForm></MessageForm>


                    

                    <button className="PingButton" onClick={this.context.sendPing}>
                        Send ping!
                    </button>
                </div>
            )
        }
    }
}


export default MessageDisplay
