import React from 'react';
import { MODELS, LINKS } from '../../constants';

const FlareSDIModel = ({ model, models, link, links, handleChange }) => {
    const modelOptions = models.map((model, i) => <option key={i} value={model}>{model}</option>);
    let linkOptions = links.map((link, i) => <option key={i} value={link}>{link}</option>);
    return (
        <fieldset>
        <legend>Model / Link</legend>
            <select name='model' onChange={handleChange}>
                {modelOptions}
            </select>
            <select name='link' value={link} onChange={handleChange}>
                {linkOptions}
            </select>
        </fieldset>
    );
};

export default FlareSDIModel;