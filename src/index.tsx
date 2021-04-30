import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

//import 'bootstrap/dist/css/bootstrap.min.css';
//import "../node_modules/bootstrap/scss/bootstrap";
//import '../node_modules/bootstrap/scss/';
//import "../node_modules/bootstrap/scss/functions";
//import "../node_modules/bootstrap/scss/variables";
//import "../node_modules/bootstrap/scss/mixins";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
