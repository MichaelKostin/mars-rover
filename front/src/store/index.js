import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import roverApp from '../reducers';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
let socket = io('http://192.168.1.2:8080');
let socketIoMiddleware = createSocketIoMiddleware(socket, 'S_');

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
  towerEnabled: false,
  CPTemp: 16,
  towerX: 90,
  towerY: 90
});

export default store;
