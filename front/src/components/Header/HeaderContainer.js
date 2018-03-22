import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';

const mapStateToProps = (state) => ({
  connected: state.websocketConnected,
  towerEnabled: state.towerEnabled
});


const HeaderContainer = ({ connected, towerEnabled })=> (
  <Header
    connected={connected}
    towerEnabled={towerEnabled}
  />
);

export default connect(
  mapStateToProps
)(HeaderContainer);