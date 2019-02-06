import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import roverApp from '../reducers';
import io from 'socket.io-client';
import { SOCKET_DISCONNECT, SOCKET_RECONNECT, SOCKET_CONNECT, DATA_FROM_ROVER } from '../actions';
let socket = io(`http://${process.env.REACT_APP_API_HOST}:8080`);

socket.on('connect_timeout', () => store.dispatch({ type: SOCKET_DISCONNECT }));
socket.on('connect_error', () => store.dispatch({ type: SOCKET_DISCONNECT }));
socket.on('reconnect_error', () => store.dispatch({ type: SOCKET_DISCONNECT }));
socket.on('reconnect', () => store.dispatch({ type: SOCKET_RECONNECT }));
socket.on('connect', () => store.dispatch({ type: SOCKET_CONNECT }));

function createSocketMiddleware(socket, prefix) {

  return (store) => {
    socket.on('a', (data) => {
      const [
        CPTemp,
        distance,
        wifiQuality,
        accelerometerX,
        accelerometerY,
        accelerometerZ,
        gyroPitch,
        gyroRoll,
        gyroYaw,
        barometerPressure,
        altimeterMeters,
        thermometer,
        compass
      ] = data;
      store.dispatch({ type: DATA_FROM_ROVER, data: {
          CPTemp,
          distance,
          wifiQuality,
          accelerometerX,
          accelerometerY,
          accelerometerZ,
          gyroPitch,
          gyroRoll,
          gyroYaw,
          barometerPressure,
          altimeterMeters,
          thermometer,
          compass
        } });
    });
    return (next) => action => {
      const res = next(action);
      if (action.type.indexOf(prefix) === 0) {
        socket.emit('a', Object.values(store.getState().toRover))
      }
      return res;
    }
  }
}

const socketMiddleware = createSocketMiddleware(socket, 'S_');

function configureStore(preloadedState) {
  return createStore(
    roverApp,
    preloadedState,
    compose(
      applyMiddleware(
        thunk,
        socketMiddleware
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}

const store = configureStore();

export default store;
