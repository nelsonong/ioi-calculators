import React, { Component } from 'react';
import { MODELS } from '../../constants';

class Model extends Component {
    render = () => (
        <fieldset>
        <legend>Model</legend>
            <select name='model' onChange={this.props.updateState}>
                { MODELS.map((model, i) => { return <option key={i}>{model}</option> }) }
            </select>
        </fieldset>
    );
}

export default Model;