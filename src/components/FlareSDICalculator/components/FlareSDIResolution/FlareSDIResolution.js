import React from 'react';

const FlareSDIResolution = ({ resolution, resolutions, handleChange }) => {
    const resolutionOptions = resolutions.map((resolution, i) => <option key={i} value={resolution}>{resolution}</option>);
    return (
        <fieldset>
        <legend>Resolution</legend>
            <select name='resolution' value={resolution} onChange={handleChange}>
                {resolutionOptions}
            </select>
        </fieldset>
    );
};

export default FlareSDIResolution;