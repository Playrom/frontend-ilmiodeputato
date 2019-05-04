import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './style.scss';

class UfficiParlamentari extends React.PureComponent {
  state = {
    uffici_parlamentari: [], 
    loading: true, 
    deputato_id: null
  };

  static getDerivedStateFromProps(props, state) {
    return {
      uffici_parlamentari: props.uffici_parlamentari, 
      deputato_id: props.deputato_id
    }
  }

  render() {

    let incarichi = (
      <div className="bg-white text-center p-5">
        Nessun Incarico
      </div>
    );

    if(this.state.uffici_parlamentari && this.state.uffici_parlamentari.length > 0){
      incarichi = (
        <table class="table table-light bg-white m-0">
          <thead className="thead-dark ">
            <tr>
              <th className="primary-bg-a6">Organo</th>
              <th className="primary-bg-a6">Incarico</th>
              <th className="primary-bg-a6">Data Inizio</th>
              <th className="primary-bg-a6">Data Fine</th>
            </tr>
          </thead>
          <tbody>
            {this.state.uffici_parlamentari.map((ufficio) => {
              let end = null;
              if(ufficio.fine_incarico) { end = moment(ufficio.fine_incarico).format('DD-MM-YYYY') }

              return <tr key={ufficio.id}>
                <td className="u-color-50 capitalized-text">{ufficio.nome_organo.toLowerCase()}</td>
                <td className="u-color-50 capitalized-text">{ufficio.carica.toLowerCase()}</td>
                <td className="u-color-50 capitalized-text">{moment(ufficio.inizio_incarico).format('DD-MM-YYYY')}</td>
                <td className="u-color-50 capitalized-text">{end}</td>
              </tr>
            })}
          </tbody>
        </table>
      );
    }

    return [
      <div className="tab-content" id="card-simpleContent">
        {incarichi}
      </div>
    ]
  }
}

UfficiParlamentari.propTypes = {
  deputato_id: PropTypes.string,
  uffici_parlamentari: PropTypes.array
};


export default UfficiParlamentari;
