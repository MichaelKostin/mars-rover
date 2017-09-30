import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/index';
import { Provider } from 'react-redux';
import configureStore from './store';

let store = configureStore({
  GPTemp: 60,
  CPTemp: 16,
  towerHorizon: 90,
  towerVertical: 90
});

setInterval(() => {
  store.dispatch({
    type: 'SOCKET:HELLO',
    data: 'hello from front'
  })
}, 3000);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

