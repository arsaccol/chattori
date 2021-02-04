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
