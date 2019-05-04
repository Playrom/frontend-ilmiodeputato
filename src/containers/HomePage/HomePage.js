/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter, Link } from 'react-router-dom';
import './style.scss';

import { getApi } from '../../api-connect';

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    this.initialize();
  }

  initialize() {
    /* eslint-disable no-undef */
    this.autocomplete = new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */
      (document.getElementById('autocomplete')), {
        types: ['geocode']
      });

    google.maps.event.addListener(this.autocomplete, 'place_changed', async () => {
      const place = this.autocomplete.getPlace();
      const components = place.address_components;
      const poli = components.filter((value) => value.types.includes('country'));
      const countryCode = poli[0].short_name;

      if (countryCode === 'IT') {
        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();
        const json = await getApi(`/collegi?latitude=${latitude}&longitude=${longitude}`);
        if (json.gid) {
          this.props.history.push({
            pathname: `/collegi/${json.objectid}-${json.cam17u_nom}`,
            state: { collegio: json }
          });
        }
      } else {
        const json = await getApi(`/collegi?stato=${countryCode}`);
        console.log(json);
        if (json.deputati) {
          this.props.history.push({
            pathname: `/collegi/estero-${countryCode}`,
            state: { collegio: json }
          });
        }
      }
    });
  }

  // geolocate() {

  // }

  render() {

    return [
      <Helmet key="head">
        <title>Home Page</title>
        <meta name="description" content="A React.js Boilerplate application homepage" />
      </Helmet>
      ,
      <div className="it-hero-wrapper it-text-centered" key="content">
        <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                  <div className="it-hero-text-wrapper bg-dark">
                    <span className="it-category">Digita il tuo indirizzo</span>
                    <h1 className="no_toc">Cerca il tuo deputato</h1>
                    <div className="form-group">
                      <input type="text" id="autocomplete" className="form-control" />
                    </div>

                    <span>Oppure visualizza tutte le liste</span>

                    <div className="d-flex flex-row justify-content-between my-3">
                      <button type="button" className="btn btn-primary"><Link to="/cerca-deputato">Cerca per Nome Deputato</Link></button>
                      <button type="button" className="btn btn-primary"><Link to="/cerca-collegio">Cerca per Lista di Collegi</Link></button>
                      <button type="button" className="btn btn-primary"><Link to="/cerca-deputato">Cerca per Lista di Elezione</Link></button>
                    </div>
                  </div>
              </div>
            </div>
        </div>
      </div>
    ];
  }
}

HomePage.propTypes = {
  history: PropTypes.object
};

export default withRouter(HomePage);
