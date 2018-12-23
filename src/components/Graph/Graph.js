import React from 'react';
import PropTypes from 'prop-types';
import {Bar} from 'react-chartjs-2';
import {forEach} from 'lodash'
import {liste} from '../../utils/liste'

class Graph extends React.PureComponent {
  state = {
    data: {},
    chartOptions: {}
  }

  static getDerivedStateFromProps(props, state) {
    const risultati = props.data
    const data = {labels: [], datasets:[{label: 'Percento', backgroundColor:[], borderColor:[], borderWidth: 1, data:[]}]}
    forEach(risultati, function(risultato){
      data.labels.push(liste[risultato.lista].label)
      data.datasets[0].backgroundColor.push(liste[risultato.lista].color)
      data.datasets[0].borderColor.push(liste[risultato.lista].color)
      data.datasets[0].data.push(parseFloat(risultato.percentuale))
    })
    
    const chartOptions = {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Risultato Coalizioni'
      },
      scales: {
        yAxes: [{
          ticks: {
                min: 0,
                max: 60,
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
                const lista = liste[risultato.lista].coalizione
                return lista
              }
            }
        }
      }
    }

    return {
      data: data,
      chartOptions: chartOptions
    }
  }

  render() {
    return (
      <Bar data={this.state.data} options={this.state.chartOptions} />
    );
  }
}

Graph.propTypes = {
  data: PropTypes.array,
};

export default Graph;
