import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { initializeDVRState } from '../../actions/flareSDIActions';
import CalculatorTopBar from '../CalculatorTopBar';
import {
  FlareSDIModel,
  FlareSDIInterface,
  FlareSDIColor,
  FlareSDIResolution,
  FlareSDIFrameRate,
  FlareSDIOutput,
} from './components';
import styles from './FlareSDICalculator.css';

class FlareSDICalculator extends Component {
  constructor(props) {
    super(props);
    props.handleInitialize();
  }

  render = () => {
    const root = cx(styles.root, { [styles.draggable]: !this.props.mode });
    return (
      <div className={root}>
        <CalculatorTopBar type={'Flare SDI'} cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <FlareSDIModel cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <FlareSDIInterface cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <FlareSDIResolution cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <FlareSDIColor cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <FlareSDIFrameRate cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <FlareSDIOutput cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
      </div>
    );
  }
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

export default connect(null, mapDispatchToProps)(FlareSDICalculator);
