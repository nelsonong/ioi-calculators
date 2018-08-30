import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { initializeDVRState } from '../../actions/victoremCXActions';
import CalculatorTopBar from '../CalculatorTopBar';
import {
  VictoremCXModel,
  VictoremCXFormat,
  VictoremCXResolution,
  VictoremCXOptions,
  VictoremCXOutput,
} from './components';
import styles from './VictoremCXCalculator.css';

class VictoremCXCalculator extends Component {
  constructor(props) {
    super(props);
    props.handleInitialize();
  }

  render = () => {
    const root = cx(styles.root, { [styles.draggable]: !this.props.mode });
    return (
      <div className={root}>
        <CalculatorTopBar
          type={'Victorem CX'}
          cameraId={this.props.cameraId}
          dvrId={this.props.dvrId}
          expanded={true}
        />
        <VictoremCXModel cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <VictoremCXFormat cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <VictoremCXResolution cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <VictoremCXOptions cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        <VictoremCXOutput cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
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

export default connect(null, mapDispatchToProps)(VictoremCXCalculator);
