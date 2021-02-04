import { Component } from 'react';
import Message from './Message.jsx';
import api from './ClientApi';
import ClientApi from './ClientApi';

import SocketContext from './SocketContext.jsx'




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
                <div className="ConnectionStatus">Nevermind me</div>
                <h1> hello there fellers </h1>
            
                <ul> {
                    this.context.messages.map(msg => {
                        return <li key={msg.id+msg.time}>
                            <Message text={msg.text}></Message>
                        </li>
                    })
                }
                </ul>

                <button className="PingButton" onClick={this.context.sendPing}>
                    Send ping!
                </button>
            </div>
        )
    }
}


export default MessageDisplay
