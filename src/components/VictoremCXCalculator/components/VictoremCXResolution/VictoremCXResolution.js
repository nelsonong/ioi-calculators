import React from 'react';
import { connect } from 'react-redux';
import { updateResolutionPreset, updateWidth, updateHeight } from '../../../../actions/victoremCXActions';
import { RESOLUTIONS, NAN_RESOLUTIONS, CAMERA_OPTION } from '../../constants';
import styles from './VictoremCXResolution.css';

const VictoremCXResolution = ({
    resolutionPreset,
    width,
    widthStep,
    maxWidth,
    height,
    heightStep,
    maxHeight,
    resolutionTooltip,
    cameraOption,
    handleChangeResolutionPreset,
    handleChangeWidth,
    handleChangeHeight
}) => {
    const subSamplingSelected = (cameraOption === CAMERA_OPTION.SUBSAMPLING);
    const resolutionPresetOptions = RESOLUTIONS.map((preset, i) => {
        if (!NAN_RESOLUTIONS.includes(preset)) {
            preset = `${preset[0]}x${preset[1]}`;
        }
        return <option key={i} value={preset}>{preset}</option>;
    });
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Resolution</legend>
            <div className={styles.left}>
                <div className={styles.label}>Presets:</div>
                <div className={styles.label}>W x H:</div>
            </div>
            <div className={styles.right}>
                <select className={styles.select} value={resolutionPreset} disabled={subSamplingSelected} onChange={handleChangeResolutionPreset}>
                    {resolutionPresetOptions}
                </select>
                <br />
                <input type="number" className={styles.wxh} name='width' step={widthStep} value={width} min='16' max={maxWidth} disabled={subSamplingSelected} onChange={handleChangeWidth} />
                <input type="number" className={styles.wxh} name='height' step={heightStep} value={height} min='4' max={maxHeight} disabled={subSamplingSelected} onChange={handleChangeHeight} />
            </div>
            {
                resolutionTooltip !== '' &&
                <div className={styles.tooltip}>
                    {resolutionTooltip}
                </div>
            }
        </fieldset>
    );
};

const mapStateToProps = ({ frameRateCalculators }, { id }) => {
    const calculatorState = frameRateCalculators.get(id);
    const {
        resolutionPreset,
        width,
        widthStep,
        maxWidth,
        height,
        heightStep,
        maxHeight,
        resolutionTooltip,
        cameraOption
    } = calculatorState;
    
    return {
        resolutionPreset,
        width,
        widthStep,
        maxWidth,
        height,
        heightStep,
        maxHeight,
        resolutionTooltip,
        cameraOption
    };
};

const mapDispatchToProps = (dispatch, { id }) => ({
    handleChangeResolutionPreset: (e) => {
        const resolutionPreset = e.target.value;
        dispatch(updateResolutionPreset(id, resolutionPreset));
    },
    handleChangeWidth: (e) => {
        const width = Number(e.target.value);
        dispatch(updateWidth(id, width));
    },
    handleChangeHeight: (e) => {
        const height = Number(e.target.value);
        dispatch(updateHeight(id, height));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremCXResolution);