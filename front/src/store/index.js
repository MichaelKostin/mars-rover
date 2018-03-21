import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import roverApp from '../reducers';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import { SOCKET_DISCONNECT, SOCKET_RECONNECT } from '../actions';
let socket = io('http://192.168.1.6:8080');
let socketIoMiddleware = createSocketIoMiddleware(socket, 'S_');

socket.on('connect_timeout', () => store.dispatch({ type: SOCKET_DISCONNECT }));
socket.on('connect_error', () => store.dispatch({ type: SOCKET_DISCONNECT }));
socket.on('reconnect_error', () => store.dispatch({ type: SOCKET_DISCONNECT }));
socket.on('reconnect', () => store.dispatch({ type: SOCKET_RECONNECT }));

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
  websocketConnected: true,
  towerEnabled: false,
  CPTemp: 16,
  towerX: 90,
  towerY: 90,
  leftMotors: 0,
  rightMotors: 0
});

export default store;
