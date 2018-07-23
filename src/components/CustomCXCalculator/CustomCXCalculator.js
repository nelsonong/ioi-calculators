import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { initializeDVRState } from '../../actions/customCXActions';
import CalculatorTopBar from '../CalculatorTopBar';
import { CustomCXFormat, CustomCXResolution, CustomCXFrameRate, CustomCXOutput } from './components';
import cx from 'classnames';
import styles from './CustomCXCalculator.css';

class CustomCXCalculator extends Component {
    constructor(props) {
        super(props);
        props.handleInitialize();
    }

    render = () => (
        <div className={styles.root}>
            <CalculatorTopBar type={'Custom CX'} cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
            <CustomCXFormat cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
            <CustomCXResolution cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
            <CustomCXFrameRate cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
            <CustomCXOutput cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomCXCalculator);