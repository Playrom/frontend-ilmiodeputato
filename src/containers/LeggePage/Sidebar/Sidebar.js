import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import it from 'dayjs/locale/it';

import './style.scss';
import { letteraGenere } from '../../../utilsFunctions';

dayjs().locale('it').format();
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
          <div className="entry col sidebar-content u-text-r-xs u-padding-r-all">
            <h2>{this.props.info.fase}</h2>
            {dayjs(this.props.info.dataApprovazione || this.props.info.dataIter).format('DD/MM/YYYY')}
          </div>

          <div className="entry col sidebar-content u-text-r-xs u-padding-r-all">
            <h2>{this.props.info.tipo}</h2>
            Iniziativa: {this.props.info.iniziativa}
          </div>

          <div className="entry col sidebar-content u-text-r-xs u-padding-r-all">
            <h2>Primo Firmatario</h2>
            Iniziativa: {this.props.info.iniziativa}
          </div>

          <div className="entry col sidebar-content u-text-r-xs u-padding-r-all">
            <h2>Altri Firmatari</h2>
            Iniziativa: {this.props.info.iniziativa}
          </div>

        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  info: PropTypes.object
};

export default Sidebar;
