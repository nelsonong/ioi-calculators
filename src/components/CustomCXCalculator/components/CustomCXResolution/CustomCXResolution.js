import React from 'react';
import { connect } from 'react-redux';
import { updateResolutionPreset, updateWidth, updateHeight } from '../../../../actions/customCXActions';
import { RESOLUTION, RESOLUTIONS } from '../../constants';
import styles from './CustomCXResolution.css';

const CustomCXResolution = ({
    resolutionPreset,
    width,
    height,
    handleChangeResolutionPreset,
    handleChangeWidth,
    handleChangeHeight
}) => {
    const resolutionPresetOptions = RESOLUTIONS.map((preset, i) => {
        if (preset !== RESOLUTION.CUSTOM) {
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
                <input type="number" className={styles.wxh} name='width' value={width} onChange={handleChangeWidth} />
                <input type="number" className={styles.wxh} name='height' value={height} onChange={handleChangeHeight} />
            </div>
        </fieldset>
    );
};

const mapStateToProps = (state, { id, dvrId }) => {
    const calculatorState = (dvrId !== undefined) ?
        state.storageCalculators.get(dvrId).cameras.get(id) :
        state.frameRateCalculators.get(id);
    const {
        resolutionPreset,
        width,
        height
    } = calculatorState;
    
    return {
        resolutionPreset,
        width,
        height
    };
};

const mapDispatchToProps = (dispatch, { id, dvrId }) => ({
    handleChangeResolutionPreset: (e) => {
        const resolutionPreset = e.target.value;
        dispatch(updateResolutionPreset(id, resolutionPreset, dvrId));
    },
    handleChangeWidth: (e) => {
        const width = Number(e.target.value);
        dispatch(updateWidth(id, width, dvrId));
    },
    handleChangeHeight: (e) => {
        const height = Number(e.target.value);
        dispatch(updateHeight(id, height, dvrId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomCXResolution);