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
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps;
  }

  constructor(props) {
    super(props);
    this.state = {
      deputati: [], deputatiDisplay: [], tipo: null, search: null, lista: null, loading: true
    };
  }

  componentDidMount() {
    this.downloadDeputati();
  }

  async downloadDeputati() {
    const json = await getApi('/deputati?fields=deputato_id,nome,cognome,collegio_plurinominale,lista,tipo_collegio');
    this.setState({ deputati: json, deputatiDisplay: json, loading: false });
  }

  nameInput(e) {
    const txt = e.target.value;
    this.setState({ search: txt }, () => { this.changeDisplay(); });
  }

  changeDisplay() {
    const txt = this.state.search.toLowerCase();
    const dep = this.state.deputati.filter((deputato) => deputato.nome.toLowerCase().includes(txt) || deputato.cognome.toLowerCase().includes(txt));
    console.log(dep);
    this.setState({ deputatiDisplay: dep });
  }

  openDeputato(did) {
    this.props.history.push(`/deputati/${did}`);
  }

  render() {
    let table = null;
    if (this.state.deputati.length > 0) {
      table = (
        <div className="table-nome u-margin-r-top u-text-r-xs">
          <table className="Table Table--striped Table--hover Table--withBorder">
            <caption className="u-hiddenVisually">Cerca per nome</caption>
            <thead>
              <tr><th>Nome</th><th>Cognome</th><th>Collegio Plurinominale</th><th>Tipo di Elezione</th><th>Lista di Elezione</th></tr>
            </thead>
            <tbody>
              {this.state.deputatiDisplay.map((value) => (
                <tr className="table-cursor" key={value.deputato_id} onClick={(e) => this.openDeputato(value.deputato_id)}>
                  <td className="capitalized-text">{value.nome.toLowerCase()}</td>
                  <td className="capitalized-text">{value.cognome.toLowerCase()}</td>
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

    return (
      <article>
        <Helmet>
          <title>Cerca Deputato</title>
          <meta name="description" content="Cerca deputato" />
        </Helmet>
        <section className="Hero u-background-grey-40">
          <div className="Hero-content cerca-nome">
            <div className="flex">
              <div className="row u-margin-r-top u-text-r-xs ">
                <p className="cerca-text">
                  <a href="#" className="u-textClean u-color-60 u-text-h4"><span className="Dot u-background-60"></span>Lista Deputati</a>
                </p>
              </div>

              <div className="row u-margin-r-top u-text-r-xs ">
                <input className="Form-input" id="autocomplete" aria-required="true" required placeholder="Cerca per nome" onChange={(e) => this.nameInput(e)} />
              </div>

              {table}

            </div>
          </div>
        </section>
      </article>
    );
  }
}

CercaDeputatoPage.propTypes = {
  history: PropTypes.object
};

export default withRouter(CercaDeputatoPage);
