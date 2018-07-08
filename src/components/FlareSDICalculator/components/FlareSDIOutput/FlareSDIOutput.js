import React from 'react';
import './FlareSDIOutput.css';

const FlareSDIOutput = ({ frameRate, dataRate }) => {
    const frameRateInput = `${frameRate} FPS / ${dataRate} MB/s`;
    return (
        <fieldset>
        <legend>Output</legend>
            <input type='text' className='frame-rate-input' disabled={true} value={frameRateInput} />
        </fieldset>
    );
};

export default FlareSDIOutput;