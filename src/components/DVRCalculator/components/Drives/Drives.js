import React, { Component } from 'react';
import { DRIVES } from '../../constants';

class Drives extends Component {
    render = () => {
        return (
            <fieldset>
            <legend>Drives</legend>
                <select name='drives' onChange={this.updateState}>
                    { DRIVES.map((drive, i) => { return <option key={i}>{drive}</option> }) }
                </select>
            </fieldset>
        );
    }
}

export default Drives;