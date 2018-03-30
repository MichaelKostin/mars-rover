import React, { Component } from 'react';
import { bool, number } from 'prop-types';

import TempContainer from '../Temp/TempContainer';
import TowerContainer from '../Tower/TowerContainer';
import HeaderContainer from '../Header/HeaderContainer';
import './App.css';

class App extends Component {
  static propTypes = {
    towerX: number,
    towerY: number,
    towerEnabled: bool
  };

  state = { showImage: true };
  hideImage = () => this.setState({ showImage: false });
  render() {
    const xStyles = {
      left: (this.props.towerX *.55) + '%'
    };

    const yStyles = {
      top: (this.props.towerY *.55) + '%'
    };

    return (
      <div className={"app " + (this.props.towerEnabled ? "tower-enabled" : "")}>
        <HeaderContainer />
        <div className="main-screen">
          <div className="left-box">
          </div>
          <div className={"video-box" + (this.state.showImage ? "" : " no-signal")}>
            <div className="x-direction degree" style={xStyles}>{this.props.towerX}</div>
            <div className="y-direction degree" style={yStyles}>{this.props.towerY}</div>
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
        <TempContainer/>
        <TowerContainer/>
      </div>
    );
  }
}

export default App;