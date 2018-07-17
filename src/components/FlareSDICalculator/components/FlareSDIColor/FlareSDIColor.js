import React from 'react';
import { connect } from 'react-redux';
import  { updateSDIColor } from '../../../../actions/flareSDIActions';
import styles from './FlareSDIColor.css';

const FlareSDIColor = ({
    color,
    colors,
    handleChange
}) => {
    const colorOptions = colors.map((color, i) => <option key={i} value={color}>{color}</option>);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Color</legend>
            <select className={styles.select} name='color' value={color} onChange={handleChange}>
                {colorOptions}
            </select>
        </fieldset>
    );
};

const mapStateToProps = (state, { id }) => {
    const calculatorState = state.get(id);
    const {
        color,
        colors
    } = calculatorState;
    
    return {
        color,
        colors
    };
};

const mapDispatchToProps = (dispatch, { id }) => ({
    handleChange: (e) => {
        const color = e.target.value;
        dispatch(updateSDIColor(id, color));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareSDIColor);