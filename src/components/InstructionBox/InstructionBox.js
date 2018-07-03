import React from 'react';
import './InstructionBox.css';

const InstructionBox = ({ text }) => (
    <div className='instruction-box-container'>
        <div className='instruction-box-text'>
            {text}
        </div>
    </div>
);

export default InstructionBox;