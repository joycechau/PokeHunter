import React from 'react';
import pokemonList from './pokemon_list.js';

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pokemonList };
  }

  render() {
    return (
      <div>
        Pokedex Component
      </div>
    );
  }
}

export default Pokedex;
