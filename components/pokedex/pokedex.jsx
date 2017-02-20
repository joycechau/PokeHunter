import React from 'react';
import { pokemonList } from './pokemon_list.js';
import styles from './pokedex.css';

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pokemonList };
    this.onPokeballClicked = this.onPokeballClicked.bind(this);
  }

  onPokeballClicked() {
    // Pokedex Logic
  }

  renderPokemon(key, pokemon) {
    return (
      <div key={key} className={styles.item}>
        { pokemon.id }
        <img src={pokemon.found ? pokemon.found_url : pokemon.hidden_url} className={styles.img} />
        { pokemon.name }
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

export default Pokedex;
