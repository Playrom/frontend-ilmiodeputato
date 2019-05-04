import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './style.scss';

const images = require.context('../../../images', true);

class Leggi extends React.PureComponent {
  state = {
    leggi: [], 
    loading: true
  };

  static getDerivedStateFromProps(props, state) {
    return {
      leggi: props.leggi,
    }
  }

  render() {

    let leggi = (
      <div className="bg-white text-center p-5">
        Nessuna Proposta di Legge
      </div>
    );

    if(this.state.leggi && this.state.leggi.length > 0){
      leggi = (
        <table class="table table-light bg-white m-0">
          <thead className="thead-dark ">
            <tr>
              <th className="primary-bg-a6 align-middle" style={{width:"5%"}}>#</th>
              <th className="primary-bg-a6 align-middle" style={{width:"40%"}}>Titolo</th>
              <th className="primary-bg-a6 align-middle" style={{width:"15%"}}>Tipo</th>
              <th className="primary-bg-a6 align-middle" style={{width:"15%"}}>Iniziativa</th>
              <th className="primary-bg-a6 align-middle" style={{width:"10%"}}>Data Presentazione</th>
              <th className="primary-bg-a6 align-middle" style={{width:"10%"}}>Data Approvazione</th>
              <th className="primary-bg-a6 align-middle" style={{width:"5%"}}>Primo Firmatario</th>
            </tr>
          </thead>
          <tbody>
            {this.state.leggi.map((legge) => {
              let end = "-";
              if(legge.data_approvazione) { end = moment(legge.data_approvazione).format('DD-MM-YYYY') }
              const primo_firmatario = legge.primo_firmatario ? "SI" : "-";

              return <tr key={legge.id}>
                <td className="u-color-50">{legge.numero}</td>
                <td className="u-color-50">{legge.titolo}</td>
                <td className="u-color-50">{legge.tipo}</td>
                <td className="u-color-50">{legge.iniziativa}</td>
                <td className="u-color-50 capitalized-text">{moment(legge.data_presentazione).format('DD-MM-YYYY')}</td>
                <td className="u-color-50 capitalized-text">{end}</td>
                <td className="u-color-50 capitalized-text">{primo_firmatario}</td>
              </tr>
            })}
          </tbody>
        </table>
      );
    }

    return [
      <div className="tab-content" id="card-simpleContent">
        {leggi}
      </div>
    ]
  }
}

Leggi.propTypes = {
  leggi: PropTypes.array
};


export default Leggi;
