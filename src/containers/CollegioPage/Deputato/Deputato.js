import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { letteraGenere } from '../../../utilsFunctions';
import './style.scss';

const images = require.context('../../../images', true);

class Deputato extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    let image = null;
    let sigla
    if(this.props.info && this.props.info.gruppi && this.props.info.gruppi[0]){
      sigla = this.props.info.gruppi[0].sigla_gruppo
    }
    if (sigla) {
      if (sigla !== 'MISTO') {
        const logo = images(`./${sigla.toLowerCase()}.png`);
        image = <img src={logo} alt={sigla} />;
      } else if (sigla === 'MISTO') {
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
      <div className="deputato row p-3 flex-nowrap">
        <div className="deputato-foto">
          <img src={this.props.info.url_foto} alt={`Foto di ${this.props.info.cognome}`} />
        </div>
        <div className="deputato-contenuto flex-column flex-grow-1">

          <div className="deputato-nome-simbolo d-flex justify-content-between align-items-center">
            <h2 className="deputato-nome">{nome} {cognome}</h2>
            {/* <h2 className="deputato-data-elezione">{this.props.info.data-elezione}</h2> */}
            <div className="lista-simbolo">
              {image}
            </div>
          </div>

          {elezione}
          <p>{this.props.info.info}</p>
          <p>Nat{genere} a <span className="deputato-luogo"><b>{luogoNascita}</b></span> il <b>{new Date(this.props.info.data_nascita).toLocaleDateString('it-IT')}</b></p>
          <div className="deputato-link">
            <Link to={`/deputati/${this.props.info.id}`} className="link" >Altre Informazioni</Link>
          </div>
        </div>
      </div>
    );
  }
}

Deputato.propTypes = {
  info: PropTypes.object,
  className: PropTypes.string
};

String.prototype.beautifyName = function () {
  // return this.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => (index === 0 ? letter.toUpperCase() : letter.toLowerCase()));
  return this.toLowerCase();
};

export default Deputato;
