import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { initializeDVRState } from '../../actions/redwoodActions';
import CalculatorTopBar from '../CalculatorTopBar';
import {
  RedwoodModel,
  RedwoodFormat,
  RedwoodResolution,
  RedwoodOptions,
  RedwoodOutput,
} from './components';
import styles from './RedwoodCalculator.css';

class RedwoodCalculator extends Component {
  constructor(props) {
    super(props);
    props.handleInitialize();
  }

  render = () => {
    const root = cx(styles.root, { [styles.draggable]: !this.props.mode });
    return (
      <div className={root}>
        <CalculatorTopBar type={'Redwood'} cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <RedwoodModel cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <RedwoodFormat cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <RedwoodResolution cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <RedwoodOptions cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <RedwoodOutput cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
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
    dispatch(initializeDVRState(cameraId, mode, dvrId));
  },
});

export default connect(null, mapDispatchToProps)(RedwoodCalculator);
