import React from 'react';
import { connect } from 'react-redux';
import { updateInterface } from '../../../../actions/victoremSDIActions';
import styles from './VictoremSDIFormat.css';

const VictoremSDIFormat = ({
    sdiInterface,
    sdiInterfaces,
    handleChangeInterface
}) => {
    const sdiInterfaceOptions = sdiInterfaces.map((sdiInterface, i) => <option key={i} value={sdiInterface}>{sdiInterface}</option>);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>SDI Format</legend>
            <div className={styles.label}>Interface:</div>
            <select className={styles.select} name='sdiInterface' value={sdiInterface} onChange={handleChangeInterface}>
                {sdiInterfaceOptions}
            </select>
        </fieldset>
    );
};

const mapStateToProps = (state, { id }) => {
    const calculatorState = state.get(id);
    const {
        sdiInterface,
        sdiInterfaces
    } = calculatorState;
    
    return {
        sdiInterface,
        sdiInterfaces
    };
};

const mapDispatchToProps = (dispatch, { id }) => ({
    handleChangeInterface: (e) => {
        const sdiInterface = e.target.value;
        dispatch(updateInterface(id, sdiInterface));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremSDIFormat);