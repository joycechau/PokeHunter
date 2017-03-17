import React from 'react';
import { pokemonList } from './pokemon_list.js';
import styles from './pokedex.css';

export default class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pokemonList, numCaughtPokemon: 0 };
    this.onPokemonClicked = this.onPokemonClicked.bind(this);
  }

  onPokemonClicked(pokemon) {
    const newPokemonList = pokemonList.slice();
    newPokemonList[`${parseInt(pokemon.id)}` - 1].found = true;
    const numFoundPokemon = this.foundPokemon().length
    this.setState({
      pokemonList: newPokemonList,
      numCaughtPokemon: numFoundPokemon
    });
  }

  foundPokemon() {
    const foundPokemon = [];
    this.state.pokemonList.forEach((pokemon) => {
      if (pokemon.found) {
        foundPokemon.push(pokemon)
      }
    })

    return foundPokemon;
  }

  renderPokemon(key, pokemon) {
    return (
      <div key={key} className={styles.item} id={pokemon.name}>
        { pokemon.id }
        <img
          src={pokemon.found ? pokemon.found_url : pokemon.hidden_url}
          alt={pokemon.name}
          className={styles.img}
        />
        { pokemon.found ? pokemon.name : pokemon.hidden_name }
      </div>
    );
  }

  render() {
    const { pokemonList } = this.state;
    return (
      <div className={styles.pokedex}>
        <div className={styles.title}>
          Caught: {this.state.numCaughtPokemon}/150
        </div>
        <div className={styles.list}>
          { pokemonList.map((pokemon, i) => {
            return this.renderPokemon(i, pokemon);
          })
        }
        </div>
      </div>
    );
  }
}
