import React from 'react';
import { SLOW_MODE_FORMATS } from '../../constants';
import './FlareCLOptions.css';

const FlareCLOptions = ({ model, format, handleChange }) => {
    const subSamplingDisabled = model.startsWith('12M') || model.startsWith('48M');
    const slowModeDisabled = model.startsWith('12M') || !SLOW_MODE_FORMATS.includes(format);
    return (
        <fieldset>
        <legend>Options</legend>
            <input type="checkbox" name='subSampling' disabled={subSamplingDisabled} onChange={handleChange}/>
            <div className='options-label'>Enable sub-sampling</div>
            <br />
            <input type="checkbox" name='slowMode' disabled={slowModeDisabled} onChange={handleChange}/>
            <div className='options-label'>Enabled reduced line rate mode</div>
        </fieldset>
    );
};

export default FlareCLOptions;