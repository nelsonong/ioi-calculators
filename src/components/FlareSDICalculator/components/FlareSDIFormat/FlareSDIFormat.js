import React from 'react';
import './FlareSDIFormat.css';

const FlareSDIFormat = ({ sdiInterface, sdiInterfaces, link, links, handleChange }) => {
    const sdiInterfaceOptions = sdiInterfaces.map((sdiInterface, i) => <option key={i} value={sdiInterface}>{sdiInterface}</option>);
    let linkOptions = links.map((link, i) => <option key={i} value={link}>{link}</option>);
    return (
        <fieldset>
        <legend>SDI Format</legend>
            <div className='sdi-format-labels'>
                <div className='sdi-format-label'>Interface:</div>
                <div className='sdi-format-label'>Links:</div>
            </div>
            <div className='sdi-format-controls'>
                <select name='sdiInterface' value={sdiInterface} onChange={handleChange}>
                    {sdiInterfaceOptions}
                </select>
                <br />
                <select name='link' value={link} onChange={handleChange}>
                    {linkOptions}
                </select>
            </div>
        </fieldset>
    );
};

export default FlareSDIFormat;