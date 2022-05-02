import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { initializeVolucamState } from '../../actions/volucamActions';
import CalculatorTopBar from '../CalculatorTopBar';
import {
  VolucamModel,
  VolucamFormat,
  VolucamResolution,
  VolucamFrameRate,
  VolucamOutput,
} from './components';
import styles from './VolucamCalculator.css';

class VolucamCalculator extends Component {
  constructor(props) {
    super(props);
    props.handleInitialize();
  }

  render = () => {
    const root = cx(styles.root, { [styles.draggable]: !this.props.mode });
    return (
      <div className={root}>
        <CalculatorTopBar type={'Volucam'} cameraId={this.props.cameraId} />
        <VolucamModel cameraId={this.props.cameraId} />
        <VolucamFormat cameraId={this.props.cameraId} />
        <VolucamResolution cameraId={this.props.cameraId} />
        <VolucamFrameRate cameraId={this.props.cameraId} />
        <VolucamOutput cameraId={this.props.cameraId} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { cameraId }) => ({
  cameraId,
  handleInitialize: () => {
    dispatch(initializeVolucamState(cameraId));
  },
});

export default connect(null, mapDispatchToProps)(VolucamCalculator);
