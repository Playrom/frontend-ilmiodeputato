import React from 'react';
import PropTypes from 'prop-types';
import Deputato from '../Deputato';

import './style.scss';

class ListaDeputati extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    let count = 0;
    return (
      <div className="container-fluid">
        <div key="proporzionale" className="lista-deputati row">
          {this.props.deputati.map((deputato) => {
            let divider = null;
            if(count > 1 && count % 2 === 0) {
              divider = <span className="w-100" key={`divider-deputati-${count}`}></span>; 
            }
            count++;
            return [
              divider,
              <div className="col-lg-6" key={deputato.id}>
                <Deputato key={deputato.id} info={deputato} />
              </div>
            ];
          })}
        </div>
      </div>
    );
  }
}

ListaDeputati.propTypes = {
  deputati: PropTypes.array
};


export default ListaDeputati;
