import React, { Component } from 'react';
import { DVR_MODELS } from '../../constants';

class DVRModel extends Component {
    render = () => (
        <fieldset>
        <legend>Model</legend>
            <select name='model' onChange={this.props.updateState}>
                { DVR_MODELS.map((model, i) => { return <option key={i}>{model}</option> }) }
            </select>
        </fieldset>
    );
}

export default DVRModel;