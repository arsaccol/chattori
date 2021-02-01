import logo from './logo.svg';
import './App.css';
import Message from './Message.js';
import MessageDisplay from './MessageDisplay.jsx';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <MessageDisplay></MessageDisplay>

      </header>


    </div>
  )
}

export default App;
