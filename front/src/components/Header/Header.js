import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WifiIcon from '../icons/WifiIcon';

import './header.css'

const Header = ({connected, towerEnabled, accelerometerX, accelerometerY, accelerometerZ, wifiQuality, compass, towerX, towerY }) => {
  const accelerometerStyles = {
    transform: `rotateX(${Math.floor(accelerometerX * 90 -15)}deg) rotateY(${Math.floor(accelerometerY * 90 + 10)}deg) rotateZ(${Math.floor(accelerometerZ * 90)}deg)`
  };

  const towerStyles = {
    transform: `rotateX(${towerY - 90 - 15}deg) rotateY(${90 - towerX}deg)`
  };
  return (
    <header>
      <div className={"connection-status " + (connected ? "connected" : "")}>
        <div className="switcher"></div>
        <div className="switcher"></div>
      </div>
      <div className={"tower " + (towerEnabled ? "enabled" : "")}>
        <div className="tower-icon"></div>
      </div>
      <div className="wifi">
        <WifiIcon quality={wifiQuality} />
      </div>

      <div className="imu">
        <div className="imuContainer">
          <div className="imuCube" style={accelerometerStyles}>
            <div className="side front"></div>
            <div className="side back"></div>
            <div className="side top "></div>
            <div className="side right"></div>
            <div className="side bottom"></div>
            <div className="side left"></div>
            <div className="line"></div>
            <div className="headContainer">
              <div className="head" style={towerStyles}>
                <div className="tower front"></div>
                <div className="tower back"></div>
                <div className="tower top"></div>
                <div className="tower right"></div>
                <div className="tower bottom"></div>
                <div className="tower left"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
const mapStateToProps = (state) => ({
  connected: state.websocketConnected,
  towerEnabled: state.toRover.towerEnabled,
  towerX: state.toRover.towerX,
  towerY: state.toRover.towerY,
  accelerometerX: state.fromRover.accelerometerX,
  accelerometerY: state.fromRover.accelerometerY,
  accelerometerZ: state.fromRover.accelerometerZ,
  wifiQuality: state.fromRover.wifiQuality,
  compass: state.fromRover.compass
});


Header.propTypes = {
  connected: PropTypes.bool.isRequired,
  towerEnabled: PropTypes.number.isRequired,
  wifiQuality: PropTypes.number.isRequired,
  accelerometerX: PropTypes.number.isRequired,
  accelerometerY: PropTypes.number.isRequired,
  accelerometerZ: PropTypes.number.isRequired,
  compass: PropTypes.number.isRequired,
  towerX: PropTypes.number.isRequired,
  towerY: PropTypes.number.isRequired,
};

export default connect(
  mapStateToProps
)(Header);

