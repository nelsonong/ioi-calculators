import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializeDVRState } from '../../actions/gevActions';
import CalculatorTopBar from '../CalculatorTopBar';
import {
  GEVFormat,
  GEVResolution,
  GEVFrameRate,
  GEVOutput,
} from './components';
import styles from './GEVCalculator.css';

class GEVCalculator extends Component {
  constructor(props) {
    super(props);
    props.handleInitialize();
  }

  render = () => (
    <div className={styles.root}>
      <CalculatorTopBar type={'GEV'} cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
      <GEVFormat cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
      <GEVResolution cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
      <GEVFrameRate cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
      <GEVOutput cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
    </div>
  );
}

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
  mode,
}) => ({
  cameraId,
  dvrId,
  mode,
  handleInitialize: () => {
    dispatch(initializeDVRState(cameraId, dvrId, mode));
  },
});

export default connect(null, mapDispatchToProps)(GEVCalculator);
