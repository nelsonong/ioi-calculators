import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { initializeState } from '../../actions/core2Actions';
import CalculatorTopBar from '../CalculatorTopBar';

import {
  Core2Cameras,
  Core2ModelConfiguration,
  Core2Output,
} from './components';

import styles from './Core2Calculator.css';

class Core2Calculator extends Component {
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
        <CalculatorTopBar type={'Core 2'} dvrId={this.props.dvrId} storage={true} expanded={true} />
        <Core2ModelConfiguration dvrId={this.props.dvrId} />
        <Core2Cameras dvrId={this.props.dvrId} />
        <Core2Output dvrId={this.props.dvrId} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { dvrId }) => ({
  dvrId,
  handleInitialize: () => dispatch(initializeState(dvrId)),
});

export default connect(null, mapDispatchToProps)(Core2Calculator);
