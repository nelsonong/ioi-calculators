import React from 'react';
import { OPTION } from '../../constants';
import styles from './VictoremCXOptions.css';

const VictoremCXOptions = ({
    cameraOption,
    supports2x2Binning,
    supportsSubSampling,
    supportsVerticalBinning,
    handleChange
}) => (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Options</legend>
        <div className={styles.center}>
            <div className={styles.left}>
                <input
                    type="radio"
                    className={styles.radio}
                    name='cameraOption'
                    value={OPTION.NONE}
                    checked={cameraOption === OPTION.NONE}
                    onChange={handleChange}
                />
                <div className={styles.label}>None</div>
                <br />
                <input
                    type="radio"
                    className={styles.radio}
                    name='cameraOption'
                    value={OPTION.SUBSAMPLING}
                    checked={cameraOption === OPTION.SUBSAMPLING}
                    disabled={!supportsSubSampling}
                    onChange={handleChange}
                />
                <div className={styles.label}>Sub-Sample</div>
            </div>
            <div className={styles.right}>
                <input
                    type="radio"
                    className={styles.radio}
                    name='cameraOption'
                    value={OPTION.BIN_VERTICAL}
                    checked={cameraOption === OPTION.BIN_VERTICAL}
                    disabled={!supportsVerticalBinning}
                    onChange={handleChange}
                />
                <div className={styles.label}>Vertical Bin</div>
                <br />
                <input
                    type="radio"
                    className={styles.radio}
                    name='cameraOption'
                    value={OPTION.BIN_2X2}
                    checked={cameraOption === OPTION.BIN_2X2}
                    disabled={!supports2x2Binning}
                    onChange={handleChange}
                />
                <div className={styles.label}>2x2 Bin</div>
            </div>
        </div>
    </fieldset>
);

export default VictoremCXOptions;