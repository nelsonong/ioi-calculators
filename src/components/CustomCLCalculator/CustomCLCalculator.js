import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializeDVRState } from '../../actions/customCLActions';
import CalculatorTopBar from '../CalculatorTopBar';
import { CustomCLFormat, CustomCLResolution, CustomCLFrameRate, CustomCLOutput } from './components';
import styles from './CustomCLCalculator.css';

class CustomCLCalculator extends Component {
    constructor(props) {
        super(props);
        props.handleInitialize();
    }

    render = () => (
        <div className={styles.root}>
            <CalculatorTopBar type={'Custom CL'} cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
            <CustomCLFormat cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
            <CustomCLResolution cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
            <CustomCLFrameRate cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
            <CustomCLOutput cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
        </div>
    );
}

const mapStateToProps = (state, {
    cameraId,
    dvrId
}) => ({
    cameraId,
    dvrId
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomCLCalculator);