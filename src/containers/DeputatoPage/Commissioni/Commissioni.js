import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './style.scss';

class Commissioni extends React.PureComponent {
  state = {
    commissioni: [], 
    loading: true, 
    deputato_id: null
  };

  static getDerivedStateFromProps(props, state) {
    return {
      commissioni: props.commissioni, 
      deputato_id: props.deputato_id
    }
  }

  render() {

    let incarichi = (
      <div className="bg-white text-center p-5">
        Nessun Incarico
      </div>
    );

    if(this.state.commissioni && this.state.commissioni.length > 0){
      incarichi = (
        <table class="table table-light bg-white m-0">
          <thead className="thead-dark ">
            <tr>
              <th className="primary-bg-a6">Commissione</th>
              <th className="primary-bg-a6">Membro</th>
              <th className="primary-bg-a6">Data Inizio</th>
              <th className="primary-bg-a6">Data Fine</th>
            </tr>
          </thead>
          <tbody>
            {this.state.commissioni.map((commissione) => {
              let end = null;
              if(commissione.fine_incarico) { end = moment(commissione.fine_incarico).format('DD-MM-YYYY') }

              return <tr key={commissione.id}>
                <td className="u-color-50 capitalized-text">{commissione.nome_organo.toLowerCase()}</td>
                <td className="u-color-50 capitalized-text">{commissione.tipo.toLowerCase()}</td>
                <td className="u-color-50 capitalized-text">{moment(commissione.inizio_incarico).format('DD-MM-YYYY')}</td>
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

Commissioni.propTypes = {
  deputato_id: PropTypes.string,
  commissioni: PropTypes.array
};


export default Commissioni;
