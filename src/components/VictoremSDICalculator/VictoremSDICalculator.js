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
            <CalculatorTopBar type={'Victorem SDI'} id={this.props.id} />
            <VictoremSDIModel id={this.props.id} />
            <VictoremSDIInterface id={this.props.id} />
            <VictoremSDIResolution id={this.props.id} />
            <VictoremSDIColor id={this.props.id} />
            <VictoremSDIFrameRate id={this.props.id} />
            <VictoremSDIOutput id={this.props.id} />
        </div>
    );
}

const mapDispatchToProps = (dispatch, { id, inDVR, mode }) => ({
    handleInitialize: () => {
        dispatch(initializeDVRState(id, inDVR, mode));
    }
});

export default connect(null, mapDispatchToProps)(VictoremSDICalculator);