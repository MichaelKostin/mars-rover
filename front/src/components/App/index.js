import React, { Component } from 'react';
import Temp from '../../containers/Temp';
import Tower from '../../containers/Tower';
import Header from '../../containers/Header';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.hideImage = this.hideImage.bind(this);

    this.state = {
      showImage: true
    }
  }

  hideImage() {
    this.setState({ showImage: false });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="main-screen">
          <div className="left-box">
          </div>
          <div className={"video-box" + (this.state.showImage ? "" : " no-signal")}>
            {
              this.state.showImage ? (<img
                id="mjpeg_dest"
                alt="main cam"
                src="http://192.168.1.6/html/cam_pic_new.php?time=1507405579786&amp;pDelay=40000"
                onError={this.hideImage}
              />) : (<p><span>No signal</span></p>)
            }
          </div>
          <div className="right-box">
          </div>
        </div>
        <Temp/>
        <Tower/>
      </div>
    );
  }
}

export default App;