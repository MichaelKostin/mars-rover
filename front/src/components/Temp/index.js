import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

class Temp extends Component {
  render() {
    return (
      <div className="temp">
       <p>CP temp: <strong>{this.props.CPTemp}</strong> C</p>
        <p>GP temp: <strong>{this.props.GPTemp}</strong> C</p>
      </div>
    );
  }
}

Temp.propTypes = {
  CPTemp: PropTypes.number,
  GPTemp: PropTypes.number,
  setCPTemp: PropTypes.func
};

export default Temp;