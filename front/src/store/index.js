import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import roverApp from '../reducers';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import { SOCKET_DISCONNECT, SOCKET_RECONNECT, SOCKET_CONNECT } from '../actions';
let socket = io(`http://${process.env.REACT_APP_API_HOST}:8080`);
let socketIoMiddleware = createSocketIoMiddleware(socket, 'S_');

socket.on('connect_timeout', () => store.dispatch({ type: SOCKET_DISCONNECT }));
socket.on('connect_error', () => store.dispatch({ type: SOCKET_DISCONNECT }));
socket.on('reconnect_error', () => store.dispatch({ type: SOCKET_DISCONNECT }));
socket.on('reconnect', () => store.dispatch({ type: SOCKET_RECONNECT }));
socket.on('connect', () => store.dispatch({ type: SOCKET_CONNECT }));

function configureStore(preloadedState) {
  return createStore(
    roverApp,
    preloadedState,
    compose(
      applyMiddleware(
        thunk,
        socketIoMiddleware
       // logger
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}

const store = configureStore({
  websocketConnected: false,
  towerEnabled: false,
  CPTemp: 16,
  towerX: 90,
  towerY: 90,
  leftMotors: 0,
  rightMotors: 0,
  distance:0,
  accelerometer: {
    x: 0,
    y: 0,
    z: 0
  }
});

export default store;
