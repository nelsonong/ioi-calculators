import React, { Component } from 'react';
import { DVR_CONFIGURATIONS } from '../../constants';

class DVRConfiguration extends Component {
    render = () => (
        <fieldset>
        <legend>Configuration</legend>
            <select name='configuration' onChange={this.props.updateState}>
                { DVR_CONFIGURATIONS.map((configuration, i) => { return <option key={i}>{configuration}</option> }) }
            </select>
        </fieldset>
    );
}

export default DVRConfiguration;