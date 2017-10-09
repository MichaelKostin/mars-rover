import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { throttle } from 'lodash';

const CODE_B = 66;

class Tower extends Component {
  constructor(props) {
    super(props);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.throttledMouseMove = throttle(this.onMouseMove, 20);
    this.setTowerPosition = throttle(this.props.setTowerPosition, 30);

    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    }
  }

  componentDidMount() {
    window.addEventListener('mousemove',  this.throttledMouseMove);
    window.addEventListener('keydown', this.keyDown);
  }

  onMouseMove(event) {
    if (!this.props.towerEnabled) {
      return;
    }

    const towerX = Math.floor(event.clientX * 10 / this.state.windowWidth * 18);
    const towerY = Math.floor(event.clientY * 10 / this.state.windowHeight * 18);

    if (towerX !== this.props.towerX || towerY !== this.props.towerY) {
      this.setTowerPosition(towerX, towerY);
    }
  }

  keyDown(event) {
    if (event.keyCode === CODE_B) {
      this.props.toggleTowerControl(!this.props.towerEnabled);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.throttledMouseMove);
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
  toggleTowerControl: PropTypes.func
};

export default Tower;