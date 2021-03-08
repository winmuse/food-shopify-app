
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app1';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

window.React = React

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);