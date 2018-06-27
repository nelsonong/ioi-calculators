import React from 'react';

function ModelInfo(props) {
    const maxResolutionText = '[' + props.maxWidth + ' x ' + props.maxHeight + ']';
    return (
        <fieldset>
        <legend>Model Information</legend>
            Sensor: <input type='text' disabled value={props.sensor} />
            <br />
            Max Resolution: <input type='text' disabled value={maxResolutionText}/>
        </fieldset>
    );
}

export default ModelInfo;