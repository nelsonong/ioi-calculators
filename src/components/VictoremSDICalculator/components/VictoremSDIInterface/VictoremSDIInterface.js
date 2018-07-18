import React from 'react';
import { connect } from 'react-redux';
import { updateInterface } from '../../../../actions/victoremSDIActions';
import styles from './VictoremSDIInterface.css';

const VictoremSDIInterface = ({
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

const mapStateToProps = ({ frameRateCalculators }, { id }) => {
    const calculatorState = frameRateCalculators.get(id);
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
    handleChange: (e) => {
        const sdiInterface = e.target.value;
        dispatch(updateInterface(id, sdiInterface));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremSDIInterface);