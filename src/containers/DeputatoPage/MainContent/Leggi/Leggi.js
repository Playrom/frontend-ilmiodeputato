import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Pager from '../../../../components/Pager';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { getApi } from '../../../../api-connect';

import './style.scss';

class Leggi extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps;
  }

  constructor(props) {
    super(props);
    this.state = {
      leggi: [], paging: { offset: 0, limit: 2 }, tipo: 'primo_firmatario', loading: true, deputato_id: props.info.deputato_id
    };
  }

  componentDidMount() {
    this.downloadLeggi();
  }

  async downloadLeggi() {
    if (this.state.deputato_id) {
      const json = await getApi(`/deputati/${this.state.deputato_id}/leggi/${this.state.tipo}?offset=${this.state.paging.offset}&limit=${this.state.paging.limit}`);

      if (json.data && json.paging) {
        this.setState({ leggi: json.data, paging: json.paging, loading: false });
      }
    }
  }

  pageChanged(newPage) {
    if (this.state.paging.numberOfPages && newPage > 0 && newPage <= this.state.paging.numberOfPages) {
      const limit = this.state.paging.limit;
      const numberOfPages = this.state.paging.numberOfPages;
      const offset = (newPage - 1) * limit;

      this.setState({
        paging: {
          limit, offset, currentPage: newPage, numberOfPages
        },
        loading: true
      }, () => {
        console.log(this.state);
        this.downloadLeggi();
      });
    }
  }

  render() {
    let tableIncarichi = null;
    let testoLegge = 'Proposte di Legge presentate dal Deputato';
    if (this.state.tipo != 'primo_firmatario') {
      testoLegge = 'Proposte di Legge appoggiate dal Deputato';
    }
    if (this.state.leggi && this.state.leggi.length > 0) {
      let table = <tbody><tr><td colSpan="3" ><LoadingIndicator /></td></tr></tbody>;

      if (!this.state.loading) {
        table = (
          <tbody>
            {this.state.leggi.map((value) => (
              <tr key={value.numero}>
                <td className="capitalized-text">{value.numero.toLowerCase()}</td>
                <td className="u-color-50 u-textClean capitalized-text"><Link to={`/leggi/${value.numero}`} >{value.titolo.toLowerCase()}</Link></td>
                <td className="capitalized-text">{value.fase.toLowerCase()}</td>
              </tr>
            ))}
          </tbody>
        );
      }
      tableIncarichi = (
        <div className="entry row u-md-size1of1 u-lg-size1of1 riepilogo-leggi">
          <div className="col col u-text-r-xs u-background-grey-20">
            <h2 className="u-color-white u-background-50 u-text-r-xs u-padding-r-all">{testoLegge}</h2>
            <table className="Table Table--striped Table--hover Table--withBorder">
              <caption className="u-hiddenVisually">{testoLegge}</caption>
              <thead>
                <tr><th>Numero</th><th>Nome</th><th>Fase</th></tr>
              </thead>
              {table}
            </table>
          </div>
          <Pager numOfPages={this.state.paging.numberOfPages} currentPage={this.state.paging.currentPage} onChange={this.pageChanged.bind(this)} />
        </div>
      );
    } else if (this.state.loading) {
      tableIncarichi = <LoadingIndicator />;
    }

    return tableIncarichi;
  }
}

Leggi.propTypes = {
  info: PropTypes.object
};


export default Leggi;
