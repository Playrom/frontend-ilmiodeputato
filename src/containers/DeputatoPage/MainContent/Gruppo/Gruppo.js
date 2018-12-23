import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { getApi } from '../../../../api-connect';

import './style.scss';

const images = require.context('../../../../images', true);

class Gruppo extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps;
  }

  constructor(props) {
    super(props);
    this.state = { incarichi: [], loading: true, deputato_id: props.info.deputato_id };
  }

  componentDidMount() {
    this.downloadIncarichi();
  }

  async downloadIncarichi() {
    if (this.state.deputato_id) {
      const json = await getApi(`/deputati/${this.state.deputato_id}/incarichi`);
      this.setState({ incarichi: json, loading: false });
    }
  }

  render() {
    let image = null;
    let componente = null;

    if (this.props.info.sigla_gruppo) {
      if (this.props.info.sigla_gruppo !== 'MISTO') {
        const logo = images(`./${this.props.info.sigla_gruppo.toLowerCase()}.png`);
        image = <img src={logo} alt={this.props.info.sigla_gruppo} />;
      } else if (this.props.info.sigla_gruppo === 'MISTO') {
        image = null;
        componente = <small>{`Componente: ${this.props.info.sigla_componente}`}</small>;
      } else {
        image = <p>{'Non Iscritto'}</p>;
      }
    } else {
      image = null;
    }

    let tableIncarichi = null;

    if (this.state.incarichi && this.state.incarichi.length > 0) {
      tableIncarichi = (
        <div className="col u-text-r-xs u-background-grey-20">
          <h2 className="u-color-white u-background-50 u-text-r-xs u-padding-r-all">Ruoli del deputato dentro il gruppo</h2>
          <table className="Table Table--striped Table--hover Table--withBorder">
            <caption className="u-hiddenVisually">Ruoli del deputato dentro il gruppo</caption>
            <tbody>
              {this.state.incarichi.map((value) => (
                <tr key={value.incarico}>
                  <td><h2 className="u-color-50 capitalized-text">{value.incarico.toLowerCase()}</h2></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (this.state.loading) {
      tableIncarichi = <LoadingIndicator />;
    }

    return (
      <div className="entry row u-md-size1of1 u-lg-size1of1 riepilogo-gruppo">
        <div className="riepilogo-gruppo-content">

          <div className="col">
            <div className="row u-text-r-xs u-padding-r-all">
              <div className="col">
                <h2 className="left u-color-90">Gruppo parlamentare a cui appartiene il deputato</h2>
                <div className="deputato-nome-simbolo">
                  <div className="lista-simbolo">
                    {image}
                  </div>
                  <h2 className="left u-color-50 u-textClean capitalized-text">{this.props.info.nome_gruppo} {componente}</h2>
                </div>
              </div>
            </div>

            {tableIncarichi}
          </div>
        </div>

      </div>
    );
  }
}

Gruppo.propTypes = {
  info: PropTypes.object
};


export default Gruppo;
