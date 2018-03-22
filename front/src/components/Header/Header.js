import React from 'react';
import { bool } from 'prop-types';

import './header.css'

const Header = ({connected, towerEnabled }) => (
  <header>
    <div className={"connection-status " + (connected ? "connected" : "")}>
      <div className="switcher"></div>
      <div className="switcher"></div>
    </div>
    <div className={"tower " + (towerEnabled ? "enabled" : "")}>
      <div className="tower-icon"></div>
    </div>
  </header>
);

Header.propTypes = {
  connected: bool,
  towerEnabled: bool
};

export default Header;
