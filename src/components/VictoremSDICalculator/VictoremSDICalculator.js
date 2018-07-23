import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { initializeDVRState } from '../../actions/victoremSDIActions';
import CalculatorTopBar from '../CalculatorTopBar';
import { VictoremSDIModel, VictoremSDIInterface, VictoremSDIColor, VictoremSDIResolution, VictoremSDIFrameRate, VictoremSDIOutput } from './components';
import styles from './VictoremSDICalculator.css';

class VictoremSDICalculator extends Component {
    constructor(props) {
        super(props);
        props.handleInitialize();
    }

    render = () => (
        <div className={styles.root}>
            <CalculatorTopBar type={'Victorem SDI'} cameraId={this.props.cameraId} />
            <VictoremSDIModel cameraId={this.props.cameraId} />
            <VictoremSDIInterface cameraId={this.props.cameraId} />
            <VictoremSDIResolution cameraId={this.props.cameraId} />
            <VictoremSDIColor cameraId={this.props.cameraId} />
            <VictoremSDIFrameRate cameraId={this.props.cameraId} />
            <VictoremSDIOutput cameraId={this.props.cameraId} />
        </div>
    );
}

const mapDispatchToProps = (dispatch, {
    cameraId,
    mode
}) => ({
    handleInitialize: () => {
        dispatch(initializeDVRState(cameraId, mode));
    }
});

export default connect(null, mapDispatchToProps)(VictoremSDICalculator);