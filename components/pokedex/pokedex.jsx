import React from 'react';
import { pokemonList } from './pokemon_list.js';
import styles from './pokedex.css';

export default class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pokemonList };
    this.onPokemonClicked = this.onPokemonClicked.bind(this);
  }

  onPokemonClicked(pokemon) {
    const newPokemonList = pokemonList.slice();
    newPokemonList[`${parseInt(pokemon.id)}` - 1].found = true;
    this.setState({
      pokemonList: newPokemonList
    });
  }

  renderPokemon(key, pokemon) {
    return (
      <div key={key} className={styles.item}>
        { pokemon.id }
        <img src={pokemon.found ? pokemon.found_url : pokemon.hidden_url} className={styles.img} />
        { pokemon.found ? pokemon.name : pokemon.hidden_name }
      </div>
    );
  }

  render() {
    const { pokemonList } = this.state;
    return (
      <div>
        { pokemonList.map((pokemon, i) => {
            return this.renderPokemon(i, pokemon);
          })
        }
      </div>
    );
  }
}
