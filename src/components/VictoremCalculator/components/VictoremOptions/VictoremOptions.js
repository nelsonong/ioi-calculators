import React from 'react';
import { VIC_OPTION } from '../../constants';
import styles from './VictoremOptions.css';

const VictoremOptions = ({
    cameraOption,
    supports2x2Binning,
    supportsSubSampling,
    supportsVerticalBinning,
    handleChange
}) => (
    <fieldset className={styles.root}>
    <legend>Options</legend>
        <div className={styles.container}>
            <div className={styles.left}>
                <input
                    type="radio"
                    name='cameraOption'
                    value={VIC_OPTION.NONE}
                    checked={cameraOption === VIC_OPTION.NONE}
                    onChange={handleChange}
                />
                <div className={styles.label}>None</div>
                <br />
                <input
                    type="radio"
                    name='cameraOption'
                    value={VIC_OPTION.BIN_VERTICAL}
                    checked={cameraOption === VIC_OPTION.BIN_VERTICAL}
                    disabled={!supportsVerticalBinning}
                    onChange={handleChange}
                />
                <div className={styles.label}>Vertical Bin</div>
            </div>
            <div className={styles.right}>
                <input
                    type="radio"
                    name='cameraOption'
                    value={VIC_OPTION.SUBSAMPLING}
                    checked={cameraOption === VIC_OPTION.SUBSAMPLING}
                    disabled={!supportsSubSampling}
                    onChange={handleChange}
                />
                <div className={styles.label}>Sub-Sample</div>
                <br />
                <input
                    type="radio"
                    name='cameraOption'
                    value={VIC_OPTION.BIN_2X2}
                    checked={cameraOption === VIC_OPTION.BIN_2X2}
                    disabled={!supports2x2Binning}
                    onChange={handleChange}
                />
                <div className={styles.label}>2x2 Bin</div>
            </div>
        </div>
    </fieldset>
);

export default VictoremOptions;