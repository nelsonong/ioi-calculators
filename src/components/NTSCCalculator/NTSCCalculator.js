import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { initializeDVRState } from '../../actions/ntscActions';
import CalculatorTopBar from '../CalculatorTopBar';
import { NTSCInput, NTSCFormat, NTSCColor, NTSCOptions, NTSCOutput } from './components';
import styles from './NTSCCalculator.css';

class NTSCCalculator extends Component {
    constructor(props) {
        super(props);
        props.handleInitialize();
    }

    render = () => (
        <div className={styles.root}>
            <CalculatorTopBar type={'NTSC'} cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
            <NTSCInput cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
            <NTSCFormat cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
            <NTSCColor cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
            <NTSCOptions cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
            <NTSCOutput cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        </div>
    );
}

const mapStateToProps = (state, {
    cameraId,
    dvrId,
    mode
}) => ({
    cameraId,
    dvrId,
    mode
});

const mapDispatchToProps = (dispatch, {
    cameraId,
    dvrId,
    mode
}) => ({
    handleInitialize: () => {
        dispatch(initializeDVRState(cameraId, dvrId, mode));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NTSCCalculator);