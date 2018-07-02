import React, { Component } from 'react';
import { DVR_DRIVES } from '../../constants';

class DVRDrives extends Component {
    render = () => {
        return (
            <fieldset>
            <legend>Drives</legend>
                <select name='drives' onChange={this.updateState}>
                    { DVR_DRIVES.map((drive, i) => { return <option key={i}>{drive}</option> }) }
                </select>
            </fieldset>
        );
    }
}

export default DVRDrives;