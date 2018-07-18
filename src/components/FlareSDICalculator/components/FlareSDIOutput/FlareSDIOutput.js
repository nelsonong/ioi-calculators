import React from 'react';
import { connect } from 'react-redux';
import styles from './FlareSDIOutput.css';

const FlareSDIOutput = ({ frameRate, dataRate }) => {
    const frameRateInput = `${frameRate} FPS / ${dataRate} MB/s`;
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Output</legend>
            <input type='text' className={styles.input} disabled={true} value={frameRateInput} />
        </fieldset>
    );
};

const mapStateToProps = (state, { id, dvrId }) => {
    const calculatorState = (dvrId !== undefined) ?
        state.storageCalculators.get(dvrId).cameras.get(id) :
        state.frameRateCalculators.get(id);
    const {
        frameRate,
        dataRate
    } = calculatorState;
    
    return {
        frameRate,
        dataRate
    };
};

export default connect(mapStateToProps)(FlareSDIOutput);