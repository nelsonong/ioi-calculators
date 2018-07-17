import React from 'react';
import { connect } from 'react-redux';
import { updateCLFormat } from '../../../../actions/flareCLActions';
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

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps;
    const calculatorState = state.get(id);
    const {
        formats
    } = calculatorState;
    
    return {
        formats
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleChange: (e) => {
        const { id } = ownProps;
        const format = e.target.value;
        dispatch(updateCLFormat(id, format));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareCLFormat);