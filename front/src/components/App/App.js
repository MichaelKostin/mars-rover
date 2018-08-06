import React, { Component } from 'react';
import { bool, number } from 'prop-types';
import { connect } from 'react-redux';

import TempContainer from '../Temp/TempContainer';
import Tower from '../Tower/Tower';
import HeaderContainer from '../Header/HeaderContainer';
import './App.css';

class App extends Component {
  static propTypes = {
    towerX: number,
    towerY: number,
    towerEnabled: bool,
    distance: number
  };

  state = { showImage: true };
  hideImage = () => this.setState({ showImage: false });
  render() {
    const xStyles = {
      marginLeft: `${this.props.towerX *.55/3}%`
    };

    const yStyles = {
      marginTop: `-${this.props.towerY *.55*2}%`
    };

    return (
      <div className={"app " + (this.props.towerEnabled ? "tower-enabled" : "")}>
        <HeaderContainer />
        <div className="top-buttons">
          <i className="fas fa-camera-retro"></i>
          <i className="fas fa-moon"></i>
        </div>
        <div className="main-screen">
          <div className="left-box">
          </div>
          <div className={"video-box" + (this.state.showImage ? "" : " no-signal")}>
            <div className="distance-container">
              <span className="top"/>
              <span className="bottom"/>
              <span className="value">{this.props.distance} sm</span>
            </div>
            <div className="x-direction degree"><span>{this.props.towerX - 90}</span><div style={xStyles}></div></div>
            <div className="y-direction degree"><span>{this.props.towerY - 90}</span><div style={yStyles}></div></div>
            {
              this.state.showImage ? (<img
                id="mjpeg_dest"
                alt="main cam"
                src={`http://${process.env.REACT_APP_API_HOST}/html/cam_pic_new.php?time=1507405579786&amp;pDelay=40000`}
                onError={this.hideImage}
              />) : (<p><span>No signal</span></p>)
            }
          </div>
          <div className="right-box">
          </div>
        </div>
        <TempContainer/>
        <Tower/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  towerX: state.towerX,
  towerY: state.towerY,
  towerEnabled: state.towerEnabled,
  distance: state.distance
});

export default connect(mapStateToProps)(App);
