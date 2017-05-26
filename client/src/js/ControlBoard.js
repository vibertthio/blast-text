import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import './../css/ControlBoard.css';
import Radial from './Radial';

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
   * [render description]
   * @return {Element} [description]
   */
  render() {
    return (
      <div>

        <Radial
          label="Text Effect"
          radialIndex={this.state.textEffectIndex}
          radialNumber={3}
          handleClick={index => this.selectTextEffect(index)}
        />

        <Radial
          label="Background"
          radialIndex={this.state.backgroundIndex}
          radialNumber={3}
          handleClick={index => this.selectBackground(index)}
        />

        <p>Logo</p>
        <Checkbox
          checkedIcon={<Visibility />}
          uncheckedIcon={<VisibilityOff />}
          checked={this.state.showingLogo}
          onTouchTap={() => this.triggerLogo()}
        />

      </div>
    );
  }
}

export default ControlBoard;
