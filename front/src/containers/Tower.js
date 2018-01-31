import React from 'react';
import { connect } from 'react-redux';
import Tower from '../components/Tower';
import { toggleTowerControl, setTowerPosition, changeMotors } from '../actions';

const mapStateToProps = (state) => ({
  towerX: state.towerX,
  towerY: state.towerY,
  towerEnabled: state.towerEnabled
});

const mapDispatchToProps = (dispatch) => ({
  toggleTowerControl: (enabled) => dispatch(toggleTowerControl(enabled)),
  setTowerPosition: (x, y) => dispatch(setTowerPosition(x, y)),
  changeMotors: (left, right) => dispatch(changeMotors(left, right))
});

const TowerContainer = ({ towerX,  towerY, towerEnabled, toggleTowerControl, setTowerPosition, changeMotors })=> {
  return (
    <Tower
      towerEnabled={towerEnabled}
      towerX={towerX}
      towerY={towerY}
      toggleTowerControl={toggleTowerControl}
      setTowerPosition={setTowerPosition}
      changeMotors={changeMotors}
    />
  )
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TowerContainer);