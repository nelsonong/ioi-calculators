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
                <CalculatorTopBar type={'Flare CX'} id={this.props.id} dvrId={this.props.dvrId} />
                <FlareCXModel id={this.props.id} dvrId={this.props.dvrId} />
                <FlareCXFormat id={this.props.id} dvrId={this.props.dvrId} />
                <FlareCXResolution id={this.props.id} dvrId={this.props.dvrId} />
                <FlareCXOptions id={this.props.id} dvrId={this.props.dvrId} />
                <FlareCXOutput id={this.props.id} dvrId={this.props.dvrId} />
            </div>
        );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(FlareCXCalculator);