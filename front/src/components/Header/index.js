import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import './header.css'

class Header extends Component {
  render() {
    return (
      <header>
        <div className={"connection-status " + (this.props.connected ? "connected" : "")}>
          <div className="switcher"></div>
          <div className="switcher"></div>
        </div>
        <div className={"tower " + (this.props.towerEnabled ? "enabled" : "")}>
          <div className="tower-icon"></div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  connected: PropTypes.bool,
  towerEnabled: PropTypes.bool
};

export default Header;