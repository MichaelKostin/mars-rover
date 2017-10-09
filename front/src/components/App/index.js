import React, { Component } from 'react';
import Temp from '../../containers/Temp';
import Tower from '../../containers/Tower';
import logo from './logo.svg';
import './App.css';

const env = process.env.NODE_ENV;

class App extends Component {
  static render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to rover UI</h2>
          <p>NODE_ENV: {env}</p>
        </div>
        <img id="mjpeg_dest" alt="main cam" src="http://192.168.1.4/html/cam_pic_new.php?time=1507405579786&amp;pDelay=40000"/>
        <Temp/>
        <Tower/>
      </div>
    );
  }
}

export default App;