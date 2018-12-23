import React from 'react';
import PropTypes from 'prop-types';
import { letteraGenere } from '../../../utilsFunctions';

import './style.scss';

const images = require.context('./images', true);

class Sidebar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    let image = null;
    if (this.props.info.sigla_gruppo) {
      if (this.props.info.sigla_gruppo !== 'MISTO') {
        const logo = images(`./${this.props.info.sigla_gruppo.toLowerCase()}.png`);
        image = <img src={logo} alt={this.props.info.sigla_gruppo} />;
      } else if (this.props.info.sigla_gruppo === 'MISTO') {
        image = <p>{`Gruppo Misto - ${this.props.info.sigla_componente}`}</p>;
      } else {
        image = <p>{'Non Iscritto'}</p>;
      }
    } else {
      image = null;
    }

    const nome = this.props.info && this.props.info.nome ? this.props.info.nome.beautifyName() : null;
    const cognome = this.props.info && this.props.info.cognome ? this.props.info.cognome.beautifyName() : null;
    const luogoNascita = this.props.info && this.props.info.luogo_nascita ? this.props.info.luogo_nascita.beautifyName() : null;

    let elezione = null;
    let genere = 'o';
    if (this.props.info) {
      genere = letteraGenere(this.props.info.genere);
    }
    if (this.props.info.lista) {
      elezione = <p>Elett{genere} nella lista: <b>{this.props.info.lista}</b></p>;
    }

    return (
      <div className="row-25">
        <div className="sidebar">
          <div className="col sidebar-content u-text-r-xxl u-padding-r-bottom">
            <div className="deputato-foto u-text-r-xxl u-margin-r-all">
              <img src={this.props.info.url_foto} alt={`Foto di ${this.props.info.cognome}`} />
            </div>

            <div className="deputato-contenuto u-text-r-s u-padding-r-right u-padding-r-left">

              <div className="deputato-nome-simbolo">
                <h2 className="deputato-nome">{nome}<br />{cognome}</h2>
                {/* <h2 className="deputato-data-elezione">{this.props.info.data-elezione}</h2> */}
                <div className="lista-simbolo">
                  {image}
                </div>
              </div>

              {elezione}
              <p>{this.props.info.info}</p>
              <p>Nat{genere} a <span className="deputato-luogo"><b>{luogoNascita}</b></span> il <b>{new Date(this.props.info.data_nascita).toLocaleDateString('it-IT')}</b></p>
              <li className="social u-padding-top-s">
                <button type="button" className="Button Button--info u-text-r-xs"><span className="Icon-facebook"></span> Facebook<span className="u-hiddenVisually">Facebook</span></button>
              </li>

              <li className="social u-padding-top-s">
                <button type="button" className="Button Button--info u-text-r-xs"><span className="Icon-twitter"></span> Twitter<span className="u-hiddenVisually">Twitter</span></button>
              </li>

              <li className="social u-padding-top-s">
                <button type="button" className="Button Button--info u-text-r-xs"><span className="Icon-external-link"></span> Sito Web<span className="u-hiddenVisually">Twitter</span></button>
              </li>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  info: PropTypes.object
};

String.prototype.beautifyName = function () {
  // return this.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => (index === 0 ? letter.toUpperCase() : letter.toLowerCase()));
  return this.toLowerCase();
};

export default Sidebar;
