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
            <CalculatorTopBar type={'Custom CX'} id={this.props.id} dvrId={this.props.dvrId} />
            <CustomCXFormat id={this.props.id} dvrId={this.props.dvrId} />
            <CustomCXResolution id={this.props.id} dvrId={this.props.dvrId} />
            <CustomCXFrameRate id={this.props.id} dvrId={this.props.dvrId} />
            <CustomCXOutput id={this.props.id} dvrId={this.props.dvrId} />
        </div>
    );
}

const mapStateToProps = (state, { id, dvrId, mode }) => ({
    id,
    dvrId,
    mode
});

const mapDispatchToProps = (dispatch, { id, dvrId, mode }) => ({
    handleInitialize: () => {
        dispatch(initializeDVRState(id, dvrId, mode));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomCXCalculator);