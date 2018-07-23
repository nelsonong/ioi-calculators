import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { initializeDVRState } from '../../actions/flareCXActions';
import CalculatorTopBar from '../CalculatorTopBar';
import { FlareCXModel, FlareCXFormat, FlareCXResolution, FlareCXOptions, FlareCXOutput } from './components';
import cx from 'classnames';
import styles from './FlareCXCalculator.css';

class FlareCXCalculator extends Component {
    constructor(props) {
        super(props);
        props.handleInitialize();
    }

    render = () => {
        const root = cx(styles.root, {
            [styles.draggable]: !!!this.props.mode
        });
        return (
            <div className={root}>
                <CalculatorTopBar type={'Flare CX'} cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
                <FlareCXModel cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
                <FlareCXFormat cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
                <FlareCXResolution cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
                <FlareCXOptions cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
                <FlareCXOutput cameraId={this.props.cameraId} dvrId={this.props.dvrId} />
            </div>
        );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(FlareCXCalculator);