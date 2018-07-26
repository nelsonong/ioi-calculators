import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializeDVRState } from '../../actions/victoremSDIActions';
import CalculatorTopBar from '../CalculatorTopBar';
import {
  VictoremSDIModel,
  VictoremSDIInterface,
  VictoremSDIColor,
  VictoremSDIResolution,
  VictoremSDIFrameRate,
  VictoremSDIOutput,
} from './components';
import styles from './VictoremSDICalculator.css';

class VictoremSDICalculator extends Component {
  constructor(props) {
    super(props);
    props.handleInitialize();
  }

  render = () => (
    <div className={styles.root}>
      <CalculatorTopBar type={'Victorem SDI'} cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
      <VictoremSDIModel cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
      <VictoremSDIInterface cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
      <VictoremSDIResolution cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
      <VictoremSDIColor cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
      <VictoremSDIFrameRate cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
      <VictoremSDIOutput cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
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
  handleInitialize: () => dispatch(initializeDVRState(cameraId, mode, dvrId)),
});

export default connect(null, mapDispatchToProps)(VictoremSDICalculator);
