import React from 'react';
import {hashHistory} from 'react-router';
import Header from './header/header.jsx';
import Pokedex from './pokedex/pokedex.jsx';
import Map from './map/map.jsx';
import styles from './app.css';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.onPokeballClick = this.onPokeballClick.bind(this);
  }

  onPokeballClick() {
    this.refs.pokedex.onPokeballClicked();
  }

  render() {
    return(
      <div className={styles.app}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.content}>
          <div className={styles.pokedex}>
            <Pokedex ref="pokedex" />
          </div>
          <div className={styles.map}>
            <Map onPokeballClick={this.onPokeballClick} />
          </div>
        </div>
      </div>
    );
  }
}
