/* eslint-disable no-extend-native */

function listaToSigla(lista) {
  switch (lista) {
    case 'forza italia': return 'fi';
    case 'partito democratico': return 'pd';
    case 'liberi e uguali': return 'leu';
    case 'lega': return 'lega';
    case "fratelli d'italia": return 'fdi';
    case 'movimento 5 stelle': return 'm5s';
    default: return null;
  }
}

function letteraGenere(genere) {
  return genere === 'FEMALE' ? 'a' : 'o';
}

String.prototype.beautifyName = function () {
  // return this.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => (index === 0 ? letter.toUpperCase() : letter.toLowerCase()));
  return this.toLowerCase();
};

module.exports = {
  listaToSigla, letteraGenere
};

