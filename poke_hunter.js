import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  ReactDOM.render(<App />, app);
});
