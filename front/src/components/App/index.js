import React, { Component } from 'react';
import Temp from '../../containers/Temp';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to rover UI</h2>
        </div>
        <Temp/>
      </div>
    );
  }
}

export default App;