import React from 'react';
import { connect } from 'react-redux';
import Temp from '../components/Temp';
import { setProcessorTemp } from '../actions';

const mapStateToProps = (state) => ({
  CPTemp: state.CPTemp
});

const mapDispatchToProps = (dispatch) => ({
  setProcessorTemp: (temp) => {
      dispatch(setProcessorTemp(temp))
    }
});

const TempContainer = ({ CPTemp, setProcessorTemp })=> {
  return (
    <Temp
      CPTemp={CPTemp}
      setCPTemp={setProcessorTemp}
    />
  )
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TempContainer);