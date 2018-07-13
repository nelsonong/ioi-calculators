import React from 'react';
import styles from './FlareSDIFormat.css';

const FlareSDIFormat = ({ sdiInterface, sdiInterfaces, link, links, handleChange }) => {
    const sdiInterfaceOptions = sdiInterfaces.map((sdiInterface, i) => <option key={i} value={sdiInterface}>{sdiInterface}</option>);
    let linkOptions = links.map((link, i) => <option key={i} value={link}>{link}</option>);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>SDI Format</legend>
            <div className={styles.left}>
                <div className={styles.label}>Interface:</div>
                <select className={styles.select} name='sdiInterface' value={sdiInterface} onChange={handleChange}>
                    {sdiInterfaceOptions}
                </select>
            </div>
            <div className={styles.right}>
                <div className={styles.label}>Links:</div>
                <select className={styles.select} name='link' value={link} onChange={handleChange}>
                    {linkOptions}
                </select>
            </div>
        </fieldset>
    );
};

export default FlareSDIFormat;