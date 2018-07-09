import React from 'react';
import './CalculatorTopBar.css';

const CalculatorTopBar = ({ inModal, type, deleteCalculator, id }) => {
    const text = !inModal ? `${type} Calculator` : `${type} Camera`;
    const button = !inModal ? (
        <button className='calculator-top-bar-close-button' type='button' onClick={() => deleteCalculator(id)}>
            ✖
        </button>
    ) : '';

    return (
        <div>
            <div className='calculator-top-bar'>{text}</div>
            {button}
        </div>
    );
};

export default CalculatorTopBar;