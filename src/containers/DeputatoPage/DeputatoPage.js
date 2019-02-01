/*
 * CollegioPage
 *
 * Pagina dedicata al dettaglio di un singolo collegio
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Sidebar from './Sidebar';
import Gruppi from './Gruppi';
import Mappa from '../../components/Mappa';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getApi } from '../../api-connect';

import './style.scss';

export default class DeputatoPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    info: {},
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
          <div className="block-title justify-items-center">
            <div className="row no-gutters align-items-center primary-bg-a6">
              <div className="col-lg-6">
                  <div className="d-flex flex-column block align-items-center justify-content-center">
                    <span className="it-category">{this.state.info.gruppi[0].nome_gruppo}</span>
                    <h1 className="no_toc">{this.state.info.nome} {this.state.info.cognome}</h1>
                  </div>
              </div>
              <div className="col-lg-6">
                <Mappa geoJsonUrl={this.state.info.geoJsonMap} loading={this.state.loading} />
              </div>
            </div>
          </div>
          <Gruppi deputato_id={this.state.info.id} gruppi={this.state.info.gruppi} />
          {/* <Riepilogo collegio={this.state.collegio} uninominale={this.state.uninominale} loading={this.state.loading} risultatiUninominale={this.state.risultatiUninominale} /> */}
          <div className="section section-primary">
            <div className="section-content">
              <div className="container white-color">
                <div className="row mb-3">
                  <div className="col-12 text-center">
                    <h4 className="m-0">Altri Deputati</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <ListaDeputati deputati={this.state.proporzionale} loading={this.state.loading} /> */}
          <div className="section section-primary">
            <div className="section-content">
              <div className="container white-color">
                <div className="row mb-3">
                  <div className="col-12 text-center">
                    <h4 className="m-0">Altre Informazioni</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <RiepilogoListe data={this.state.risultatiPlurinominale} nazionali={this.state.risultatiNazionali} /> */}
        </div>
      ];
    }
  }
}

DeputatoPage.propTypes = {
  match: PropTypes.object
};
