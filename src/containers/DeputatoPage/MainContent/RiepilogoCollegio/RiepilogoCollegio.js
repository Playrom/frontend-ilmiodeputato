import React from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"

import { listaToSigla, letteraGenere } from '../../../../utilsFunctions';
import { downloadMap } from '../../../../api-connect';

import './style.scss';

const images = require.context('../../../../images', true);

class RiepilogoCollegio extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps;
  }

  componentDidMount() {
    if (!this.props.info.estero) {

      let geoJsonReq = null;
      if (this.props.info.nome_collegio_uninominale) {
        geoJsonReq = `${this.props.info.geoJsonMap}/uninominale`;
        downloadMap(geoJsonReq, 'uninominale', '#FF0000', this.downloadMapCall.bind(this));
      }

      geoJsonReq = `${this.props.info.geoJsonMap}/plurinominale`;
      downloadMap(geoJsonReq, 'proporzionale', '#FFFF00', this.downloadMapCall.bind(this));
    }
  }

  downloadMapCall(geoJson, tipoCollegio, color) {
    this.features = this.refs.map.data.addGeoJson(
      geoJson
    );

    this.features.forEach((feature) => {
      feature.setProperty('tipoCollegio', tipoCollegio);
      feature.setProperty('color', color);
      feature.getGeometry().forEachLatLng((latlng) => {
        this.refs.map.props.defaultBounds.extend(latlng);
      });
    });

    this.refs.map.data.setStyle((feature) => ({
      fillColor: feature.getProperty('color'),
      strokeWeight: 1,
      title: feature.getProperty('tipoCollegio')
    }));

    this.refs.map.fitBounds(this.refs.map.props.defaultBounds);
  }

  render() {
    let image = null;
    let elezione = null;

    if (this.props.info.lista) {
      const sigla = listaToSigla(this.props.info.lista.toLowerCase());

      if (sigla != null) {
        const logo = images(`./${sigla}.png`);
        image = <img src={logo} alt={this.props.info.lista} />;
      } else {
        image = null;
      }
    } else {
      image = null;
    }

    let genere = 'o';
    if (this.props.info) {
      genere = letteraGenere(this.props.info.genere);
    }
    if (this.props.info.lista) {
      elezione = <p>Elett{genere} nella lista: <b>{this.props.info.lista}</b></p>;
    } else if (this.props.info.nome_collegio_uninominale) {
      elezione = <p>Elett{genere} con voto Uninominale - Coalizione <b>LOREM IPSUM</b></p>;
    }

    const MyMap = withScriptjs(withGoogleMap((props) =>
      <GoogleMap 
        className="mappa"
        zoom={16} 
        ref={this.onMapMounted} 
        /* eslint-disable no-undef */
        defaultBounds={new google.maps.LatLngBounds()}
      >
      </GoogleMap>
    ))

    let mappa = null;
    if (!this.props.info.estero) {
      mappa = (
        <div className="row-60">
          <MyMap googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBoqWY4IvZtCraPr4SET4tbGC-dY4oDEt8&libraries=places" />
        </div>
      );
    }

    return (
      <div className="entry row u-md-size1of1 u-lg-size1of1 riepilogo-collegio">
        <div className="row-40 u-text-r-xs u-padding-r-all">
          <h2 className="left u-color-50">{this.props.info.nome_collegio_uninominale}</h2>
          <h3 className="right u-color-50">Collegio Plurinominale di {this.props.info.collegio_plurinominale}</h3>
          <div className="deputato-nome-simbolo">

            {elezione}
            <div className="lista-simbolo">
              {image}
            </div>
          </div>

        </div>
        {mappa}
      </div>
    );
  }
}

RiepilogoCollegio.propTypes = {
  info: PropTypes.object
};


export default RiepilogoCollegio;
