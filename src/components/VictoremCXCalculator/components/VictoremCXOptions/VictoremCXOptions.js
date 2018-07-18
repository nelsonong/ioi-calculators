import React from 'react';
import { connect } from 'react-redux';
import { updateCameraOption } from '../../../../actions/victoremCXActions';
import { CAMERA_OPTION } from '../../constants';
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
                    name='none'
                    value={CAMERA_OPTION.NONE}
                    checked={cameraOption === CAMERA_OPTION.NONE}
                    onChange={handleChange}
                />
                <div className={styles.label}>None</div>
                <br />
                <input
                    type="radio"
                    className={styles.radio}
                    name='subSampling'
                    value={CAMERA_OPTION.SUBSAMPLING}
                    checked={cameraOption === CAMERA_OPTION.SUBSAMPLING}
                    disabled={!supportsSubSampling}
                    onChange={handleChange}
                />
                <div className={styles.label}>Sub-Sample</div>
            </div>
            <div className={styles.right}>
                <input
                    type="radio"
                    className={styles.radio}
                    name='binv'
                    value={CAMERA_OPTION.BIN_VERTICAL}
                    checked={cameraOption === CAMERA_OPTION.BIN_VERTICAL}
                    disabled={!supportsVerticalBinning}
                    onChange={handleChange}
                />
                <div className={styles.label}>Vertical Bin</div>
                <br />
                <input
                    type="radio"
                    className={styles.radio}
                    name='bin2x2'
                    value={CAMERA_OPTION.BIN_2X2}
                    checked={cameraOption === CAMERA_OPTION.BIN_2X2}
                    disabled={!supports2x2Binning}
                    onChange={handleChange}
                />
                <div className={styles.label}>2x2 Bin</div>
            </div>
        </div>
    </fieldset>
);

const mapStateToProps = ({ frameRateCalculators }, { id }) => {
    const calculatorState = frameRateCalculators.get(id);
    const {
        cameraOption,
        supports2x2Binning,
        supportsSubSampling,
        supportsVerticalBinning
    } = calculatorState;
    
    return {
        cameraOption,
        supports2x2Binning,
        supportsSubSampling,
        supportsVerticalBinning
    };
};

const mapDispatchToProps = (dispatch, { id }) => ({
    handleChange: (e) => {
        const cameraOption = Number(e.target.value);
        dispatch(updateCameraOption(id, cameraOption));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremCXOptions);