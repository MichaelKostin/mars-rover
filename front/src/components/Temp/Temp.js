import React from 'react';
import { number, func } from 'prop-types';

const Temp = ({ CPTemp, setCPTemp})=> (
  <div className="temp">
   <p>CP temp: <strong>{CPTemp}</strong> C</p>
  </div>
);

Temp.propTypes = {
  CPTemp: number,
  setCPTemp: func
};

export default Temp;