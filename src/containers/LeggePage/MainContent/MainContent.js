import React from 'react';
import PropTypes from 'prop-types';
import Votazioni from './Votazioni';

import './style.scss';

class MainContent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="row-75">
        <div className="main">
          <div className="col main-content">
            <Votazioni info={this.props.info} />
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
