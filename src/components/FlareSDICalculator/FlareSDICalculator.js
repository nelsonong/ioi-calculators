import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { initializeDVRState } from '../../actions/flareSDIActions';
import CalculatorTopBar from '../CalculatorTopBar';
import { FlareSDIModel, FlareSDIInterface, FlareSDIColor, FlareSDIResolution, FlareSDIFrameRate, FlareSDIOutput } from './components';
import cx from 'classnames';
import styles from './FlareSDICalculator.css';

class FlareSDICalculator extends Component {
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
                <CalculatorTopBar type={'Flare SDI'} id={this.props.id} dvrId={this.props.dvrId} />
                <FlareSDIModel id={this.props.id} dvrId={this.props.dvrId} />
                <FlareSDIInterface id={this.props.id} dvrId={this.props.dvrId} />
                <FlareSDIResolution id={this.props.id} dvrId={this.props.dvrId} />
                <FlareSDIColor id={this.props.id} dvrId={this.props.dvrId} />
                <FlareSDIFrameRate id={this.props.id} dvrId={this.props.dvrId} />
                <FlareSDIOutput id={this.props.id} dvrId={this.props.dvrId} />
            </div>
        );
    }
}

const mapStateToProps = (state, { id, dvrId }) => ({
    id,
    dvrId
});

const mapDispatchToProps = (dispatch, { id, dvrId, mode }) => ({
    handleInitialize: () => {
        dispatch(initializeDVRState(id, dvrId, mode));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareSDICalculator);