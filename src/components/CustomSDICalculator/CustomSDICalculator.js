import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { initializeDVRState } from '../../actions/customSDIActions';
import CalculatorTopBar from '../CalculatorTopBar';
import {
  CustomSDIInterface,
  CustomSDIColor,
  CustomSDIResolution,
  CustomSDIFrameRate,
  CustomSDIOutput,
} from './components';
import styles from './CustomSDICalculator.css';

class CustomSDICalculator extends Component {
  constructor(props) {
    super(props);
    props.handleInitialize();
  }

  render = () => {
    const root = cx(styles.root, { [styles.draggable]: !this.props.mode });
    return (
      <div className={root}>
        <CalculatorTopBar type={'Custom SDI'} cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <CustomSDIInterface cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <CustomSDIResolution cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <CustomSDIColor cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <CustomSDIFrameRate cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <CustomSDIOutput cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
  mode,
  model,
}) => ({
  cameraId,
  dvrId,
  mode,
  handleInitialize: () => dispatch(initializeDVRState(cameraId, mode, model, dvrId)),
});

export default connect(null, mapDispatchToProps)(CustomSDICalculator);
