import React from 'react';

const FlareSDIModel = ({ models, handleChange }) => {
    const modelOptions = models.map((model, i) => <option key={i} value={model}>{model}</option>);
    return (
        <fieldset>
        <legend>Model</legend>
            <select name='model' onChange={handleChange}>
                {modelOptions}
            </select>
        </fieldset>
    );
};

export default FlareSDIModel;