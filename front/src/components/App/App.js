import React, { Component } from 'react';
import { bool, number } from 'prop-types';
import { connect } from 'react-redux';

import TempContainer from '../Temp/TempContainer';
import Tower from '../Tower/Tower';
import Header from '../Header/Header';
import './App.css';

class App extends Component {
  static propTypes = {
    towerX: number.isRequired,
    towerY: number.isRequired,
    towerEnabled: number.isRequired,
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
        <Header/>
        <div className="top-buttons">
          <i className="fas fa-camera-retro"/>
          <i className="fas fa-moon"/>
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
            <div className="x-direction degree">
              <span>{this.props.towerX - 90}</span><div style={xStyles}/>
            </div>
            <div className="y-direction degree">
              <span>{this.props.towerY - 90}</span><div style={yStyles}/>
            </div>
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
  towerX: state.toRover.towerX,
  towerY: state.toRover.towerY,
  towerEnabled: state.toRover.towerEnabled,
  distance: state.fromRover.distance
});

export default connect(mapStateToProps)(App);
