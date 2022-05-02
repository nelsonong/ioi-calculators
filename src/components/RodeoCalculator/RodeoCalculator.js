import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { initializeState } from '../../actions/rodeoActions';
import CalculatorTopBar from '../CalculatorTopBar';

import {
  RodeoCameras,
  RodeoModelConfiguration,
  RodeoOutput,
} from './components';

import styles from './RodeoCalculator.css';

class RodeoCalculator extends Component {
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
        <CalculatorTopBar type={'Rodeo'} dvrId={this.props.dvrId} storage={true} />
        <RodeoModelConfiguration dvrId={this.props.dvrId} />
        <RodeoCameras dvrId={this.props.dvrId} />
        <RodeoOutput dvrId={this.props.dvrId} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { dvrId }) => ({
  dvrId,
  handleInitialize: () => dispatch(initializeState(dvrId)),
});

export default connect(null, mapDispatchToProps)(RodeoCalculator);
