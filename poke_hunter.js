import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import App from './components/app';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  Modal.setAppElement('body');
  ReactDOM.render(<App />, app);
});
