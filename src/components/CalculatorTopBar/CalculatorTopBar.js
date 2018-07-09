import React from 'react';
import styles from './CalculatorTopBar.css';

const CalculatorTopBar = ({ inModal, type, deleteCalculator, id }) => {
    const text = !inModal ? `${type} Calculator` : `${type} Camera`;
    const button = !inModal ? (
        <button className={styles.closeButton} type='button' onClick={() => deleteCalculator(id)}>
            ✖
        </button>
    ) : '';

    return (
        <div>
            <div className={styles.root}>{text}</div>
            {button}
        </div>
    );
};

export default CalculatorTopBar;