import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * [TextInput description]
 * @param {[type]} props [description]
 * @return {element}
 */
function TextInput(props) {
  return (
    <div className="text-input-block">
      <TextField
        onChange={e => props.handleEditText(e.target.value)}
        className="text-input"
        hintText="input here"
        floatingLabelText="text"
        value={props.text}
        rows={1}
      /><br />
      <RaisedButton
        className="send-btn"
        label="Send"
        primary
        onTouchTap={() => props.handleSend()}
      />
    </div>
  );
}


TextInput.propTypes = {
  text: PropTypes.string,
  handleEditText: PropTypes.func.isRequired,
  handleSend: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
  text: '',
};

export default TextInput;
