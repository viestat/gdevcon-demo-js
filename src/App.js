import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Github from '@material-ui/docs/svgIcons/GitHub';
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
            Check out the source code
            <span>
              <IconButton aria-label="GitHub">
                <a
                  href={'https://github.com/viestat/gdevcon-demo-js'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github />
                </a>
              </IconButton>
            </span>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
