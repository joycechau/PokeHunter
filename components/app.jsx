import React from 'react';
import {hashHistory} from 'react-router';
import Header from './header/header.jsx';
import Pokedex from './pokedex/pokedex.jsx';
import Map from './map/map.jsx';

export default class App extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div className="app">
        <div className="header">
          <Header />
        </div>
        <div className="pokedex-and-map">
          <div className="pokedex">
            <Pokedex />
          </div>
          <div className="map">
            <Map />
          </div>
        </div>
      </div>
    );
  }
}
