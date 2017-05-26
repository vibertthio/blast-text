import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import './../css/ControlBoard.css';
import Radio from './Radio';
import TextInput from './TextInput';

/**
 * [changeLogo description]
 */
function changeLogo() {
  fetch('/api/logo/change', {
    method: 'post',
  })
  .then(res => res.json())
  .then(comment => console.log(comment));
}

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
   * [componentDidMount description]
   */
  componentDidMount() {
    fetch('/api')
      .then(res => res.json())
      .then((texts) => {
        console.log(texts);
        this.setState({
          texts,
        });
      })
      .catch(err => console.error(err));
  }

  /**
   * [selectTextEffect description]
   * @param  {[type]} index [description]
   */
  selectTextEffect(index) {
    fetch(`/api/effect/${index}`, {
      method: 'post',
    })
    .then(res => res.json())
    .then(comment => console.log(comment));
    this.setState({ textEffectIndex: index });
  }

  /**
   * [selectBackground description]
   * @param  {[type]} index [description]
   */
  selectBackground(index) {
    fetch(`/api/bg/${index}`, {
      method: 'post',
    })
    .then(res => res.json())
    .then(comment => console.log(comment));
    this.setState({ backgroundIndex: index });
  }

  /**
   * [triggerLogo description]
   */
  triggerLogo() {
    const msg = this.state.showingLogo ? 'close' : 'open';
    fetch(`/api/logo/${msg}`, {
      method: 'post',
    })
    .then(res => res.json())
    .then(comment => console.log(comment));
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
    .then(res => res.json())
    .then(comment => console.log(comment));
  }

  /**
   * [render description]
   * @return {Element} [description]
   */
  render() {
    return (
      <div className="main">
        <div className="banner" />
        <div className="mask" />
        <div className="constainer">
          <div className="col">
            <Radio
              label="Text Effect"
              radioIndex={this.state.textEffectIndex}
              radioNumber={3}
              handleClick={index => this.selectTextEffect(index)}
            />
            <hr className="devider" />
            <Radio
              label="Background"
              radioIndex={this.state.backgroundIndex}
              radioNumber={3}
              handleClick={index => this.selectBackground(index)}
            />
            <hr className="devider" />
            <p className="logo-label">Logo</p>
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
              onTouchTap={() => changeLogo()}
            />
          </div>
          <div className="col">


            {this.state.texts.map((text, index) => (
              <TextInput
                key={index.toString()}
                text={text}
                handleEditText={t => this.handleEditText(index, t)}
                handleSend={() => this.handleSendText(index)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}


export default ControlBoard;
