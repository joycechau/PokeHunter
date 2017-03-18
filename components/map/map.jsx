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
const MILLISECONDS = 800;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pokemon: null, modalOpen: false };
    this.map = null;
    this.infoMarker = null;
    this.infoWindow = null;
    this.pokeballs = [];
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const map = this.createMap();
    this.createInfoWindow(map);
    this.addPokeballMarkers(map);
  }

  createMap() {
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
      scrollwheel: true
    });

    this.map = map;
    return map;
  }

  createInfoWindow(map) {
    const infoMarker = new google.maps.Marker({
      position: { lat: 35, lng: -95 },
      icon: POKEBALL_MARKERS[4],
      map: map
    });

    const infoWindow = new google.maps.InfoWindow({
      content: "<div style='width: 115px; font-size: 12px; margin-top: 2px; line-height: 15px'>" +
                 "Click on pokeballs to search for pokemon!" +
               "</div>"
    });

    this.infoMarker = infoMarker;
    this.infoWindow = infoWindow;
    this.pokeballs.push(infoMarker);

    infoWindow.open(map, infoMarker);

    infoMarker.addListener('click', () => {
      infoMarker.setMap(null);
      this.pokeballs.splice(this.pokeballs.indexOf(infoMarker), 1);
      this.addPokeballMarker(map);
      this.pokeballs.forEach((pokeball) => pokeball.setMap(null));

      const markerLat = infoMarker.getPosition().lat();
      const markerLng = infoMarker.getPosition().lng();

      map.panTo({ lat: markerLat, lng: markerLng });
      map.setZoom(10);
      this.addPokemonMarker(map, markerLat, markerLng);
    });
  }

  addPokeballMarkers(map) {
    for (let i = 0; i < TOTAL_POKEBALLS; i++) {
      this.addPokeballMarker(map);
    }
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

    this.pokeballs.push(pokeballMarker);

    pokeballMarker.addListener('click', () => {
      pokeballMarker.setMap(null);
      this.infoWindow.close();
      this.pokeballs.splice(this.pokeballs.indexOf(pokeballMarker), 1);
      this.addPokeballMarker(map);
      this.pokeballs.forEach((pokeball) => pokeball.setMap(null));

      const markerLat = pokeballMarker.getPosition().lat();
      const markerLng = pokeballMarker.getPosition().lng();

      map.panTo({ lat: markerLat, lng: markerLng });
      map.setZoom(10);
      this.addPokemonMarker(map, markerLat, markerLng);
    });
  }

  addPokemonMarker(map) {
    map.setOptions(Object.assign(map, {
      zoomControl: false,
      draggable: false,
      scrollwheel: false
    }));

    const isNewPokemon = Math.random() > 0.60;
    let currentPokemon = Math.floor(Math.random() * this.props.pokemonList().length);
    let randomPokemon = this.props.pokemonList()[currentPokemon];
    while (isNewPokemon && randomPokemon.found && this.props.numCaughtPokemon() < 150) {
      currentPokemon = (currentPokemon + 1) % this.props.pokemonList().length;
      randomPokemon = this.props.pokemonList()[currentPokemon];
    }

    const icon = {
      url: randomPokemon.marker_url,
    };
    const pokemonMarker = new google.maps.Marker({
      position: map.getCenter(),
      icon: icon,
      map: map
    });

    this.setState({
      pokemon: randomPokemon,
    });

    document.getElementById(`${this.state.pokemon.name}`).scrollIntoView();

    pokemonMarker.addListener('click', () => {
      pokemonMarker.setMap(null);
      this.openModal(randomPokemon);

      if (this.props.onPokemonClick) {
        this.props.onPokemonClick(randomPokemon);
      }
    });

    this.updatePokemonPosition(pokemonMarker, map);
    setInterval(() => this.updatePokemonPosition(pokemonMarker, map), MILLISECONDS);

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.runawayButton(map, pokemonMarker));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.pokemonMessage(map, pokemonMarker));
  }

  updatePokemonPosition(pokemonMarker, map) {
    const bounds = map.getBounds();
    const latOffset = 0.05;
    const lngOffset = 0.1;
    const minLatBounds = bounds.f.f + latOffset;
    const maxLatBounds = bounds.f.b - latOffset;
    const minLngBounds = bounds.b.b + lngOffset;
    const maxLngBounds = bounds.b.f - lngOffset;
    const newLat = Math.random() * (maxLatBounds - minLatBounds) + minLatBounds;
    const newLng = Math.random() * (maxLngBounds - minLngBounds) + minLngBounds;
    const newPosition = new google.maps.LatLng(newLat, newLng);
    pokemonMarker.setPosition(newPosition);
  }

  pokemonMessage(map, pokemonMarker) {
    const pokemonMessage = $(
      `<div id="pokemon-message"
            style="margin-left: 10px;
                  margin-top: 10px;
                  padding: 14px 10px;
                  background-color: white;
                  font-size: 14px;
                  line-height: 0px">
        A wild ${this.state.pokemon.name} appeared! Click to catch it!
      </div>`
    );

    return pokemonMessage[0];
  }

  runawayButton(map, pokemonMarker) {
    const runawayButton = $(
      `<img id="runaway-button"
            style="cursor: pointer;
                  margin-right: 10px;
                  margin-top: 10px;
                  width: 30px;
                  height: 30px;"
            src="https://res.cloudinary.com/joycechau/image/upload/v1489479098/runaway.png"
            alt="Run Away"/>`
    );

    runawayButton.bind('click', () => {
      pokemonMarker.setMap(null);
      this.resetMap();
    });

    return runawayButton[0];
  }

  openModal(pokemon) {
    this.setState({
      pokemon: pokemon,
      modalOpen: true
    });
  }

  closeModal() {
    this.resetMap();
    this.setState({
      pokemon: null,
      modalOpen: false
    });
    this.checkCaughtAllPokemon();
  }

  checkCaughtAllPokemon() {
    if (this.props.pokemonList().every((pokemon) => pokemon.found)) {
      alert("Congrats! You're a Pokemon Master! If you made it this far, you enjoyed the game and should probably give Joyce an interview. =)");
    }
  }

  resetMap() {
    this.map.setOptions(Object.assign(this.map, {
      zoomControl: true,
      draggable: true,
      scrollwheel: true,
      zoom: 4
    }));
    this.pokeballs.forEach((pokeball) => pokeball.setMap(this.map));
    $('#runaway-button').remove();
    $('#pokemon-message').remove();
  }

  render() {
    return (
      <div id="map" className={styles.map}>
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Modal"
          style={style}>
          <Pokemon pokemon={this.state.pokemon}
                   closeModal={this.closeModal}/>
        </Modal>
      </div>
    );
  }
}
