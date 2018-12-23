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

class CercaCollegioPage extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps;
  }

  constructor(props) {
    super(props);
    this.state = {
      collegi: [], collegiDisplay: [], tipo: null, search: null, loading: true
    };
  }

  componentDidMount() {
    this.downloadCollegi();
  }

  async downloadCollegi() {
    const json = await getApi('/collegi');
    this.setState({ collegi: json, collegiDisplay: json, loading: false });
  }

  nameInput(e) {
    const txt = e.target.value;
    this.setState({ search: txt }, () => { this.changeDisplay(); });
  }

  changeDisplay() {
    const txt = this.state.search.toLowerCase();
    const col = this.state.collegi.filter((collegio) =>
      collegio.collegio_plurinominale.toLowerCase().includes(txt) ||
        collegio.nome_collegio_uninominale.toLowerCase().includes(txt) ||
        collegio.codice_collegio_uninominale.toLowerCase().includes(txt));
    this.setState({ collegiDisplay: col });
  }

  openCollegio(id, uni) {
    this.props.history.push(`/collegi/${id}-${uni}`);
  }

  render() {
    let table = null;
    if (this.state.collegi.length > 0) {
      table = (
        <div className="table-nome u-margin-r-top u-text-r-xs">
          <table className="Table Table--striped Table--hover Table--withBorder">
            <caption className="u-hiddenVisually">Cerca per nome</caption>
            <thead>
              <tr><th>Collegio Uninominale</th><th>Collegio Plurinominale</th><th>Codice Collegio Uninominale</th></tr>
            </thead>
            <tbody>
              {this.state.collegiDisplay.map((value) => (
                <tr className="table-cursor" key={value.nome_collegio_uninominale} onClick={(e) => this.openCollegio(value.objectid ,value.nome_collegio_uninominale)}>
                  <td className="capitalized-text">{value.nome_collegio_uninominale.toLowerCase()}</td>
                  <td className="capitalized-text">{value.collegio_plurinominale.toLowerCase()}</td>
                  <td className="capitalized-text">{value.codice_collegio_uninominale.toLowerCase()}</td>
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
          <title>Cerca Collegio</title>
          <meta name="description" content="Cerca deputato" />
        </Helmet>
        <section className="Hero u-background-grey-40">
          <div className="Hero-content cerca-nome">
            <div className="flex">
              <div className="row u-margin-r-top u-text-r-xs ">
                <p className="cerca-text">
                  <a href="#" className="u-textClean u-color-60 u-text-h4"><span className="Dot u-background-60"></span>Lista Collegi</a>
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

CercaCollegioPage.propTypes = {
  history: PropTypes.object
};

export default withRouter(CercaCollegioPage);
