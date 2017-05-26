import React from 'react';
import PropTypes from 'prop-types';
import checkSvg from './../imgs/check.svg';
import uncheckSvg from './../imgs/uncheck.svg';

/**
 * [RadialButton description]
 * @param {[type]} props [description]
 * @return {Element}
 */
function RadialButton(props) {
  return (
    <button
      className="btn"
      onClick={() => props.handleClick()}
    >
      <img
        src={props.checked ? checkSvg : uncheckSvg}
        alt="te-2"
      />
    </button>
  );
}

RadialButton.propTypes = {
  checked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default RadialButton;
