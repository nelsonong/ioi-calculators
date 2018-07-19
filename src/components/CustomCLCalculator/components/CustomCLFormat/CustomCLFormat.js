import React from 'react';
import { connect } from 'react-redux';
import { updateFormat } from '../../../../actions/customCLActions';
import { FORMATS } from '../../constants';
import styles from './CustomCLFormat.css';

const CustomCLFormat = ({
    format,
    handleChange
}) => {
    const formatOptions = FORMATS.map((format, i) => <option key={i}>{format}</option>);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Camera Link Format</legend>
            <select className={styles.select} value={format} onChange={handleChange}>
                {formatOptions}
            </select>
        </fieldset>
    );
};

const mapStateToProps = (state, { id, dvrId }) => {
    const calculatorState = (dvrId !== undefined) ?
        state.storageCalculators.get(dvrId).cameras.get(id) :
        state.frameRateCalculators.get(id);
    const { format } = calculatorState;
    return { format };
};

const mapDispatchToProps = (dispatch, { id, dvrId }) => ({
    handleChange: (e) => {
        const format = e.target.value;
        dispatch(updateFormat(id, format, dvrId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomCLFormat);