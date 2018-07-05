import React from 'react';
import './FlareTitle.css';

const FlareTitle = ({ mode }) => {
    const title = !mode ? 'Flare Frame Rate Calculator' : 'Flare Camera';
    const button = !mode ? (
        <button className='close-calculator-button' type='button' onClick={() => this.props.deleteCalculator(this.props.id)}>
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

export default FlareTitle;