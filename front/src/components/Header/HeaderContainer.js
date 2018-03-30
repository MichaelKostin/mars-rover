import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';

const mapStateToProps = (state) => ({
  connected: state.websocketConnected,
  towerEnabled: state.towerEnabled,
  accelerometer: state.accelerometer
});


const HeaderContainer = ({ connected, towerEnabled, accelerometer })=> (
  <Header
    connected={connected}
    towerEnabled={towerEnabled}
    accelerometer={accelerometer}
  />
);

export default connect(
  mapStateToProps
)(HeaderContainer);