import React from 'react';

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(51.508742,-0.120850),
      zoom: 5,
    });
  }

  render() {
    return (
      <div id="map" style={{ height: '100%'}}/>
    );
  }
}

export default Map;
