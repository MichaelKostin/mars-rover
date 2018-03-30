import React from 'react';
import { bool } from 'prop-types';

import './header.css'

const Header = ({connected, towerEnabled, accelerometer }) => {
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

Header.propTypes = {
  connected: bool,
  towerEnabled: bool
};

export default Header;
