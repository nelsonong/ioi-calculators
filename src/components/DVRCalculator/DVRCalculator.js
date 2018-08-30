import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
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
    this.state = { windowWidth: window.innerWidth };
  }

  handleResize = () => this.setState({ windowWidth: window.innerWidth });

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render = () => {
    const root = cx(styles.root, { [styles.scale]: this.state.windowWidth < 520 });
    return (
      <div className={root}>
        <CalculatorTopBar type={'DVR Storage'} dvrId={this.props.dvrId} storage={true} expanded={true} />
        <DVRModelConfiguration dvrId={this.props.dvrId} />
        <DVRCameras dvrId={this.props.dvrId} />
        <DVRDrives dvrId={this.props.dvrId} />
        <DVRRecordingTime dvrId={this.props.dvrId} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { dvrId }) => ({
  dvrId,
  handleInitialize: () => dispatch(initializeState(dvrId)),
});

export default connect(null, mapDispatchToProps)(DVRCalculator);
