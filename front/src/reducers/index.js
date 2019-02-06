import {
  S_TOWER_CTR,
  S_T_XY,
  S_CHANGE_DIR,
  S_CHANGE_MOTORS,
  SOCKET_RECONNECT,
  SOCKET_DISCONNECT,
  SOCKET_CONNECT,
  DATA_FROM_ROVER
} from '../actions';

const initialState = {
  websocketConnected: false,
  accelerometer: {
    x: 0,
    y: 0,
    z: 0
  },
  fromRover: {
    CPTemp: 16,
    distance: 0,
    wifiQuality: 100,
    //MPU6050
    accelerometerX: 0,
    accelerometerY: 0,
    accelerometerZ: 0,
    gyroPitch: 0,
    gyroRoll: 0,
    gyroYaw: 0,

    // BMP180
    barometerPressure: 0,
    altimeterMeters: 0,
    thermometer: 0,
    //HMC5883L
    compass: 0
  },
  toRover: {
    towerEnabled: 0,
    towerX: 90,
    towerY: 90,
    leftMotors: 0,
    rightMotors: 0,
    direction: 0
  }
};

function roverApp(state = initialState, action) {
  switch (action.type) {
    case S_TOWER_CTR:
      return Object.assign({}, state, {
        toRover: { ...state.toRover, towerEnabled: action.enabled }
      });
    case S_T_XY:
      return Object.assign({}, state, {
        toRover: {...state.toRover, towerX: action.x, towerY: action.y }
      });
    case S_CHANGE_MOTORS:
      return Object.assign({}, state, {
        toRover: {...state.toRover, leftMotors: action.left, rightMotors: action.right }
      });
    case SOCKET_RECONNECT:
    case SOCKET_CONNECT:
      return Object.assign({}, state, { websocketConnected: true });
    case SOCKET_DISCONNECT:
      return Object.assign({}, state, { websocketConnected: false });
    case DATA_FROM_ROVER:
      return Object.assign({}, state, { fromRover: action.data });
    case S_CHANGE_DIR:
      return Object.assign({}, state, {
        toRover: {...state.toRover, direction: action.direction }
      });
    default:
      return state;
  }
}

export default roverApp;
