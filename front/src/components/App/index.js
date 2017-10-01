import React, { Component } from 'react';
import Temp from '../../containers/Temp';
import Tower from '../../containers/Tower';
import logo from './logo.svg';
import './App.css';

const env = process.env.NODE_ENV;

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to rover UI</h2>
          <p>NODE_ENV: {env}</p>
        </div>
        <Temp/>
        <Tower/>
      </div>
    );
  }
}

export default App;