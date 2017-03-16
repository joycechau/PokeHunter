import React from 'react';
import styles from './pokemon.css';

export default class Pokemon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const pokemonName = this.props.pokemon.name;
    const pokemonImage = this.props.pokemon.found_url;
    return (
      <div>
        <div className={styles.header}>
          You caught {pokemonName}!
        </div>
        <div className={styles.stage}>      
          <img src={pokemonImage}
            alt={pokemonName}
            className={styles.img}/>
        </div>
      </div>
    );
  }
}
