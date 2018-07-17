import React from 'react';
import { connect } from 'react-redux';
import { updateResolutionPreset, updateWidth, updateHeight } from '../../../../actions/flareCXActions';
import { NAN_RESOLUTIONS, RESOLUTIONS } from '../../constants';
import styles from './FlareCXResolution.css';

const FlareCXResolution = ({
    resolutionPreset,
    width,
    widthStep,
    height,
    heightStep,
    resolutionTooltip,
    handleChangeResolutionPreset,
    handleChangeWidth,
    handleChangeHeight
}) => {
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
                <select className={styles.select} value={resolutionPreset} onChange={handleChangeResolutionPreset}>
                    {resolutionPresetOptions}
                </select>
                <br />
                <input type="number" className={styles.wxh} name='width' step={widthStep} value={width} onChange={handleChangeWidth} />
                <input type="number" className={styles.wxh} name='height' step={heightStep} value={height} onChange={handleChangeHeight} />
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

const mapStateToProps = (state, { id }) => {
    const calculatorState = state.get(id);
    const {
        resolutionPreset,
        width,
        widthStep,
        height,
        heightStep,
        resolutionTooltip
    } = calculatorState;
    
    return {
        resolutionPreset,
        width,
        widthStep,
        height,
        heightStep,
        resolutionTooltip
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

export default connect(mapStateToProps, mapDispatchToProps)(FlareCXResolution);