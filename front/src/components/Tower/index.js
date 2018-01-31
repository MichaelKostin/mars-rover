import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { throttle } from 'lodash';

const CODE_B = 66;
const CODE_FORWARD = 87;
const CODE_LEFT = 65;
const CODE_RIGHT = 68;
const CODE_BACK = 83;
const CODE_STOP = 32;

class Tower extends Component {
  constructor(props) {
    super(props);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.throttledMouseMove = throttle(this.onMouseMove, 10);
    this.setTowerPosition = throttle(this.props.setTowerPosition, 30);

    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      pressedKeys: []
    }
  }

  componentDidMount() {
    window.addEventListener('mousemove',  this.throttledMouseMove);
    window.addEventListener('keydown', this.keyDown);
    window.addEventListener('keyup', this.keyUp);
  }

  onMouseMove(event) {
    if (!this.props.towerEnabled) {
      return;
    }

    const towerX = Math.floor(event.clientX * 10 / this.state.windowWidth * 18);
    const towerY = Math.floor(event.clientY * 10 / this.state.windowHeight * 18);

    if (towerX !== this.props.towerX || towerY !== this.props.towerY) {
      this.props.setTowerPosition(towerX, towerY);
    }
  }

  keyDown(event) {
    switch (event.keyCode) {
      case CODE_B:
        this.props.toggleTowerControl(!this.props.towerEnabled);
        break;
      case CODE_FORWARD:
        this.props.changeMotors(150, 150);
        break;
      case CODE_BACK:
        this.props.changeMotors(-150, -150);
        break;
      case CODE_LEFT:
        this.props.changeMotors(50, -50);
        break;
      case CODE_RIGHT:
        this.props.changeMotors(-50, 50);
        break;
      case CODE_STOP:
        this.props.changeMotors(0, 0);
        break;
      default:
        return;
    }

    //this.setState({ pressedKeys: this.state.pressedKeys.push(event.keyCode)});
  }

  keyUp(event) {
    //this.setState({ pressedKeys: this.state.pressedKeys.filter(item => item !== event.keyCode)});
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.throttledMouseMove);
    window.removeEventListener('keydown', this.keyDown);
    window.removeEventListener('keyup', this.keyUp);
  }

  render() {
    return (
      <div className="temp">
        <p>towerX: <strong>{this.props.towerX} &deg;</strong></p>
        <p>towerY: <strong>{this.props.towerY} &deg;</strong></p>
        {
          this.props.towerEnabled ?
            (<p style={{color: 'green'}}>Mouse control enabled</p>) :
            (<div><p style={{color: 'red'}}>Mouse control disabled</p><span>Press 'B' to enable</span></div>)
        }
      </div>
    );
  }
}

Tower.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  towerEnabled: PropTypes.bool,
  setTowerPosition: PropTypes.func,
  toggleTowerControl: PropTypes.func,
  changeMotors: PropTypes.func
};

export default Tower;