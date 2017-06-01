import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import RaisedButton from 'material-ui/RaisedButton';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import { SketchPicker } from 'react-color';

import './../css/ControlBoard.css';
import Radio from './Radio';
import TextInput from './TextInput';

/**
* [log description]
* @param  {[type]} value [description]
*/
function log(value) {
  console.log(value); //eslint-disable-line
}

/**
 * [changeLogo description]
 */
function changeLogo() {
  fetch('/api/logo/change', {
    method: 'post',
  })
  .then(res => res.json())
  .then(log);
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
      autoPlay: false,
      autoPlaySpeed: 0,
      textColor: { r: 0, g: 0, b: 0, a: 1 },
      textSize: 100,
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
      .catch(log);
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
    .then(log);
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
    .then(log);
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
    .then(log);
    this.setState({ showingLogo: !this.state.showingLogo });
  }

  /**
   * [triggerAutoPlay description]
   */
  triggerAutoPlay() {
    const msg = this.state.autoPlay ? 'close' : 'open';
    fetch(`/api/auto/${msg}`, {
      method: 'post',
    })
    .then(res => res.json())
    .then(log);
    this.setState({ autoPlay: !this.state.autoPlay });
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
    .then(log);
  }

  /**
   * [handleChangeSpeed description]
   * @param  {[type]} value [description]
   */
  handleChangeSpeed(value) {
    fetch(`/api/auto/speed/${value}`, {
      method: 'post',
    })
    .then(res => res.json())
    .then(log);
    this.setState({ autoPlaySpeed: value });
  }

  /**
   * [handleChangeTextSize description]
   * @param  {[type]} value [description]
   */
  handleChangeTextSize(value) {
    fetch(`/api/size/${value}`, {
      method: 'post',
    })
    .then(res => res.json())
    .then(log);
    this.setState({ textSize: value });
  }

  /**
   * [handleChangeColor description]
   * @param  {[type]} color [description]
   */
  handleChangeColor(color) {
    const rgb = color.rgb;
    fetch('/api/color', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rgb,
      }),
    })
    .then(res => res.json())
    .then(log);

    // this.setState({
    //   textColor: rgb,
    // });
  }


  /**
   * [render description]
   * @return {Element} [description]
   */
  render() {
    return (
      <div className="main">
        <div className="banner" />
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

            {/* LOGO */}
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
            <hr className="devider" />

            {/* Auto Play */}
            <p className="logo-label">Auto Play</p>
            <Toggle
              toggled={this.state.autoPlay}
              onToggle={() => this.triggerAutoPlay()}
            />
            <p>speed of auto play</p>
            <Slider
              max={1000}
              onChange={v => this.handleChangeSpeed(v)}
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

          <div className="col color-board">
            <p className="logo-label">Text Color</p>
            <SketchPicker
              className="sketch-picker"
              onChange={this.handleChangeColor}
            />
            <hr className="devider" />
            <p className="logo-label">Text Size</p>
            <Slider
              max={1000}
              defaultValue={this.state.textSize}
              onChange={v => this.handleChangeTextSize(v)}
            />
          </div>

        </div>

      </div>
    );
  }
}


export default ControlBoard;
