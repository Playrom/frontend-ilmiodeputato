/**
 *
 * Button.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React from 'react';
import PropTypes from 'prop-types';

const Pager = (props) => {
  let prevDots = null;
  let nextDots = null;
  let prevPage = null;
  let nextPage = null;
  let startPage = null;
  let endPage = null;

  console.log(props);

  if (props.currentPage > 3) {
    prevDots = (
      <li className="Grid-cell u-textCenter u-hidden u-md-inlineBlock u-lg-inlineBlock" aria-hidden="true">
        <span className="u-padding-r-all u-block u-color-50">
          <span className="u-text-r-m">...</span>
        </span>
      </li>
    );
  }

  if (props.currentPage > 2) {
    prevPage = (
      <li className="Grid-cell u-textCenter u-hidden u-md-inlineBlock u-lg-inlineBlock">
        <div aria-label={`Pagina ${props.currentPage - 1}`} className="u-padding-r-all u-color-50 u-textClean u-block" onClick={(e) => props.onChange(props.currentPage - 1)} >
          <span className="u-text-r-s">{props.currentPage - 1}</span>
        </div>
      </li>
    );
  }

  if (props.currentPage < (props.numOfPages - 2)) {
    nextDots = (
      <li className="Grid-cell u-textCenter u-hidden u-md-inlineBlock u-lg-inlineBlock" aria-hidden="true">
        <span className="u-padding-r-all u-block u-color-50">
          <span className="u-text-r-m">...</span>
        </span>
      </li>
    );
  }
  if (props.currentPage < (props.numOfPages - 1)) {
    nextPage = (
      <li className="Grid-cell u-textCenter u-hidden u-md-inlineBlock u-lg-inlineBlock">
        <div aria-label={`Pagina ${props.currentPage + 1}`} className="u-padding-r-all u-color-50 u-textClean u-block" onClick={(e) => props.onChange(props.currentPage + 1)}>
          <span className="u-text-r-s">{props.currentPage + 1}</span>
        </div>
      </li>
    );
  }

  if (props.currentPage !== 1 && props.numOfPages > 1) {
    startPage = (
      <li className="Grid-cell u-textCenter u-hidden u-md-inlineBlock u-lg-inlineBlock">
        <div aria-label="Pagina 1" className="u-padding-r-all u-color-50 u-textClean u-block" onClick={(e) => props.onChange(1)}>
          <span className="u-text-r-s">1</span>
        </div>
      </li>
    );
  }

  if (props.currentPage !== props.numOfPages && props.numOfPages > 2) {
    endPage = (
      <li className="Grid-cell u-textCenter u-hidden u-md-inlineBlock u-lg-inlineBlock">
        <div aria-label={`Pagina ${props.numOfPages}`} className="u-padding-r-all u-color-50 u-textClean u-block" onClick={(e) => props.onChange(props.numOfPages)}>
          <span className="u-text-r-s">{props.numOfPages}</span>
        </div>
      </li>
    );
  }

  return (
    <nav role="navigation" aria-label="Navigazione paginata" className="u-layout-prose">
      <ul className="Grid Grid--fit Grid--alignMiddle u-text-r-xxs">
        <li className="Grid-cell u-textCenter">
          <div className="u-padding-r-all u-color-50 u-textClean u-block" onClick={(e) => props.onChange(props.currentPage - 1)}>
            <span className="Icon-chevron-left u-text-r-s" role="presentation"></span>
            <span className="u-hiddenVisually">Pagina precedente</span>
          </div>
        </li>

        {startPage}

        {prevDots}

        {prevPage}

        <li className="Grid-cell u-textCenter u-hidden u-md-inlineBlock u-lg-inlineBlock">
          <div aria-label={`Pagina ${props.currentPage}`} className="u-padding-r-all u-background-50 u-color-white u-textClean u-block">
            <span className="u-text-r-s">{props.currentPage}</span>
          </div>
        </li>

        {nextPage}

        {nextDots}

        {endPage}

        <li className="Grid-cell u-textCenter">
          <div className="u-padding-r-all u-color-50 u-textClean u-block" onClick={(e) => props.onChange(props.currentPage + 1)}>
            <span className="Icon-chevron-right u-text-r-s" role="presentation"></span>
            <span className="u-hiddenVisually">Pagina successiva</span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

Pager.propTypes = {
  numOfPages: PropTypes.number,
  currentPage: PropTypes.number,
  onChange: PropTypes.func
};

export default Pager;
