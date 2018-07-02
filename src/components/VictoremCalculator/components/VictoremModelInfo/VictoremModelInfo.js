import React from 'react';
import './VictoremModelInfo.css';

const VictoremModelInfo = ({ sensor, maxWidth, maxHeight }) => {
    const maxResolutionText = `${maxWidth} x ${maxHeight}`;
    return (
        <fieldset>
        <legend>Model Information</legend>
            <div className='model-info-labels'>
                <div className='model-info-label'>Sensor:</div>
                <div className='model-info-label'>Max Resolution:</div>
            </div>
            <div className='model-info-inputs'>
                <input type='text' className='model-info-input' disabled value={sensor} />
                <br />
                <input type='text' className='model-info-input' disabled value={maxResolutionText}/>
            </div>
        </fieldset>
    );
};

export default VictoremModelInfo;