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
            <CalculatorTopBar type={'Custom CL'} id={this.props.id} dvrId={this.props.dvrId} />
            <CustomCLFormat id={this.props.id} dvrId={this.props.dvrId} />
            <CustomCLResolution id={this.props.id} dvrId={this.props.dvrId} />
            <CustomCLFrameRate id={this.props.id} dvrId={this.props.dvrId} />
            <CustomCLOutput id={this.props.id} dvrId={this.props.dvrId} />
        </div>
    );
}

const mapStateToProps = (state, { id, dvrId, mode }) => ({
    id,
    dvrId
});

const mapDispatchToProps = (dispatch, { id, dvrId, mode }) => ({
    handleInitialize: () => {
        dispatch(initializeDVRState(id, dvrId, mode));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomCLCalculator);