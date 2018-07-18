import React from 'react';
import { connect } from 'react-redux';
import { updateInterface } from '../../../../actions/flareSDIActions';
import styles from './FlareSDIInterface.css';

const FlareSDIInterface = ({
    sdiInterface,
    sdiInterfaces,
    handleChange
}) => {
    const sdiInterfaceOptions = sdiInterfaces.map((sdiInterface, i) => <option key={i} value={sdiInterface}>{sdiInterface}</option>);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Interface</legend>
            <select className={styles.select} name='sdiInterface' value={sdiInterface} onChange={handleChange}>
                {sdiInterfaceOptions}
            </select>
        </fieldset>
    );
};

const mapStateToProps = (state, { id }) => {
    const calculatorState = state.get(id);
    const {
        sdiInterface,
        sdiInterfaces,
    } = calculatorState;
    
    return {
        sdiInterface,
        sdiInterfaces
    };
};

const mapDispatchToProps = (dispatch, { id }) => ({
    handleChange: (e) => {
        const sdiInterface = e.target.value;
        dispatch(updateInterface(id, sdiInterface));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareSDIInterface);