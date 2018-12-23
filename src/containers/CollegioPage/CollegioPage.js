/*
 * CollegioPage
 *
 * Pagina dedicata al dettaglio di un singolo collegio
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Riepilogo from './Riepilogo';
import Mappa from './Mappa';
import ListaDeputati from './ListaDeputati';
import Graph from '../../components/Graph';
import { getApi } from '../../api-connect';
import LoadingIndicator from '../../components/LoadingIndicator';

import './style.scss';

export default class CollegioPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */

  constructor(props) {
    super(props);
    this.state = {
      collegio: {}, uninominale: {}, proporzionale: [], loading: true, id: props.match.params.id, estero: props.estero, stato: props.match.params.stato
    };
  }

  componentDidMount() {
    this.downloadCollegio();
  }

  async downloadCollegio() {
    if (this.state.estero) {
      const json = await getApi(`/collegi?stato=${this.state.stato}`);
      if (json.deputati) {
        const deputatiProporzionali = json.deputati.filter((deputato) => deputato.tipo_collegio === 'proporzionale');

        this.setState({
          collegio: json, proporzionale: deputatiProporzionali, loading: false
        });
      }
    } else {
      const json = await getApi(`/collegi/${this.state.id}`);
      if (json.gid) {
        const deputatoUninominale = json.deputati.filter((deputato) => deputato.tipo_collegio === 'maggioritario')[0];
        const deputatiProporzionali = json.deputati.filter((deputato) => deputato.tipo_collegio === 'proporzionale');
        const risultati = await getApi(`/collegi/${this.state.id}/risultati`)

        this.setState({
          collegio: json, 
          uninominale: deputatoUninominale, 
          proporzionale: deputatiProporzionali, 
          loading: false,
          risultatiUninominale: risultati.risultati_uninominale,
          risultatiPlurinominale: risultati.risultati_plurinominale
        });
      }
    }
  }

  render() {
    const title = this.state.collegio.cam17u_nom ? this.state.collegio.cam17u_nom : 'Il Mio Deputato';
    return [
      <Helmet key="helmet">
        <title>{title}</title>
        <meta name="description" content="trova e conosci il tuo deputato" />
      </Helmet>,
      <div className="collegio-page" key="content">
        <div className="block-title justify-items-center">
          <div className="row no-gutters align-items-center primary-bg-a6">
            <div className="col-lg-6">
                <div className="d-flex flex-column block align-items-center justify-content-center">
                  <span className="it-category">Collegio Plurinominale di {this.state.collegio.cam17p_den}</span>
                  <h1 className="no_toc">{this.state.collegio.cam17u_nom}</h1>
                </div>
            </div>
            <div className="col-lg-6">
              <Mappa collegio={this.state.collegio} loading={this.state.loading} />
            </div>
          </div>
        </div>
        <Riepilogo collegio={this.state.collegio} uninominale={this.state.uninominale} loading={this.state.loading} risultatiUninominale={this.state.risultatiUninominale} />
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
        <ListaDeputati deputati={this.state.proporzionale} loading={this.state.loading} />
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
        <div className="row no-gutters align-items-stretch bg-white">
          <div className="col-12">
            <Graph data={this.state.risultatiPlurinominale} />
          </div>
        </div>
      </div>
    ];
  }
}

CollegioPage.propTypes = {
  match: PropTypes.object,
  estero: PropTypes.bool
};
