import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializeState } from '../../actions/dvrActions';
import CalculatorTopBar from '../CalculatorTopBar';

import {
  DVRCameras,
  DVRDrives,
  DVRModelConfiguration,
  DVRRecordingTime,
} from './components';

import styles from './DVRCalculator.css';

class DVRCalculator extends Component {
  constructor(props) {
    super(props);
    this.props.handleInitialize();
  }

  render = () => (
    <div className={styles.root}>
      <CalculatorTopBar type={'DVR Storage'} dvrId={this.props.dvrId} storage={true} />
      <DVRModelConfiguration dvrId={this.props.dvrId} />
      <DVRCameras dvrId={this.props.dvrId} />
      <DVRDrives dvrId={this.props.dvrId} />
      <DVRRecordingTime dvrId={this.props.dvrId} />
    </div>
  );
}

const mapDispatchToProps = (dispatch, { dvrId }) => ({
  dvrId,
  handleInitialize: () => dispatch(initializeState(dvrId)),
});

export default connect(null, mapDispatchToProps)(DVRCalculator);
