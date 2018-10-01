// accepted props: lng, lat [decimal type], zoom [integer]
import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAGs_7tB_Pw1D_5Jr-ebJQsc55HQI0GAhY&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    // change height and width here to change the size of google map
    containerElement: <div style={{ height: "50vh", width: "100%" }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && (
      <Marker
        position={{ lat: props.lat, lng: props.lng }}
        onClick={props.onMarkerClick}
      />
    )}
  </GoogleMap>
));

class GoogleMapRender extends React.PureComponent {
  state = {
    isMarkerShown: true
  };

  static defaultProps = {
    lat: -36.8658814,
    lng: 147.2869802,
    zoom: 14
  };

  handleMarkerClick = () => {};

  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        lat={this.props.lat}
        lng={this.props.lng}
        zoom={this.props.zoom}
      />
    );
  }
}

export default GoogleMapRender;
