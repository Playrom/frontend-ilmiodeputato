import React from 'react';
import PropTypes from 'prop-types';
import Pager from '../../../../components/Pager';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { getApi } from '../../../../api-connect';

import './style.scss';

class Votazioni extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps;
  }

  constructor(props) {
    super(props);
    this.state = {
      votazioni: [], paging: { offset: 0, limit: 5 }, loading: true, numeroLegge: props.info.numero
    };
  }

  componentDidMount() {
    this.downloadVotazioni();
  }

  async downloadVotazioni() {
    if (this.state.numeroLegge) {
      const json = await getApi(`/leggi/${this.state.numeroLegge}/votazioni?offset=${this.state.paging.offset}&limit=${this.state.paging.limit}`);

      if (json.data && json.paging) {
        this.setState({ votazioni: json.data, paging: json.paging, loading: false });
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
        this.downloadVotazioni();
      });
    }
  }

  render() {
    let tableVotazioni = null;
    const titoloTabella = `Votazioni inerenti al DDL numero ${this.state.numeroLegge}`;

    if (this.state.votazioni && this.state.votazioni.length > 0) {
      let table = <tbody><tr><td colSpan="3" ><LoadingIndicator /></td></tr></tbody>;

      if (!this.state.loading) {
        table = (
          <tbody>
            {this.state.votazioni.map((value) => (
              <tr key={value.id}>
                <td className="capitalized-text">{value.id}</td>
                <td className="u-color-50 u-textClean capitalized-text">{value.titolo.toLowerCase()}</td>
                <td className={`capitalized-text ${value.approvato ? 'u-color-ok' : 'u-color-danger'}`}>{value.approvato ? 'Approvato' : 'Respinto'}</td>
              </tr>
            ))}
          </tbody>
        );
      }
      tableVotazioni = (
        <div className="entry row u-md-size1of1 u-lg-size1of1 riepilogo-votazioni">
          <div className="col col u-text-r-xs u-background-grey-20">
            <h2 className="u-color-white u-background-50 u-text-r-xs u-padding-r-all">{titoloTabella}</h2>
            <table className="Table Table--striped Table--hover Table--withBorder">
              <caption className="u-hiddenVisually">{tableVotazioni}</caption>
              <thead>
                <tr><th>Numero</th><th>Nome</th><th>Risultato</th></tr>
              </thead>
              {table}
            </table>
          </div>
          <Pager numOfPages={this.state.paging.numberOfPages} currentPage={this.state.paging.currentPage} onChange={this.pageChanged.bind(this)} />
        </div>
      );
    } else if (this.state.loading) {
      tableVotazioni = <LoadingIndicator />;
    }

    return tableVotazioni;
  }
}

Votazioni.propTypes = {
  info: PropTypes.object
};


export default Votazioni;
