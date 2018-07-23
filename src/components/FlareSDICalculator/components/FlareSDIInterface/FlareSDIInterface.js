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

const mapStateToProps = (state, {
    cameraId,
    dvrId
}) => {
    const calculatorState = !!!dvrId
        ? state.frameRateCalculators[cameraId]
        : state.storageCalculators[dvrId].cameras[cameraId];
    const {
        sdiInterface,
        sdiInterfaces,
    } = calculatorState;
    
    return {
        sdiInterface,
        sdiInterfaces
    };
};

const mapDispatchToProps = (dispatch, {
    cameraId,
    dvrId
}) => ({
    handleChange: (e) => {
        const sdiInterface = e.target.value;
        dispatch(updateInterface(cameraId, sdiInterface, dvrId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareSDIInterface);