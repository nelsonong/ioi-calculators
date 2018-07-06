import React from 'react';
import './FlareCXOptions.css';

const FlareCXOptions = ({ model, handleChange }) => {
    const subSamplingDisabled = model.startsWith('12M') || model.startsWith('48M');
    return (
        <fieldset>
        <legend>Options</legend>
            <input type="checkbox" name='subSampling' disabled={subSamplingDisabled} onChange={handleChange}/>
            <div className='options-label'>Enable sub-sampling</div>
        </fieldset>
    );
};

export default FlareCXOptions;