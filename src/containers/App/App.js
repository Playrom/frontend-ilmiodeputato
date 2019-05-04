import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../HomePage';
import CollegioPage from '../CollegioPage';
import DeputatoPage from '../DeputatoPage';
import CercaDeputatoPage from '../CercaDeputatoPage';
// import LeggePage from '../LeggePage';
// import CercaCollegioPage from '../CercaCollegioPage';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.scss';

import './globals'
import 'bootstrap-italia'

const CollegioEsteroPage = (props) => (
  <CollegioPage
    estero
    {...props}
  />
);

const App = () => (
  <div className="app-wrapper u-background-60">
    <Helmet
      titleTemplate="%s - Il Mio Deputato"
      defaultTitle="Il Mio Deputato"
    >
      <meta name="description" content="trova e conosci il tuo deputato" />
    </Helmet>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/cerca-deputato" component={CercaDeputatoPage} />
      {/* <Route path="/cerca-collegio" component={CercaCollegioPage} /> */}
      {/* <Route path="/collegi/estero-:stato" component={CollegioEsteroPage} /> */}
      <Route path="/collegi/:id-:uni" component={CollegioPage} />
      <Route path="/deputati/:id" component={DeputatoPage} />
      {/* <Route path="/leggi/:id" component={LeggePage} /> */}
    </Switch>
    <Footer />
  </div>
);


export default App;
