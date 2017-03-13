import React from 'react';
import Modal from 'react-modal';
import styles from './map.css';
import { pokemonList } from '../pokedex/pokemon_list.js';
import Pokemon from '../pokemon/pokemon.jsx';
import { style } from '../pokemon/pokemon.js';

const POKEMON_LIST = pokemonList;

const POKEBALL_MARKERS = [
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
const TOTAL_POKEBALLS = 750;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pokemon: null, modalOpen: false };
    this.map = null
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      minZoom: 4,
      center: { lat: 35, lng: -95 },
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
    const infoMarker = new google.maps.Marker({
      position: { lat: 35, lng: -95 },
      icon: POKEBALL_MARKERS[4],
      map: map
    });
    const infoWindow = new google.maps.InfoWindow({
      content: "<div style='width: 212px; font-size: 10px; margin-top: 5px;'>" +
                 "Click on pokeballs to search for pokemon!" +
               "</div>"
    });

    infoWindow.open(map, infoMarker);

    infoMarker.addListener('click', () => {
      infoMarker.setMap(null);
      this.addPokeballMarker(map);

      const markerLat = infoMarker.getPosition().lat();
      const markerLng = infoMarker.getPosition().lng();

      map.panTo({ lat: markerLat, lng: markerLng });
      map.setZoom(10);

      this.addPokemonMarker(map, markerLat, markerLng);
    });

    for (let i = 0; i < TOTAL_POKEBALLS; i++) {
      this.addPokeballMarker(map);
    }

    this.map = map;
  }

  addPokeballMarker(map) {
    const randomPokeball = POKEBALL_MARKERS[Math.floor(Math.random() * POKEBALL_MARKERS.length)];
    const lat = Math.random() * (MAX_LAT - MIN_LAT) + MIN_LAT;
    const lng = Math.random() * (MAX_LNG - MIN_LNG) + MIN_LNG;

    const pokeballMarker = new google.maps.Marker({
      position: { lat, lng },
      icon: randomPokeball,
      map: map
    });

    pokeballMarker.addListener('click', () => {
      pokeballMarker.setMap(null);
      this.addPokeballMarker(map);

      const markerLat = pokeballMarker.getPosition().lat();
      const markerLng = pokeballMarker.getPosition().lng();

      map.panTo({ lat: markerLat, lng: markerLng });
      map.setZoom(10);

      this.addPokemonMarker(map, markerLat, markerLng);
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
      pokemonMarker.setMap(null);
      this.openModal(randomPokemon);

      if (this.props.onPokemonClick) {
        this.props.onPokemonClick(randomPokemon);
      }
    });
  }

  openModal(pokemon) {
    this.setState({
      pokemon: pokemon,
      modalOpen: true
    });
  }

  closeModal() {
    this.map.setZoom(4);
    this.setState({
      pokemon: null,
      modalOpen: false
    });
  }

  render() {
    return (
      <div id="map" className={styles.map}>
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Modal"
          style={style}>
          <Pokemon pokemon={this.state.pokemon}/>
        </Modal>
      </div>
    );
  }
}
