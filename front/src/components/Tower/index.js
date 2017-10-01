import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

const CODE_B = 66;

class Tower extends Component {
  constructor(props) {
    super(props);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.keyDown = this.keyDown.bind(this);

    this.state = {
      clientX: 0,
      clientY: 0,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    }
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('keydown', this.keyDown);
  }

  onMouseMove(event) {
    this.setState({
      clientX: event.clientX,
      clientY: event.clientY
    });

    const towerX = Math.floor(event.clientX * 10 / this.state.windowWidth * 18);
    const towerY = Math.floor(event.clientY * 10 / this.state.windowHeight * 18);

    if (towerX !== this.props.towerX && this.props.towerEnabled) {
      this.props.setTowerX(towerX);
    }

    if (towerY !== this.props.towerY && this.props.towerEnabled) {
      this.props.setTowerY(towerY);
    }
  }

  keyDown(event) {
    console.log(event);
    if (event.keyCode === CODE_B) {
      this.props.toggleTowerControl(!this.props.towerEnabled);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove);
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
  setTowerX: PropTypes.func,
  setTowerY: PropTypes.func
};

export default Tower;