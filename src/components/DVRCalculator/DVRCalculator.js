import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializeState } from '../../actions/dvrActions';
import CalculatorTopBar from '../CalculatorTopBar';
import { DVRCameras, DVRDrives, DVRModelConfiguration, DVRRecordingTime } from './components';
import styles from './DVRCalculator.css';

class DVRCalculator extends Component {
    constructor(props) {
        super(props);
        this.props.handleInitialize();
    }
    
    render = () => (
        <div className={styles.root}>
            <CalculatorTopBar type={'DVR Storage'} id={this.props.id} storage={true} />
            <DVRModelConfiguration id={this.props.id} />
            <DVRCameras id={this.props.id} />
            <DVRDrives id={this.props.id} />
            <DVRRecordingTime id={this.props.id} />
        </div>
    );
}

const mapStateToProps = (state, { id }) => ({
    id
});

const mapDispatchToProps = (dispatch, { id }) => ({
    handleInitialize: () => dispatch(initializeState(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DVRCalculator);