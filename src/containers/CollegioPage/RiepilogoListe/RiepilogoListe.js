import React from 'react';
import PropTypes from 'prop-types';
import {groupBy, map, keys, reduce, find} from 'lodash';
import Graph from '../../../components/Graph'
import './style.scss';

class RiepilogoListe extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    data: [],
    grouped: [],
    differenze: []
  }

  static getDerivedStateFromProps(props, state) {
    const data = props.data
    const groupedDictionary = groupBy(data,function(lista){
      return lista.coalizione
    })
    const grouped = map(keys(groupedDictionary), function(chiave){
      return {
        nome: chiave,
        liste: groupedDictionary[chiave],
        voti: reduce(groupedDictionary[chiave],function(sum,lista){
          return sum + parseInt(lista.voti)
        },0),
        percentuale: reduce(groupedDictionary[chiave],function(sum,lista){
          return sum + parseFloat(lista.percentuale)
        },0.00).toFixed(2)
      }
    })

    const differenze = map(data, function(lista){
      const found = find(props.nazionali,{lista: lista.lista})
      if(found){
        return {
          lista: lista.lista, 
          sigla_lista: lista.sigla_lista,
          colore_lista: lista.colore_lista,
          percentuale: (lista.percentuale - found.percentuale).toFixed(2),
          tipo: 'plurinominale'
        }
      }else{
        return null;
      }
    })

    return {
      data: data,
      grouped: grouped,
      differenze: differenze
    }
  }

  render() {
    return (
      <div className="row no-gutters align-items-stretch bg-white">
        <div className="col-md-6">
          <div className="table-responsive">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Lista</th>
                  <th scope="col">Voti</th>
                  <th scope="col">Percentuale</th>
                </tr>
              </thead>
              <tbody>
                {this.state.grouped.map((coalizione) => {
                  let headCoalizione = null
                  if(coalizione.liste.length > 1){
                    headCoalizione = (
                      <tr style={{backgroundColor:coalizione.liste[0].colore_lista, color:'white'}} key={coalizione.nome}>
                        <td>Coalizione</td>
                        <td>{coalizione.nome}</td>
                        <td>{coalizione.voti}</td>
                        <td>{coalizione.percentuale}</td>
                      </tr>
                    )
                  }
                  return [
                    headCoalizione,
                    coalizione.liste.map(function(lista){
                      return (
                        <tr key={lista.sigla_lista}>
                          <td><div className="cerchio" style={{
                            backgroundColor:lista.colore_lista,
                            width: '25px',
                            height: '25px',
                            borderRadius: '25px'
                          }}></div></td>
                          <td>{lista.lista}</td>
                          <td>{lista.voti}</td>
                          <td>{lista.percentuale}</td>
                        </tr>
                      )
                    })
                  ]
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-6">
          <Graph data={this.state.data} title="Risultato Liste" />
          <Graph data={this.state.differenze} title="Differenza Risultato Liste rispetto al valore nazionale" min="-20" max="20" />
          <p className="px-3"><small>I risultati non includono i voti espressi ai soli candidati uninominali, potrebbero quindi variare rispetto ai dati ufficiali</small></p>
        </div>
      </div>
    );
  }
}

RiepilogoListe.propTypes = {
  data: PropTypes.array,
  nazionali : PropTypes.array
};


export default RiepilogoListe;
