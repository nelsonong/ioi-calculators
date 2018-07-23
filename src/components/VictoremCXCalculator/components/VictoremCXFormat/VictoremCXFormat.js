import React from 'react';
import { connect } from 'react-redux';
import { updateFormat, updateBitDepth } from '../../../../actions/victoremCXActions';
import { BIT_DEPTHS } from '../../constants';
import styles from './VictoremCXFormat.css';

const VictoremCXFormat = ({
    formats,
    handleChangeFormat,
    handleChangeBitDepth
}) => {
    const formatOptions = formats.map((format, i) => <option key={i}>{format}</option>);
    const bitDepthOptions = BIT_DEPTHS.map((bitDepth, i) => <option key={i} value={bitDepth}>{bitDepth}</option>);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Output Format</legend>
            <div className={styles.label}>Link:</div>
            <select className={styles.select} name='format' onChange={handleChangeFormat}>
                {formatOptions}
            </select>

            <div className={styles.label}>Bit Depth:</div>
            <select className={styles.select} name='bitDepth' onChange={handleChangeBitDepth}>
                {bitDepthOptions}
            </select>
        </fieldset>
    );
};

const mapStateToProps = ({ frameRateCalculators }, { cameraId }) => {
    const calculatorState = frameRateCalculators[cameraId];
    const {
        formats
    } = calculatorState;
    
    return {
        formats
    };
};

const mapDispatchToProps = (dispatch, { cameraId }) => {
    return {
        handleChangeFormat: (e) => {
            const format = e.target.value;
            dispatch(updateFormat(cameraId, format));
        },
        handleChangeBitDepth: (e) => {
            const bitDepth = Number(e.target.value);
            dispatch(updateBitDepth(cameraId, bitDepth));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VictoremCXFormat);