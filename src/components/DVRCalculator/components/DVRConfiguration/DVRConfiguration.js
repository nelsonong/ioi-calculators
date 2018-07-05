import React from 'react';
import './DVRConfiguration.css';

const DVRConfiguration = ({ configurations, handleChangeConfiguration }) => {
    const configOptions = configurations.map((configuration, i) => <option key={i}>{configuration}</option>);
    return (
        <div className='dvr-configuration'>
            <fieldset>
            <legend>Configuration</legend>
                <select className='dvr-configuration-select' name='configuration' onChange={handleChangeConfiguration}>
                    {configOptions}
                </select>
            </fieldset>
        </div>
    );
};

export default DVRConfiguration;