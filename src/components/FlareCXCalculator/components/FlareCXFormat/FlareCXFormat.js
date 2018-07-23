import React from 'react';
import { connect } from 'react-redux';
import { updateBitDepth, updateLinkCount, updateLinkSpeed } from '../../../../actions/flareCXActions';
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
    bitDepth,
    linkCount,
    linkSpeed,
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
                <select className={styles.select} value={bitDepth} onChange={handleChangeBitDepth}>
                    {bitDepthOptions}
                </select>
                <select className={styles.select} value={linkCount} onChange={handleChangeLinkCount}>
                    {renderLinkCountOptions(formats, mode)}
                </select>
            </div>
        </div>
        <div className={styles.right}>
            <div className={styles.label}>Speed:</div>
            <select className={styles.select} value={linkSpeed} onChange={handleChangeLinkSpeed}>
                {linkSpeedOptions}
            </select>
        </div>
        </fieldset>
    );
};

const mapStateToProps = (state, {
    cameraId,
    dvrId
}) => {
    const calculatorState = !!!dvrId
        ? state.frameRateCalculators[cameraId]
        : state.storageCalculators[dvrId].cameras[cameraId];
    const {
        formats,
        bitDepth,
        linkCount,
        linkSpeed,
        mode
    } = calculatorState;
    
    return {
        formats,
        bitDepth,
        linkCount,
        linkSpeed,
        mode
    };
};

const mapDispatchToProps = (dispatch, { cameraId, dvrId }) => ({
    handleChangeBitDepth: (e) => {
        const bitDepth = Number(e.target.value);
        dispatch(updateBitDepth(cameraId, bitDepth, dvrId));
    },
    handleChangeLinkCount: (e) => {
        const linkCount = Number(e.target.value);
        dispatch(updateLinkCount(cameraId, linkCount, dvrId));
    },
    handleChangeLinkSpeed: (e) => {
        const linkSpeed = e.target.value;
        dispatch(updateLinkSpeed(cameraId, linkSpeed, dvrId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareCXFormat);