import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import './../css/ControlBoard.css';
import Radio from './Radio';
import TextInput from './TextInput';

// Tap event for mobile
injectTapEventPlugin();

/**
 * [state description]
 * @type {Object}
 */
class ControlBoard extends Component {
  /**
   * [constructor description]
   */
  constructor() {
    super();
    this.state = {
      textEffectIndex: 0,
      backgroundIndex: 0,
      showingLogo: false,
      texts: ['', '', '', '', ''],
    };
  }

  /**
   * [selectTextEffect description]
   * @param  {[type]} index [description]
   */
  selectTextEffect(index) {
    this.setState({ textEffectIndex: index });
  }

  /**
   * [selectBackground description]
   * @param  {[type]} index [description]
   */
  selectBackground(index) {
    this.setState({ backgroundIndex: index });
  }

  /**
   * [triggerLogo description]
   */
  triggerLogo() {
    this.setState({ showingLogo: !this.state.showingLogo });
  }


  /**
   * [handleEditText description]
   * @param  {[type]} id   [description]
   * @param  {[type]} text [description]
   */
  handleEditText(id, text) {
    const texts = this.state.texts;
    texts[id] = text;
    this.setState({
      texts,
    });
  }

  /**
   * [handleSendText description]
   * @param  {int} index [description]
   */
  handleSendText(index) {
    console.log(this.state.texts);
    const texts = this.state.texts;
    fetch(`/api/text/${index}`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        texts,
      }),
    })
    .then(comment => console.log(comment));
  }

  /**
   * [render description]
   * @return {Element} [description]
   */
  render() {
    return (
      <div>
        <Radio
          label="Text Effect"
          radioIndex={this.state.textEffectIndex}
          radioNumber={3}
          handleClick={index => this.selectTextEffect(index)}
        />

        <Radio
          label="Background"
          radioIndex={this.state.backgroundIndex}
          radioNumber={3}
          handleClick={index => this.selectBackground(index)}
        />

        <p>Logo</p>
        <Checkbox
          checkedIcon={<Visibility />}
          uncheckedIcon={<VisibilityOff />}
          checked={this.state.showingLogo}
          onTouchTap={() => this.triggerLogo()}
        />

        <RaisedButton
          className="logo-btn"
          label="change logo"
          primary
          disabled={!this.state.showingLogo}
        />

        {this.state.texts.map((text, index) => (
          <TextInput
            key={index.toString()}
            text={text}
            handleEditText={t => this.handleEditText(index, t)}
            handleSend={() => this.handleSendText(index)}
          />
        ))}

      </div>
    );
  }
}

export default ControlBoard;
