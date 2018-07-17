import React from 'react';
import { connect } from 'react-redux';
import { updateCXBitDepth, updateCXLinkCount, updateCXLinkSpeed } from '../../../../actions/flareCXActions';
import { MODE } from '../../constants';
import styles from './FlareCXFormat.css';

const renderLinkCountOptions = (formats, mode) => {
    if (!mode) {
        return formats.LinkCounts.map((linkCount, i) => <option key={i} value={linkCount}>{linkCount}</option>);
    } else {
        let linkCount;
        switch (mode) {
            case MODE.SINGLE:
                linkCount = 1;
                break;
            case MODE.DUAL:
                linkCount = 2;
                break;
            case MODE.QUAD:
                linkCount = 4;
        }
        return <option value={linkCount}>{linkCount}</option>;
    }
};

const FlareCXFormat = ({
    formats,
    mode,
    handleChangeBitDepth,
    handleChangeLinkCount,
    handleChangeLinkSpeed
}) => {
    const bitDepthOptions = formats.BitDepths.map((bitDepth, i) => <option key={i} value={bitDepth}>{bitDepth}</option>);
    const linkSpeedOptions = formats.LinkSpeeds.map((linkSpeed, i) => <option key={i} value={linkSpeed}>{linkSpeed}</option>);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>CoaXPress Format</legend>
        <div className={styles.left}>
            <div className={styles.labels}>
                <div className={styles.label}>Bit Depth:</div>
                <div className={styles.label}>Links:</div>
            </div>
            <div className={styles.selects}>
                <select className={styles.select} name='bitDepth' onChange={handleChangeBitDepth}>
                    {bitDepthOptions}
                </select>
                <select className={styles.select} name='linkCount' onChange={handleChangeLinkCount}>
                    {renderLinkCountOptions(formats, mode)}
                </select>
            </div>
        </div>
        <div className={styles.right}>
            <div className={styles.label}>Speed:</div>
            <select className={styles.select} name='linkSpeed' onChange={handleChangeLinkSpeed}>
                {linkSpeedOptions}
            </select>
        </div>
        </fieldset>
    );
};

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps;
    const calculatorState = state.get(id);
    const {
        formats,
        mode
    } = calculatorState;
    
    return {
        formats,
        mode
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { id } = ownProps;
    return {
        handleChangeBitDepth: (e) => {
            const bitDepth = Number(e.target.value);
            dispatch(updateCXBitDepth(id, bitDepth));
        },
        handleChangeLinkCount: (e) => {
            const linkCount = Number(e.target.value);
            dispatch(updateCXLinkCount(id, linkCount));
        },
        handleChangeLinkSpeed: (e) => {
            const linkSpeed = e.target.value;
            dispatch(updateCXLinkSpeed(id, linkSpeed));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlareCXFormat);