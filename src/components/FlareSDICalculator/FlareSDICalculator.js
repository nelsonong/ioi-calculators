import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { initializeDVRState } from '../../actions/flareSDIActions';
import CalculatorTopBar from '../CalculatorTopBar';
import { FlareSDIModel, FlareSDIFormat, FlareSDIColor, FlareSDIResolution, FlareSDIFrameRate, FlareSDIOutput } from './components';
import styles from './FlareSDICalculator.css';

class FlareSDICalculator extends Component {
    constructor(props) {
        super(props);
        props.handleInitialize();
    }

    render = () => (
        <div className={styles.root}>
            <CalculatorTopBar type={'Flare SDI'} id={this.props.id} />
            <FlareSDIModel id={this.props.id} />
            <FlareSDIFormat id={this.props.id} />
            <FlareSDIResolution id={this.props.id} />
            <FlareSDIColor id={this.props.id} />
            <FlareSDIFrameRate id={this.props.id} />
            <FlareSDIOutput id={this.props.id} />
        </div>
    );
}

const mapDispatchToProps = (dispatch, { id, inDVR, mode }) => ({
    handleInitialize: () => {
        console.log(id, inDVR, mode);
        dispatch(initializeDVRState(id, inDVR, mode));
    }
});

export default connect(null, mapDispatchToProps)(FlareSDICalculator);