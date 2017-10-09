import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import roverApp from '../reducers';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
let socket = io('http://192.168.1.4:8080');
let socketIoMiddleware = createSocketIoMiddleware(socket, 'S_');

export default function(preloadedState) {
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
};