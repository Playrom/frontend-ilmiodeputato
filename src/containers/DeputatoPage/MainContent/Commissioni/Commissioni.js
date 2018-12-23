import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { getApi } from '../../../../api-connect';

import './style.scss';

class Commissioni extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps;
  }

  constructor(props) {
    super(props);
    this.state = { incarichi: [], loading: true, deputato_id: props.info.deputato_id };
  }

  componentDidMount() {
    this.downloadCommissioni();
  }

  async downloadCommissioni() {
    if (this.state.deputato_id) {
      const json = await getApi(`/deputati/${this.state.deputato_id}/commissioni`);
      this.setState({ incarichi: json, loading: false });
    }
  }

  render() {
    let tableIncarichi = null;

    if (this.state.incarichi && this.state.incarichi.length > 0) {
      tableIncarichi = (
        <div className="entry row u-md-size1of1 u-lg-size1of1 riepilogo-commissioni">
          <div className="col u-text-r-xs u-background-grey-20">
            <h2 className="u-color-white u-background-50 u-text-r-xs u-padding-r-all ">Commissioni di cui fa parte il deputato</h2>
            <table className="Table Table--striped Table--hover Table--withBorder">
              <caption className="u-hiddenVisually">Commissioni di cui fa parte il deputato</caption>
              <tbody>
                {this.state.incarichi.map((value) => (
                  <tr key={value.nome}>
                    <td><h2 className="u-color-50 u-textClean capitalized-text">{value.nome.toLowerCase()}</h2></td>
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

Commissioni.propTypes = {
  info: PropTypes.object
};


export default Commissioni;
