import { Component } from 'react'
import SocketContext from './SocketContext.jsx'

class MessageForm extends Component
{
    static contextType = SocketContext

    constructor(props)
    {
        super(props)
        this.state = {
            currentMessage: ''
        }
    }

    handleChange = (e) => {
        this.setState({ currentMessage: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.context.sendMessage(this.state.currentMessage)
        this.setState({
            currentMessage: ''
        })
    }


    render()
    {
        return (
            <div className={`MessageForm`}>
            <label>
            Message:
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.currentMessage} onSubmit={this.handleSubmit} onChange={this.handleChange}/>
                    <input type="submit" />
                </form>

            </label>
            </div>
        )

    }

}

export default MessageForm
