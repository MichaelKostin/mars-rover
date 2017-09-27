import {
  CHANGE_TEMP_CP,
  CHANGE_TEMP_GP,
  SET_TOWER_HORIZON,
  SET_TOWER_VERTICAL
} from '../actions';

function roverApp(state = {}, action) {
  switch (action.type) {
    case CHANGE_TEMP_CP:
      return Object.assign({}, state, {
        CPTemp: action.temp
      });
    case CHANGE_TEMP_GP:
      return Object.assign({}, state, {
        GPTemp: action.temp
      });
    case SET_TOWER_HORIZON:
      return Object.assign({}, state, {
        towerHorizon: action.degree
      });
    case SET_TOWER_VERTICAL:
      return Object.assign({}, state, {
        towerVertical: action.degree
      });
    default:
      return state;
  }
}

export default roverApp;
