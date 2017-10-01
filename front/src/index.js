import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/index';
import { Provider } from 'react-redux';
import configureStore from './store';

let store = configureStore({
  towerEnabled: false,
  CPTemp: 16,
  towerX: 90,
  towerY: 90
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

