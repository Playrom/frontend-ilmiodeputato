/*
 * CollegioPage
 *
 * Pagina dedicata al dettaglio di un singolo collegio
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getApi } from '../../api-connect';

import './style.scss';

export default class LeggePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */

  constructor(props) {
    super(props);
    this.state = {
      info: {},
      loading: true
    };
  }

  componentDidMount() {
    this.downloadData();
  }

  async downloadData() {
    const id = this.props.match.params.id;
    const json = await getApi(`/leggi/${id}`);

    this.setState({
      info: json,
      loading: false
    });
  }

  render() {
    let title = null;
    let html = null;
    if (this.state.loading) {
      title = (
        <Helmet>
          <title>Il Mio Deputato</title>
          <meta name="description" content="trova e conosci il tuo deputato" />
        </Helmet>
      );

      html = <LoadingIndicator />;
    } else if (this.state.info) {
      title = (
        <Helmet>
          <title>{`Proposta di Legge Numero ${this.state.info.numero} - Il Mio Deputato`}</title>
          <meta name="description" content="trova e conosci il tuo deputato" />
        </Helmet>
      );
      html = (
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="first-row u-text-r-xs u-padding-r-all"><h2 className="left u-color-50">{this.state.info.titolo}</h2></div>
            </div>
            <div className="row">
              <div className="second-row root-flex">
                <Sidebar key="sidebar" info={this.state.info} />
                <MainContent key="main" info={this.state.info} />
              </div>
            </div>

          </div>
        </div>
      );
    }
    return (
      <article>
        {title}

        <section className="legge-page u-text-r-xxl u-padding-r-all root-flex">
          {html}
        </section>
      </article>
    );
  }
}

LeggePage.propTypes = {
  match: PropTypes.object
};
