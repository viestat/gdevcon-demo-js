import React, { Component } from 'react';
import logo from './gdevcon.png';
import ImageStep from './ImageStep';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Face Detector</h1>
        </header>
        <main className="App-main">
          <ImageStep />
        </main>
        <footer>
          <p>
            Made with{' '}
            <span role="img" aria-label="heart">
              ❤️
            </span>{' '}
            by <a href="https://github.com/viestat">@viestat</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
