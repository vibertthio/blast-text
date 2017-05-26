import React from 'react';
import PropTypes from 'prop-types';
import RadialButton from './RadialButton';

/**
 * [Radial description]
 * @param {[type]} props [description]
 * @return {Element}
 */
function Radial(props) {
  const list = Array(props.radialNumber).fill().map((x, i) => i);

  return (
    <div className="radial">
      <p className="radial-label">{props.label}</p>
      <ul className="radial-list">
        {list.map(i =>
          (<li key={i.toString()}>
            <RadialButton
              checked={props.radialIndex === i}
              handleClick={() => props.handleClick(i)}
            />
          </li>),
        )}
      </ul>
    </div>
  );
}

Radial.propTypes = {
  label: PropTypes.string,
  radialNumber: PropTypes.number.isRequired,
  radialIndex: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

Radial.defaultProps = {
  label: 'new Radial',
};

export default Radial;
