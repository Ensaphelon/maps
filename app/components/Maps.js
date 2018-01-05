import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  /**
   * Setting default props.
   */
  static defaultProps = {
    center: { lat: 59.95, lng: 30.33 },
    zoom: 11,
  };
  /**
   * Setting initial state.
   * @param {object} props - Component's properties.
   */
  constructor(props) {
    super(props);
    this.state = {
      points: props.items,
      center: props.center,
      markers: [],
      mapInstance: null,
    };
  }
  /**
   * Calling renderMarkers & renderPolyline when any props will be received from outside.
   * @param {object} props - Component's properties.
   */
  componentWillReceiveProps = (props) => {
    this.setState({ points: props.items });
    const map = this.state.mapInstance;
    if (map) {
      this.renderMarkers(map, this.state.points);
      this.renderPolyline(map, this.state.points);
    }
  }
  /**
   * Function calls when dragging ends in google maps,
   * stores current center location on component's state.
   * @param {object} mapProps - Map's properties
   * @param {object} map - Google maps instance
   */
  setCenter(mapProps, map) {
    const context = mapProps.context;
    mapProps.context.setState({ center: { lat: map.center.lat(), lng: map.center.lng() } });
    context.props.setCenter(context.state.center);
  }
  /**
   * Storing maps instance and initial map center in component's state
   * @param {object} mapProps - Map's properties
   * @param {object} map - Google maps instance
   */
  init(mapProps, map) {
    const context = mapProps.context;
    const props = mapProps.context.props;
    context.setState({ mapInstance: map });
    props.setCenter(context.state.center);
  }
  /**
   * Remove markers from google maps
   * @param {object} map - Google maps instance
   * @param {array} points - Added points
   */
  clearMarkers(markers) {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
  }
  /**
   * Renders info window
   * @param {object} maps - Google maps API
   * @param {object} marker - Google maps marker
   * @param {object} map - Maps instance
   * @param {object} point - Added point
   */
  renderInfoWindow(maps, marker, map, point) {
    const infowindow = new maps.InfoWindow({
      content: point[0],
    });
    maps.event.addListener(marker, 'click', () => {
      infowindow.open(map, marker);
    });
  }
  /**
   * Renders markers
   * @param {object} map - Google maps instance
   * @param {array} points - Added points
   */
  renderMarkers(map, points) {
    const self = this;
    const props = this.props;
    const maps = props.google.maps;
    const markers = [];
    this.clearMarkers(this.state.markers);
    points.forEach((el, i) => {
      const marker = new maps.Marker({
        position: { lat: el[1], lng: el[2] },
        map,
        draggable: true,
      });
      maps.event.addListener(marker, 'dragend', (event) => {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
        const newEl = [el[0], newLat, newLng];
        const newPoints = points;
        newPoints[i] = newEl;
        self.setState({ points: newPoints });
        props.setCenter(self.state.center);
      });
      this.renderInfoWindow(maps, marker, map, el);
      markers.push(marker);
    });
    this.setState({ markers });
  }
  /**
   * Renders polylines
   * @param {object} map - Google maps instance
   * @param {array} points - Added points
   */
  renderPolyline(map, points) {
    const props = this.props;
    const maps = props.google.maps;
    const polylinePath = [];
    if (this.state.polyline) {
      this.state.polyline.setMap(null);
    }
    points.forEach((el) => {
      polylinePath.push({
        lat: el[1],
        lng: el[2],
      });
    });
    const line = new maps.Polyline({
      path: polylinePath,
      strokeColor: '#FF0000',
      strokeWeight: 3,
    });
    line.setMap(map);
    this.setState({ polyline: line });
  }
  render() {
    return (
      <Map
        initialCenter={this.props.center}
        onDragend={this.setCenter}
        onReady={this.init}
        context={this}
        google={this.props.google}
        zoom={this.props.zoom}
      />
    );
  }
}

MapContainer.propTypes = {
  google: PropTypes.object.isRequired,
  center: PropTypes.object,
  zoom: PropTypes.number,
  items: PropTypes.array.isRequired,
};

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDwsjGYZpUITk4k0VQErn3pgkFdMI4dR7M'),
})(MapContainer);
