import React from 'react';
import PropTypes from 'prop-types';
import Deputato from '../Deputato';
import { downloadMap } from '../../../api-connect';
import Graph from '../../../components/Graph';
import './style.scss';

class Riepilogo extends React.PureComponent {
  state = {
    uninominale: {},
    collegio: {},
    loading: true,
    risultatiUninominale: {}
  }

  static getDerivedStateFromProps(props, state) {
    return {
      uninominale: props.uninominale,
      collegio: props.collegio,
      loading: props.loading,
      risultatiUninominale: props.risultatiUninominale
    }
  }

  render() {
    return (
      <div className="row no-gutters align-items-stretch bg-white">
        <div className="col-lg-6">
            <Deputato key={this.state.uninominale.id} className="deputato-main" info={this.state.uninominale} />
        </div>
        <div className="col-lg-6 lightgrey-bg-c1">
          <Graph data={this.state.risultatiUninominale} />
        </div>
      </div>
    );
  }
}

Riepilogo.propTypes = {
  collegio: PropTypes.object,
  uninominale: PropTypes.object,
  risultatiUninominale: PropTypes.array,
  loading: PropTypes.bool
};

export default Riepilogo;
