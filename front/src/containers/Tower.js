import React from 'react';
import { connect } from 'react-redux';
import Tower from '../components/Tower';
import { setTowerX, setTowerY, toggleTowerControl } from '../actions';

const mapStateToProps = (state) => ({
  towerX: state.towerX,
  towerY: state.towerY,
  towerEnabled: state.towerEnabled
});

const mapDispatchToProps = (dispatch) => ({
  setTowerX: (degree) => dispatch(setTowerX(degree)),
  setTowerY: (degree) => dispatch(setTowerY(degree)),
  toggleTowerControl: (enabled) => dispatch(toggleTowerControl(enabled))
});

const TowerContainer = ({towerX, towerY, towerEnabled, setTowerX, setTowerY, toggleTowerControl})=> {
  return (
    <Tower
      towerEnabled={towerEnabled}
      towerX={towerX}
      towerY={towerY}
      setTowerX={setTowerX}
      setTowerY={setTowerY}
      toggleTowerControl={toggleTowerControl}
    />
  )
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TowerContainer);