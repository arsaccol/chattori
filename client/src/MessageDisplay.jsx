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

    }


    render() 
    {
        return (
            <div className="MessageDisplay">
                <h1> hello there fellers </h1>

                <div className="ConnectionStatus">
                    Nevermind me, I should be telling you whether there's a connection but I'm not
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


export default MessageDisplay
