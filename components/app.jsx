import React from 'react';
import {hashHistory} from 'react-router';
import Header from './header/header.jsx';
import Pokedex from './pokedex/pokedex.jsx';
import Map from './map/map.jsx';
import styles from './app.css';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.onPokemonClick = this.onPokemonClick.bind(this);
    this.pokemonList = this.pokemonList.bind(this);
    this.numCaughtPokemon = this.numCaughtPokemon.bind(this);
  }

  onPokemonClick(pokemon) {
    this.refs.pokedex.onPokemonClicked(pokemon);
  }

  pokemonList() {
    return this.refs.pokedex.state.pokemonList;
  }

  numCaughtPokemon() {
    return this.refs.pokedex.state.numCaughtPokemon;
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
            <Map onPokemonClick={this.onPokemonClick}
                 pokemonList={this.pokemonList}
                 numCaughtPokemon={this.numCaughtPokemon}/>
          </div>
        </div>
      </div>
    );
  }
}
