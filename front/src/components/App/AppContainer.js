import React from 'react';
import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = (state) => ({
  towerX: state.towerX,
  towerY: state.towerY,
  towerEnabled: state.towerEnabled
});

const AppContainer = ({ towerX, towerY, towerEnabled })=> {
  return (
    <App
      towerEnabled={towerEnabled}
      towerX={towerX}
      towerY={towerY}
    />
  )
};

export default connect(mapStateToProps)(AppContainer);
