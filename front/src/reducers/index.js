import {
  CHANGE_TEMP_CP,
  S_SET_TOWER_X,
  S_SET_TOWER_Y,
  S_TOWER_CTR
} from '../actions';

function roverApp(state = {}, action) {
  switch (action.type) {
    case CHANGE_TEMP_CP:
      return Object.assign({}, state, {
        CPTemp: action.temp
      });
    case S_SET_TOWER_X:
      return Object.assign({}, state, {
        towerX: action.degree
      });
    case S_SET_TOWER_Y:
      return Object.assign({}, state, {
        towerY: action.degree
      });
    case S_TOWER_CTR:
      return Object.assign({}, state, {
        towerEnabled: action.enabled
      });
    default:
      return state;
  }
}

export default roverApp;
