import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { connect } from 'react-redux';
import { toggleTowerControl, setTowerPosition, changeMotors, changeDirection } from '../../actions';

import './style.css';

const CODE_B = 66;
const CODE_FORWARD = 87;
const CODE_LEFT = 65;
const CODE_RIGHT = 68;
const CODE_BACK = 83;
const CODE_STOP = 32;
const CODE_SHIFT = 16;
const DIR_LEFT = 1;
const DIR_RIGHT = 2;
const DIR_STRAIGHT = 0;

class Tower extends Component {
  constructor(props) {
    super(props);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.throttledMouseMove = throttle(this.onMouseMove, 10);
    this.setTowerPosition = throttle(this.props.setTowerPosition, 30);
    this.updateMotorsButtons = this.updateMotorsButtons.bind(this);
    this.updateMotor = this.updateMotor.bind(this);
    this.updateDirection = this.updateDirection.bind(this);

    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };

    this.motorButtons = {};
    this.motor = {
      left: 0,
      right: 0,
      shift: false,
      direction: DIR_STRAIGHT
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
    if (event.keyCode === CODE_B) {
      this.props.toggleTowerControl(!this.props.towerEnabled);
      return;
    }

    this.updateMotorsButtons(event.keyCode, true);
    this.updateMotor();
    this.updateDirection();
  }

  keyUp(event) {
    this.updateMotorsButtons(event.keyCode, false);
    this.updateMotor();
    this.updateDirection();
  }

  updateDirection() {
    let newDirection = null;

    if (this.motorButtons[CODE_LEFT]) {
      newDirection = DIR_LEFT;
    } else if (this.motorButtons[CODE_RIGHT]) {
      newDirection = DIR_RIGHT;
    } else if (this.motor.direction !== DIR_STRAIGHT) {
      newDirection = DIR_STRAIGHT;
    }

    if (newDirection !== null && newDirection !== this.motor.direction) {
      this.motor.direction = newDirection;
      this.props.changeDirection(this.motor.direction);
    }
  }

  updateMotorsButtons(keyCode, status) {

    switch (keyCode) {
      case CODE_FORWARD:
        this.motorButtons[CODE_FORWARD] = status;
        break;
      case CODE_BACK:
        this.motorButtons[CODE_BACK] = status;
        break;
      case CODE_LEFT:
        this.motorButtons[CODE_LEFT] = status;
        break;
      case CODE_RIGHT:
        this.motorButtons[CODE_RIGHT] = status;
        break;
      case CODE_SHIFT:
        this.motorButtons[CODE_SHIFT] = status;
        break;
      case CODE_STOP:
        this.motorButtons[CODE_STOP] = status;
        break;
      default:
        return;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.throttledMouseMove);
    window.removeEventListener('keydown', this.keyDown);
    window.removeEventListener('keyup', this.keyUp);
  }

  updateMotor() {
    let newValue = null;
    if (this.motorButtons[CODE_FORWARD]) {
       newValue = this.motorButtons[CODE_SHIFT] ? 255 : 150;
    } else if (this.motorButtons[CODE_BACK]) {
       newValue = this.motorButtons[CODE_SHIFT] ? -255 : -150;
    } else {
       newValue = 0;
    }

    if (newValue !== null && newValue !== this.motor.left && newValue !== this.motor.right) {
      this.motor.left = this.motor.right = newValue;
      this.props.changeMotors(this.motor.left, this.motor.right);
    }
  }

  render() {
    return (
      <div className="temp">
        <div>distance: {this.props.distance} sm</div>
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
  distance: PropTypes.number,
  changeMotors: PropTypes.func,
  changeDirection: PropTypes.func
};

const mapStateToProps = (state) => ({
  towerX: state.towerX,
  towerY: state.towerY,
  towerEnabled: state.towerEnabled,
  distance: state.distance
});

const mapDispatchToProps = (dispatch) => ({
  toggleTowerControl: (enabled) => dispatch(toggleTowerControl(enabled)),
  setTowerPosition: (x, y) => dispatch(setTowerPosition(x, y)),
  changeMotors: (left, right) => dispatch(changeMotors(left, right)),
  changeDirection: (dir) => dispatch(changeDirection(dir))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tower);