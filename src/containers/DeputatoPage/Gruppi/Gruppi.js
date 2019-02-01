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

    // let tableIncarichi = null;

    // if (this.state.incarichi && this.state.incarichi.length > 0) {
    //   tableIncarichi = (
    //     <div className="col u-text-r-xs u-background-grey-20">
    //       <h2 className="u-color-white u-background-50 u-text-r-xs u-padding-r-all">Ruoli del deputato dentro il gruppo</h2>
    //       <table className="Table Table--striped Table--hover Table--withBorder">
    //         <caption className="u-hiddenVisually">Ruoli del deputato dentro il gruppo</caption>
    //         <tbody>
    //           {this.state.incarichi.map((value) => (
    //             <tr key={value.incarico}>
    //               <td><h2 className="u-color-50 capitalized-text">{value.incarico.toLowerCase()}</h2></td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   );
    // }

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
          console.log(gruppo.incarichi);
          return (
            <div className="tab-pane fade show active" id={"card-simpletab" + (i+1)} role="tabpanel" aria-labelledby={"card-simple" + (i+1) + "-tab"}>
              <table class="table table-light">
                <tbody>
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
