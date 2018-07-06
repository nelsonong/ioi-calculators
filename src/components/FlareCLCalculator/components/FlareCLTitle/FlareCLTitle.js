import React from 'react';
import './FlareCLTitle.css';

const FlareCLTitle = ({ mode, deleteCalculator, id }) => {
    const title = !mode ? 'Flare CL Frame Rate Calculator' : 'Flare CL Camera';
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

export default FlareCLTitle;