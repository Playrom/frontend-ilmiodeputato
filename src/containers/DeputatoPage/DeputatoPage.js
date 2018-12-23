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

export default class DeputatoPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
    const json = await getApi(`/deputati/${id}`);

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
          <title>{`${this.state.info.nome} ${this.state.info.cognome} - Il Mio Deputato`}</title>
          <meta name="description" content="trova e conosci il tuo deputato" />
        </Helmet>
      );
      html = [
        <Sidebar key="sidebar" info={this.state.info} />,
        <MainContent key="main" info={this.state.info} />
      ];
    }
    return (
      <article>
        {title}

        <section className="deputato-page u-text-r-xxl u-padding-r-all root-flex">
          {html}
        </section>
      </article>
    );
  }
}

DeputatoPage.propTypes = {
  match: PropTypes.object
};
