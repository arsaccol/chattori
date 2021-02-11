import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { SocketProvider } from './SocketProvider.jsx'
import MessageDisplay from './MessageDisplay.jsx';
import ClientApi from './ClientApi'


class App extends Component {
    constructor(props)
    {
        super(props)
    }


    render()
    {
        return (
            <SocketProvider>
                <div className="App">
                    <h3>NODE_ENV is ${process.env.NODE_ENV} <br/>
                    Socket URL: {process.env.REACT_APP_SOCKET_URL}</h3>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <MessageDisplay></MessageDisplay>
                    </header>
                </div>
            </SocketProvider>
      )
    }
}

export default App;
