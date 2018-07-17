import React from 'react';
import { connect } from 'react-redux';
import { updateInterface, updateLink } from '../../../../actions/flareSDIActions';
import styles from './FlareSDIFormat.css';

const FlareSDIFormat = ({
    sdiInterface,
    sdiInterfaces,
    link,
    links,
    handleChangeInterface,
    handleChangeLink
}) => {
    const sdiInterfaceOptions = sdiInterfaces.map((sdiInterface, i) => <option key={i} value={sdiInterface}>{sdiInterface}</option>);
    let linkOptions = links.map((link, i) => <option key={i} value={link}>{link}</option>);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>SDI Format</legend>
            <div className={styles.left}>
                <div className={styles.label}>Interface:</div>
                <select className={styles.select} name='sdiInterface' value={sdiInterface} onChange={handleChangeInterface}>
                    {sdiInterfaceOptions}
                </select>
            </div>
            <div className={styles.right}>
                <div className={styles.label}>Links:</div>
                <select className={styles.select} name='link' value={link} onChange={handleChangeLink}>
                    {linkOptions}
                </select>
            </div>
        </fieldset>
    );
};

const mapStateToProps = (state, { id }) => {
    const calculatorState = state.get(id);
    const {
        sdiInterface,
        sdiInterfaces,
        link,
        links
    } = calculatorState;
    
    return {
        sdiInterface,
        sdiInterfaces,
        link,
        links
    };
};

const mapDispatchToProps = (dispatch, { id }) => ({
    handleChangeInterface: (e) => {
        const sdiInterface = e.target.value;
        dispatch(updateInterface(id, sdiInterface));
    },
    handleChangeLink: (e) => {
        const link = Number(e.target.value);
        dispatch(updateLink(id, link));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareSDIFormat);