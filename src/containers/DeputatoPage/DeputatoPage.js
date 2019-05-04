/*
 * CollegioPage
 *
 * Pagina dedicata al dettaglio di un singolo collegio
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Gruppi from './Gruppi';
import UfficiParlamentari from './UfficiParlamentari';
import Commissioni from './Commissioni';
import Leggi from './Leggi';
import Mappa from '../../components/Mappa';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getApi } from '../../api-connect';

import './style.scss';

export default class DeputatoPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    info: {},
    leggi: [],
    loading: true,
    id: null
  };

  static getDerivedStateFromProps(props, state) {
    return {
      id: props.match.params.id
    }
  }

  componentDidMount() {
    this.downloadData().then(() => this.setState({loading: false}));
  }

  async downloadData() {
    const json = await getApi(`/deputati/${this.state.id}`);
    this.setState({info: json});
    const leggi = await getApi(`/deputati/${this.state.id}/leggi`);
    this.setState({leggi: leggi});
  }

  render() {
    let title = null;
    
    if(this.state.loading){
      return [
        <Helmet key="helmet">
          <title>{title}</title>
          <meta name="description" content="trova e conosci il tuo deputato" />
        </Helmet>,
        <LoadingIndicator />
      ]
    } else if (this.state.info) {
      return [
        <Helmet>
          <title>{`${this.state.info.nome} ${this.state.info.cognome} - Il Mio Deputato`}</title>
          <meta name="description" content="trova e conosci il tuo deputato" />
        </Helmet>,
        <div className="deputato-page" key="content">
          <div className="block-title justify-content-center">
            <div className="row no-gutters align-items-center primary-bg-a6">
              <div className="col-lg-6">
                  <div className="d-flex flex-column block align-items-center justify-content-center">
                    <span className="it-category white-color">{this.state.info.gruppi[0].nome_gruppo}</span>
                    <h1 className="no_toc white-color">{this.state.info.nome} {this.state.info.cognome}</h1>
                  </div>
              </div>
              <div className="col-lg-6">
                <Mappa geoJsonUrl={this.state.info.geoJsonMap} loading={this.state.loading} />
              </div>
            </div>
          </div>
          <div className="container-fluid neutral-2-bg">
            <div className="row">
              <div className="col-lg-6 py-2">
                <div className="primary-border-color-a6 border">
                  <div className="d-flex block-title justify-content-center primary-bg-a6">
                    <h2 className="no_toc white-color m-0 p-1">Gruppi</h2>
                  </div>
                  <Gruppi deputato_id={this.state.info.id} gruppi={this.state.info.gruppi} />
                </div>
              </div>
              <div className="col-lg-6 py-2">
                <div className="primary-border-color-a6 border">
                  <div className="d-flex block-title justify-content-center primary-bg-a6">
                    <h2 className="no_toc white-color m-0 p-1">Uffici Parlamentari</h2>
                  </div>
                  <UfficiParlamentari deputato_id={this.state.info.id} uffici_parlamentari={this.state.info.uffici_parlamentari} />
                </div>
              </div>
              <div class="w-100"></div>
              <div className="col-lg-6 py-2">
                <div className="primary-border-color-a6 border">
                  <div className="d-flex block-title justify-content-center primary-bg-a6">
                    <h2 className="no_toc white-color m-0 p-1">Commissioni</h2>
                  </div>
                  <Commissioni deputato_id={this.state.info.id} commissioni={this.state.info.commissioni} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col py-2">
                <div className="primary-border-color-a6 border">
                  <div className="d-flex block-title justify-content-center primary-bg-a6">
                    <h2 className="no_toc white-color m-0 p-1">Proposte di Legge</h2>
                  </div>
                  <Leggi leggi={this.state.leggi} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ];
    }
  }
}

DeputatoPage.propTypes = {
  match: PropTypes.object
};
