import React from 'react';
import styles from './map.css';
import { pokemonList } from '../pokedex/pokemon_list.js';

const POKEMON_LIST = pokemonList;

const POKE_MARKERS = [
  'https://res.cloudinary.com/joycechau/image/upload/v1487572646/ultraball.png',
  'https://res.cloudinary.com/joycechau/image/upload/v1487572637/safariball.png',
  'https://res.cloudinary.com/joycechau/image/upload/v1487572623/greatball.png',
  'https://res.cloudinary.com/joycechau/image/upload/v1487572592/masterball.png',
  'https://res.cloudinary.com/joycechau/image/upload/v1487572540/pokeball.png',
  'https://res.cloudinary.com/joycechau/image/upload/v1487572666/premierball.png'
];

const MAX_LAT = 85;
const MIN_LAT = -85;
const MAX_LNG = 180;
const MIN_LNG = -180;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      minZoom: 4,
      center: {lat: 35, lng: -95},
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      panControl: true,
      draggable: true,
      scrollwheel: true,
    });

    for (let i = 0; i < 750; i++) {
      this.addPokeballMarker(map);
    }
  }

  addPokeballMarker(map) {
    const randomPokeball = POKE_MARKERS[Math.floor(Math.random() * POKE_MARKERS.length)];
    const lat = Math.random() * (MAX_LAT - MIN_LAT) + MIN_LAT;
    const lng = Math.random() * (MAX_LNG - MIN_LNG) + MIN_LNG;

    const pokeballMarker = new google.maps.Marker({
      position: {lat, lng},
      icon: randomPokeball,
      map: map
    });

    pokeballMarker.addListener('click', () => {
      pokeballMarker.setMap(null);
      this.addPokeballMarker(map);

      const markerLat = pokeballMarker.getPosition().lat();
      const markerLng = pokeballMarker.getPosition().lng();

      map.panTo({lat: markerLat, lng: markerLng});
      map.setZoom(10);

      this.addPokemonMarker(map, markerLat, markerLng)

    });

  }

  addPokemonMarker(map, lat, lng) {
    const randomPokemon = POKEMON_LIST[Math.floor(Math.random() * POKEMON_LIST.length)];
    const icon = {
      url: randomPokemon.marker_url,
    };
    const pokemonMarker = new google.maps.Marker({
      position: map.getCenter(),
      icon: icon,
      map: map
    });

    pokemonMarker.addListener('click', () => {
      if (this.props.onPokemonClick) {
        this.props.onPokemonClick(randomPokemon);
      }
    });
  }

  render() {
    return (
      <div id="map" className={styles.map} />
    );
  }
}
