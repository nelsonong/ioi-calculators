import React from 'react';
import { connect } from 'react-redux';
import { updateFormat } from '../../../../actions/flareCLActions';
import styles from './FlareCLFormat.css';

const FlareCLFormat = ({ formats, handleChange }) => {
    const formatOptions = formats.map((format, i) => <option key={i}>{format}</option>);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Camera Link Format</legend>
        <select className={styles.select} name='format' onChange={handleChange}>
            {formatOptions}
        </select>
        </fieldset>
    );
};

const mapStateToProps = (state, { id }) => {
    const calculatorState = state.get(id);
    const {
        formats
    } = calculatorState;
    
    return {
        formats
    };
};

const mapDispatchToProps = (dispatch, { id }) => ({
    handleChange: (e) => {
        const format = e.target.value;
        dispatch(updateFormat(id, format));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareCLFormat);