import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializeDVRState } from '../../actions/flareCLActions';
import CalculatorTopBar from '../CalculatorTopBar';
import { FlareCLModel, FlareCLFormat, FlareCLResolution, FlareCLOptions, FlareCLOutput } from './components';
import cx from 'classnames';
import styles from './FlareCLCalculator.css';

class FlareCLCalculator extends Component {
    constructor(props) {
        super(props);
        props.handleInitialize();
    }

    render = () =>  {
        const root = cx(styles.root, {
            [styles.draggable]: !!!this.props.mode
        });
        return (
            <div className={root}>
                <CalculatorTopBar type={'Flare CL'} id={this.props.id} dvrId={this.props.dvrId} />
                <FlareCLModel id={this.props.id} dvrId={this.props.dvrId} />
                <FlareCLFormat id={this.props.id} dvrId={this.props.dvrId} />
                <FlareCLResolution id={this.props.id} dvrId={this.props.dvrId} />
                <FlareCLOptions id={this.props.id} dvrId={this.props.dvrId} />
                <FlareCLOutput id={this.props.id} dvrId={this.props.dvrId} />
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

export default connect(mapStateToProps, mapDispatchToProps)(FlareCLCalculator);