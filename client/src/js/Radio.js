import React from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';


/**
 * [Radial description]
 * @param {[type]} props [description]
 * @return {Element}
 */
function Radio(props) {
  const list = Array(props.radioNumber).fill().map((x, i) => i);

  return (
    <div className="radial">
      <p className="radial-label">{props.label}</p>
      <RadioButtonGroup
        className="radio-list"
        name="Text Effect"
        defaultSelected={props.radioIndex}
        value={props.radioIndex}
      >
        {list.map(i =>
          (<RadioButton
            className="radio-btn"
            key={i.toString()}
            value={i}
            onTouchTap={() => props.handleClick(i)}
          />),
        )}
      </RadioButtonGroup>
    </div>
  );
}

Radio.propTypes = {
  label: PropTypes.string,
  radioNumber: PropTypes.number.isRequired,
  radioIndex: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

Radio.defaultProps = {
  label: 'new Radial',
};

export default Radio;
