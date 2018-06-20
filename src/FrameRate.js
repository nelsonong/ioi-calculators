import React, { Component } from 'react';

class FrameRate extends Component {
    render() {
        return (
            <fieldset>
            <legend>Frame Rate</legend>
                <input type='text' className='framerate' disabled={true} />
            </fieldset>
        );
    }
}

export default FrameRate;