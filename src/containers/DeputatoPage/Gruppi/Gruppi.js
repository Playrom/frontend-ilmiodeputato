import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './style.scss';

const images = require.context('../../../images', true);

class Gruppi extends React.PureComponent {
  state = {
    gruppi: [], 
    loading: true, 
    deputato_id: null
  };

  static getDerivedStateFromProps(props, state) {
    return {
      gruppi: props.gruppi, 
      deputato_id: props.deputato_id
    }
  }

  render() {

    return [
      <ul class="nav nav-tabs nav-tabs-cards" id="card-simple" role="tablist">
        {this.state.gruppi.map((gruppo,i) => {
          let image = null;
          let componente = null;
      
          if (gruppo.sigla_gruppo) {
            if (gruppo.sigla_gruppo !== 'MISTO') {
              const logo = images(`./${gruppo.sigla_gruppo.toLowerCase()}.png`);
              image = <img src={logo} alt={gruppo.sigla_gruppo} className="lista-simbolo" />;
            // } else if (gruppo.sigla_gruppo === 'MISTO') {
            //   image = null;
            //   componente = <small>{`Componente: ${this.props.info.sigla_componente}`}</small>;
            } else {
              image = null;
            }
          } else {
            image = null;
          }
          
          return (
            <li className="nav-item">
              <a className="nav-link" id={"card-simple" + (i+1) + "-tab"} data-toggle="tab" href={"#card-simpletab" + (i+1)} role="tab" aria-controls={"#card-simpletab" + (i+1)} aria-selected="true">
                {image}
                {gruppo.nome_gruppo}
              </a>
            </li>
          )
        })}
      </ul>,
      <div className="tab-content" id="card-simpleContent">
        {this.state.gruppi.map((gruppo,i) => {
          let endGruppo = null;
          if(gruppo.fine_adesione) { endGruppo = moment(gruppo.fine_adesione).format('DD-MM-YYYY') }
          let isActive = endGruppo === null ? 'active' : '';
          return (
            <div className={`tab-pane fade show ${isActive}`} id={"card-simpletab" + (i+1)} role="tabpanel" aria-labelledby={"card-simple" + (i+1) + "-tab"}>
              <table class="table table-light bg-white m-0">
                <thead className="thead-dark ">
                  <tr>
                    <th className="primary-bg-a6">Incarico</th>
                    <th className="primary-bg-a6">Data Inizio</th>
                    <th className="primary-bg-a6">Data Fine</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key="membro">
                    <td className="u-color-50 capitalized-text">Membro</td>
                    <td className="u-color-50 capitalized-text">{moment(gruppo.inizio_adesione).format('DD-MM-YYYY')}</td>
                    <td className="u-color-50 capitalized-text">{endGruppo}</td>
                  </tr>
                  {gruppo.incarichi.map((value) => {
                    let end = null;
                    if(value.fine_incarico) { end = moment(value.fine_incarico).format('DD-MM-YYYY') }

                    return <tr key={value.id}>
                      <td className="u-color-50 capitalized-text">{value.incarico.toLowerCase()}</td>
                      <td className="u-color-50 capitalized-text">{moment(value.inizio_incarico).format('DD-MM-YYYY')}</td>
                      <td className="u-color-50 capitalized-text">{end}</td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
    ]
  }
}

Gruppi.propTypes = {
  deputato_id: PropTypes.string,
  gruppi: PropTypes.array
};


export default Gruppi;
