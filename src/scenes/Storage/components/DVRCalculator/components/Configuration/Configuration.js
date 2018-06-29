import React, { Component } from 'react';
import { CONFIGURATIONS } from '../../constants';

class Configuration extends Component {
    render = () => (
        <fieldset>
        <legend>Configuration</legend>
            <select name='configuration' onChange={this.props.updateState}>
                { CONFIGURATIONS.map((configuration, i) => { return <option key={i}>{configuration}</option> }) }
            </select>
        </fieldset>
    );
}

export default Configuration;