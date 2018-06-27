import React from 'react';
import './ModelInfo.css';

function ModelInfo(props) {
    const maxResolutionText = props.maxWidth + ' x ' + props.maxHeight;
    return (
        <fieldset>
        <legend>Model Information</legend>
            <div className='model-info-labels'>
                <div className='model-info-label'>Sensor:</div>
                <div className='model-info-label'>Max Resolution:</div>
            </div>
            <div className='model-info-inputs'>
                <input type='text' className='model-info-input' disabled value={props.sensor} />
                <br />
                <input type='text' className='model-info-input' disabled value={maxResolutionText}/>
            </div>
        </fieldset>
    );
}

export default ModelInfo;