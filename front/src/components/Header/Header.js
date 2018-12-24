import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WifiIcon from '../icons/WifiIcon';

import './header.css'

const Header = ({connected, towerEnabled, accelerometer, wifiQuality }) => {
  const accelerometerStyles = {
    transform: `rotateX(${accelerometer.x * 90}deg) rotateY(${accelerometer.y * 90}deg) rotateZ(${accelerometer.z * 90}deg)`
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
        <div id="imuContainer">
          <div id="imuCube" style={accelerometerStyles}>
            <div className="side front"></div>
            <div className="side back"></div>
            <div className="side top"></div>
            <div className="side right"></div>
            <div className="side bottom"></div>
            <div className="side left"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
const mapStateToProps = (state) => ({
  connected: state.websocketConnected,
  towerEnabled: state.toRover.towerEnabled,
  accelerometer: state.accelerometer,
  wifiQuality: state.fromRover.wifiQuality
});


Header.propTypes = {
  connected: PropTypes.bool.isRequired,
  towerEnabled: PropTypes.number.isRequired,
  wifiQuality: PropTypes.number.isRequired
};

export default connect(
  mapStateToProps
)(Header);

