import React from 'react';

import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="it-header-center-wrapper it-small-header">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="it-header-center-content-wrapper">
                <div className="it-brand-wrapper">
                  <a href="/">
                    <svg className="icon">
                      <use xlinkHref="/bootstrap-italia/dist/svg/sprite.svg#it-code-circle"></use>
                    </svg>
                    <div className="it-brand-text">
                      <h2 className="no_toc">Il Mio Deputato</h2>
                      <h3 className="no_toc d-none d-md-block">Trova e conosci i deputati che hai eletto</h3>
                    </div>
                  </a>
                </div>
                <div className="it-right-zone">
                  <div className="it-socials d-none d-md-flex">
                    <span>Seguici su</span>
                    <ul>
                      <li>
                        <a href="https://www.facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                          <svg className="icon">
                            <use xlinkHref="/bootstrap-italia/dist/svg/sprite.svg#it-facebook"></use>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.github.com" aria-label="Github" target="_blank" rel="noopener noreferrer">
                          <svg className="icon">
                            <use xlinkHref="/bootstrap-italia/dist/svg/sprite.svg#it-github"></use>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                          <svg className="icon">
                            <use xlinkHref="/bootstrap-italia/dist/svg/sprite.svg#it-twitter"></use>
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="it-search-wrapper">
                    <span className="d-none d-md-block">Cerca</span>
                    <a className="search-link rounded-icon" aria-label="Cerca" href="https://www.google.it">
                      <svg className="icon">
                        <use xlinkHref="/bootstrap-italia/dist/svg/sprite.svg#it-search"></use>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
