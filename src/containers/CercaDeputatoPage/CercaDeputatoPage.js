/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import './style.scss';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getApi } from '../../api-connect';

class CercaDeputatoPage extends React.PureComponent {

  state = {
    deputati: [], 
    deputatiDisplay: [], 
    tipo: null, 
    search: null, 
    lista: null, 
    loading: true
  }

  componentDidMount() {
    Promise.all([
      this.downloadDeputati()
    ]).then(function(){
      this.setState({loading:false})
    }.bind(this))
  }

  async downloadDeputati() {
    const json = await getApi('/deputati?fields=id,nome,cognome,collegio_plurinominale,lista,tipo_collegio');
    this.setState({ deputati: json, deputatiDisplay: json, loading: false });
  }

  nameInput(e) {
    const txt = e.target.value;
    this.setState({ search: txt }, () => { this.changeDisplay(); });
  }

  changeDisplay() {
    const txt = this.state.search.toLowerCase();
    const dep = this.state.deputati.filter((deputato) => deputato.nome.toLowerCase().includes(txt) || deputato.cognome.toLowerCase().includes(txt));
    this.setState({ deputatiDisplay: dep });
  }

  openDeputato(did) {
    this.props.history.push(`/deputati/${did}`);
  }

  render() {
    let table = null;

    if (this.state.deputati.length > 0) {
      table = (
        <div className="cerca-deputato-page">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Cognome</th>
                <th scope="col">Collegio Plurinominale</th>
                <th scope="col">Tipo di Elezione</th>
                <th scope="col">Lista di Elezione</th>
              </tr>
            </thead>
            <tbody>
              {this.state.deputatiDisplay.map((value) => (
                <tr className="table-cursor" key={value.id} onClick={(e) => this.openDeputato(value.id)}>
                  <td className="capitalized-text">{value.cognome.toLowerCase()}</td>
                  <td className="capitalized-text">{value.nome.toLowerCase()}</td>
                  <td className="capitalized-text">{value.collegio_plurinominale.toLowerCase()}</td>
                  <td className="capitalized-text">{value.tipo_collegio.toLowerCase()}</td>
                  <td className="capitalized-text">{(value.lista != null ? value.lista : ' - ').toLowerCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (this.state.loading) {
      table = <LoadingIndicator />;
    }

    return [
        <Helmet key="head">
          <title>Cerca Deputato</title>
          <meta name="description" content="Cerca deputato" />
        </Helmet>,
        <div className="it-hero-wrapper it-text-centered" key="content">
          <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                    <div className="it-hero-text-wrapper bg-dark">
                      <span className="it-category">Digita il nome del deputato</span>
                      <h1 className="no_toc">Cerca il tuo deputato</h1>
                      <div className="form-group">
                        <input type="text" id="autocomplete" className="form-control" placeholder="Cerca per nome" onChange={(e) => this.nameInput(e)}  />
                      </div>

                     {table}

                    </div>
                </div>
              </div>
          </div>
        </div>
    ];
  }
}

CercaDeputatoPage.propTypes = {
  history: PropTypes.object
};

export default withRouter(CercaDeputatoPage);
