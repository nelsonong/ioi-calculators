import React from 'react';
import './FlareCXTitle.css';

const FlareCXTitle = ({ mode, deleteCalculator, id }) => {
    const title = !mode ? 'Flare CX Frame Rate Calculator' : 'Flare CX Camera';
    const button = !mode ? (
        <button className='close-calculator-button' type='button' onClick={() => deleteCalculator(id)}>
            ✖
        </button>
    ) : '';

    return (
        <div>
            <div className='flare-calculator-title'>{title}</div>
            {button}
        </div>
    );
};

export default FlareCXTitle;