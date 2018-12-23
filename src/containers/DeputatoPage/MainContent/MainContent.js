import React from 'react';
import PropTypes from 'prop-types';
import RiepilogoCollegio from './RiepilogoCollegio';
import Gruppo from './Gruppo';
import Commissioni from './Commissioni';
import Organi from './Organi';
import Leggi from './Leggi';
import LoadingIndicator from '../../../components/LoadingIndicator';

import './style.scss';

class MainContent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="row-75">
        <div className="main">
          <div className="col main-content">
            <RiepilogoCollegio info={this.props.info} />
            <Gruppo info={this.props.info} />
            <Commissioni info={this.props.info} />
            <Organi info={this.props.info} />
            <Leggi info={this.props.info} tipo="primo_firmatario" />
            <Leggi info={this.props.info} tipo="altro_firmatario" />
          </div>
        </div>
      </div>
    );
  }
}

MainContent.propTypes = {
  info: PropTypes.object
};


export default MainContent;
