import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Favicon from 'react-favicon';
import configureStore from './store/configureStore';
import AppRouter from './routers/AppRouter';
import 'normalize-css/normalize.css';
import 'typeface-roboto';
import './index.css';

const store = configureStore();

const jsx = (
  <div>
    <Favicon url="dist/favicon.ico" />
    <Provider store={store} >
      <AppRouter />
    </Provider>
  </div>
);

ReactDOM.render(jsx, document.getElementById('root'));
