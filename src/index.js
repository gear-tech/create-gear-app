import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import initApi from './api/api';

initApi()
  .then((api) => {
    ReactDOM.render(<App api={api} />, document.getElementById('root'));
  })
  .catch(console.error);
