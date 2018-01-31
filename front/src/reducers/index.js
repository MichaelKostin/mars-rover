import {
  CHANGE_TEMP_CP,
  S_TOWER_CTR,
  S_T_XY,
  D_ANY,
  S_CHANGE_MOTORS
} from '../actions';

function roverApp(state = {}, action) {
  switch (action.type) {
    case CHANGE_TEMP_CP:
      return Object.assign({}, state, {
        CPTemp: action.temp
      });
    case S_TOWER_CTR:
      return Object.assign({}, state, {
        towerEnabled: action.enabled
      });
    case S_T_XY:
      return Object.assign({}, state, {
        towerX: action.x,
        towerY: action.y
      });
    case D_ANY:
      return Object.assign({}, state, { anyData: action.data });
    case S_CHANGE_MOTORS:
      return Object.assign({}, state, { leftMotors: action.left, rightMotors: action.right});
    default:
      return state;
  }
}

export default roverApp;
