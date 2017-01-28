import App from './App';
import React from 'react';
import { BrowserRouter } from 'react-router';
import { Provider as Redux } from 'react-redux';

const Root = ({store}) =>
  <Redux store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Redux>;

export default Root;
