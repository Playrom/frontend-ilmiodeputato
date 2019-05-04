import React from 'react';
import PropTypes from 'prop-types';
import {Bar, HorizontalBar} from 'react-chartjs-2';
import {forEach} from 'lodash'

class Graph extends React.PureComponent {
  state = {
    data: {},
    chartOptions: {},
    vertical: false,
    title: ''
  }

  static getDerivedStateFromProps(props, state) {
    const risultati = props.data
    const data = {labels: [], datasets:[{label: 'Percento', backgroundColor:[], borderColor:[], borderWidth: 1, data:[]}]}
    forEach(risultati, function(risultato){
      if(risultato.tipo === "uninominale"){
        data.labels.push(risultato.sigla_coalizione)
        data.datasets[0].backgroundColor.push(risultato.colore_coalizione)
        data.datasets[0].borderColor.push(risultato.colore_coalizione)
        data.datasets[0].data.push(parseFloat(risultato.percentuale))
      }else if(risultato.tipo === "plurinominale"){
        data.labels.push(risultato.sigla_lista)
        data.datasets[0].backgroundColor.push(risultato.colore_lista)
        data.datasets[0].borderColor.push(risultato.colore_lista)
        data.datasets[0].data.push(parseFloat(risultato.percentuale))
      }
    })
    
    const chartOptions = {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: props.title || 'Risultato Coalizioni'
      },
      scales: {
        yAxes: [{
          ticks: {
                min: props.min || 0,
                max: props.max || 60,
                callback: function(value){ return value+ "%"}
          },  
          scaleLabel: {
            display: true,
            labelString: "Percentuale Voti Validi"
          }
        }]
      },
      tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
                let label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                    label += '%';
                }
                label = tooltipItem.yLabel + "%";
                return label;
            },
            title: function(tooltipItems, data){
              if(tooltipItems.length > 0){
                const tooltipItem = tooltipItems[0]
                const risultato = risultati[tooltipItem.index]
                let lista
                if(risultato.tipo === "uninominale"){
                  lista = risultato.coalizione
                }else if(risultato.tipo === "plurinominale"){
                  lista = risultato.lista
                }
                return lista
              }
            }
        }
      }
    }

    return {
      data: data,
      chartOptions: chartOptions,
      vertical: props.vertical || false
    }
  }

  render() {
    if(this.state.vertical){
      return (
        <HorizontalBar data={this.state.data} options={this.state.chartOptions} />
      );
    }
    return (
      <Bar data={this.state.data} options={this.state.chartOptions} />
    );
  }
}

Graph.propTypes = {
  data: PropTypes.array,
  vertical: PropTypes.bool,
  title: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number
};

export default Graph;
