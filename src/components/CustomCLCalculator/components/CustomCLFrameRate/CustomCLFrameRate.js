import React from 'react';
import { connect } from 'react-redux';
import { updateFrameRate } from '../../../../actions/customCLActions';
import styles from './CustomCLFrameRate.css';

const CustomCLFrameRate = ({
    frameRate,
    handleChange
}) => (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Frame Rate</legend>
        <input type="number" className={styles.display} value={frameRate} onChange={handleChange} />
    </fieldset>
);

const mapStateToProps = ({ storageCalculators, frameRateCalculators }, { id, dvrId }) => {
    const calculatorState = (!!dvrId) ? storageCalculators.get(dvrId).cameras.get(id) :
                                        frameRateCalculators.get(id);
    const { frameRate } = calculatorState;
    return { frameRate };
};

const mapDispatchToProps = (dispatch, { id, dvrId }) => ({
    handleChange: (e) => {
        const frameRate = Number(e.target.value);
        dispatch(updateFrameRate(id, frameRate, dvrId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomCLFrameRate);