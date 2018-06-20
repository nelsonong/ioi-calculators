import React, { Component } from 'react';
import { models } from './Constants';

class Model extends Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.props.updateState({ [name]: value });
    }

    renderModels(camera) {
        const cameraModels = (this.props.link === 'cl') ? models.cl : models.cx;
        return cameraModels.map((model, i) => {
            return <option key={i}>{model}</option>;
        });
    }

    render() {
        return (
            <fieldset>
            <legend>Model</legend>
                <select name='link' onChange={this.handleInputChange}>
                    <option value='cl'>Camera Link</option>
                    <option value='cx'>CoaXPress</option>
                </select>
                <br />
                <select name='model' onChange={this.handleInputChange}>
                    {this.renderModels()}
                </select>
            </fieldset>
        );
    }
}

export default Model;