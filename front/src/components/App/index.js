import React, { Component } from 'react';
import Temp from '../../containers/Temp';
import Tower from '../../containers/Tower';
import './App.css';
import store from '../../store';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="main-screen">
          <div className="left-box">
           [ {store.anyData}]
          </div>
          <div className="video-box">
            <img id="mjpeg_dest" alt="main cam" src="http://192.168.1.3/html/cam_pic_new.php?time=1507405579786&amp;pDelay=40000"/>
          </div>
          <div className="right-box"></div>
        </div>
        <Temp/>
        <Tower/>
      </div>
    );
  }
}

export default App;