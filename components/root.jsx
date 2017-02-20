import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import App from './app';

const Root =() => {
 return(
   <Router history={hashHistory}>
     <Route path="/" component={App} />
   </Router>
 );
};

export default Root;
