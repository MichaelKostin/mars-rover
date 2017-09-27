import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from '../middlewares/logger';
import roverApp from '../reducers';

export default function configureStore(preloadedState) {
  return createStore(
    roverApp,
    preloadedState,
    compose(
      applyMiddleware(
        thunk,
        logger
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
};