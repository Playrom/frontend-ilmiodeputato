import React from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import Deputato from '../Deputato';
import { downloadMap } from '../../../api-connect';
import './style.scss';

class Mappa extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps;
  }

  constructor(props) {
    super(props);
    this.map = React.createRef();
    this.state = {
      collegio: {}, loading: props.loading
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    this.map = new google.maps.Map(this.collegio_map, {
      zoom: 16
    });
    this.updateMap();
  }

  componentDidUpdate() {
    this.setState({
      collegio: this.props.collegio, loading: this.props.loading
    }, () => {
      this.updateMap();
    });
  }

  updateMap() {
    if (this.state.collegio.geoJsonMap) {
      let geoJsonReq = `${this.state.collegio.geoJsonMap}/uninominale`;
      downloadMap(geoJsonReq, 'uninominale', '#FF0000', this.downloadMapCall.bind(this));

      geoJsonReq = `${this.state.collegio.geoJsonMap}/plurinominale`;
      downloadMap(geoJsonReq, 'proporzionale', '#FFFF00', this.downloadMapCall.bind(this));
    }
  }

  downloadMapCall(geoJson, tipoCollegio, color) {
    this.features = this.map.data.addGeoJson(
      geoJson
    );

    // eslint-disable-next-line no-undef
    const bounds = new google.maps.LatLngBounds();


    this.features.forEach((feature) => {
      feature.setProperty('tipoCollegio', tipoCollegio);
      feature.setProperty('color', color);
      feature.getGeometry().forEachLatLng((latlng) => {
        bounds.extend(latlng);
      });
    });

    this.map.data.setStyle((feature) => ({
      fillColor: feature.getProperty('color'),
      strokeWeight: 1,
      title: feature.getProperty('tipoCollegio')
    }));

    this.map.fitBounds(bounds);
    this.setState({ loading: false });
  }

  render() {
    let row = null;
    if (!this.state.collegio.estero) {
      row = (
        <div key="map" className="collegio-mappa" id="collegio_map" ref={(c) => { this.collegio_map = c; }} ></div>
      );
    }
    return row;
  }
}

Mappa.propTypes = {
  collegio: PropTypes.object,
  loading: PropTypes.bool
};


export default Mappa;
