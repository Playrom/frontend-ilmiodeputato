import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import LoadingIndicator from '../../../../components/LoadingIndicator';

import { getApi } from '../../../../api-connect';

class Organi extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps;
  }

  constructor(props) {
    super(props);
    this.state = { incarichi: [], loading: true, deputato_id: props.info.deputato_id };
  }

  componentDidMount() {
    this.downloadOrgani();
  }

  async downloadOrgani() {
    if (this.state.deputato_id) {
      const json = await getApi(`/deputati/${this.state.deputato_id}/organi`);
      this.setState({ incarichi: json, loading: false });
    }
  }

  render() {
    let tableIncarichi = null;

    if (this.state.incarichi && this.state.incarichi.length > 0) {
      tableIncarichi = (
        <div className="entry row u-md-size1of1 u-lg-size1of1 riepilogo-organi">
          <div className="col u-text-r-xs u-background-grey-20">
            <h2 className="u-color-white u-background-50 u-text-r-xs u-padding-r-all">Cariche del deputato</h2>
            <table className="Table Table--striped Table--hover Table--withBorder">
              <caption className="u-hiddenVisually">Cariche del deputato</caption>
              <tbody>
                {this.state.incarichi.map((value) => (
                  <tr key={value.nome}>
                    <td><h2 className="u-color-50 capitalized-text">{value.nome.toLowerCase()}</h2>   <small className="capitalized-text">{value.carica.toLowerCase()}</small></td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      );
    } else if (this.state.loading) {
      tableIncarichi = <LoadingIndicator />;
    }

    return tableIncarichi;
  }
}

Organi.propTypes = {
  info: PropTypes.object
};


export default Organi;
