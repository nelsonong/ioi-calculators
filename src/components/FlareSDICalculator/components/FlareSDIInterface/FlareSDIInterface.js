import React from 'react';

const FlareSDIInterface = ({ sdiInterface, sdiInterfaces, handleChange }) => {
    const sdiInterfaceOptions = sdiInterfaces.map((sdiInterface, i) => <option key={i} value={sdiInterface}>{sdiInterface}</option>);
    return (
        <fieldset>
        <legend>Interface</legend>
            <select name='sdiInterface' value={sdiInterface} onChange={handleChange}>
                {sdiInterfaceOptions}
            </select>
        </fieldset>
    );
};

export default FlareSDIInterface;