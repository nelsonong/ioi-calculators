import React, { Component } from 'react';

class FrameRate extends Component {
    render() {
        return (
            <fieldset>
            <legend>Frame Rate</legend>
                <input type='text' className='framerate' disabled={true} value={this.props.frameRate + ' FPS'} />
            </fieldset>
        );
    }
}

export default FrameRate;