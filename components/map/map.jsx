import React from 'react';
import styles from './map.css';

const POKE_MARKERS = [
  'https://res.cloudinary.com/joycechau/image/upload/v1487572646/ultraball.png',
  'https://res.cloudinary.com/joycechau/image/upload/v1487572637/safariball.png',
  'https://res.cloudinary.com/joycechau/image/upload/v1487572623/greatball.png',
  'https://res.cloudinary.com/joycechau/image/upload/v1487572592/masterball.png',
  'https://res.cloudinary.com/joycechau/image/upload/v1487572540/pokeball.png',
  'https://res.cloudinary.com/joycechau/image/upload/v1487572666/premierball.png'
];

const MAX_LAT = 49.5;
const MIN_LAT = 17.5;
const MAX_LNG = 294.5;
const MIN_LNG = 236;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      maxZoom: 4,
      minZoom: 4,
      center: {lat: 35, lng: 265},
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      panControl: false,
      draggable: false,
      scrollwheel: false,
    });

    for (let i = 0; i < 30; i++) {
      this.addMarker(map);
    }
  }

  addMarker(map) {
    const lat = Math.random() * (MAX_LAT - MIN_LAT) + MIN_LAT;
    const lng = Math.random() * (MAX_LNG - MIN_LNG) + MIN_LNG;

    const marker = new google.maps.Marker({
      position: {lat, lng},
      icon: POKE_MARKERS[Math.floor(Math.random() * POKE_MARKERS.length)],
      map: map
    });

    marker.addListener('click', () => {
      marker.setMap(null);
      this.addMarker(map);

      if (this.props.onPokeballClick) {
        this.props.onPokeballClick();
      }
    });
  }

  render() {
    return (
      <div id="map" className={styles.map} />
    );
  }
}
