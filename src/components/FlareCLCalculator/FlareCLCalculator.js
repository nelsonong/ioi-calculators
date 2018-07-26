import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { initializeDVRState } from '../../actions/flareCLActions';
import CalculatorTopBar from '../CalculatorTopBar';
import {
  FlareCLModel,
  FlareCLFormat,
  FlareCLResolution,
  FlareCLOptions,
  FlareCLOutput,
} from './components';
import styles from './FlareCLCalculator.css';

class FlareCLCalculator extends Component {
  constructor(props) {
    super(props);
    props.handleInitialize();
  }

  render = () => {
    const root = cx(styles.root, { [styles.draggable]: !this.props.mode });
    return (
      <div className={root}>
        <CalculatorTopBar type={'Flare CL'} cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <FlareCLModel cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <FlareCLFormat cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <FlareCLResolution cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <FlareCLOptions cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <FlareCLOutput cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
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

export default connect(null, mapDispatchToProps)(FlareCLCalculator);
