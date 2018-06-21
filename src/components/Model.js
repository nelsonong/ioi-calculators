import React, { Component } from 'react';
import { models } from '../constants/models';

class Model extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentModel: models.cl[0],
            currentModels: models.cl
        }

        this.handleChangeLink = this.handleChangeLink.bind(this);
        this.handleChangeModel = this.handleChangeModel.bind(this);
    }

    handleChangeLink(e) {
        const value = e.target.value;
        this.props.updateState({ 'link': value });

        // Update and reset current models
        const cameraModels = (value === 'cl') ? models.cl : models.cx;
        const firstModel = cameraModels[0];
        this.setState({ currentModels: cameraModels });
        this.setState({ currentModel: firstModel });

        // Update model and default hardware version
        this.props.updateState({ model: firstModel, hwversion: 1 });
    }

    handleChangeModel(e) {
        const value = e.target.value;
        this.props.updateState({ 'model': value });
        this.setState({ currentModel: value });

        // Update default hardware version
        if (this.props.link === 'cl' && value.startsWith('12M')) {
            this.props.updateState({ hwversion: 2 });
        } else {
            this.props.updateState({ hwversion: 1 });
        }
    }

    renderModels() {
        return this.state.currentModels.map((model, i) => {
            return <option key={i}>{model}</option>;
        });
    }

    render() {
        return (
            <fieldset>
            <legend>Model</legend>
                <select onChange={this.handleChangeLink}>
                    <option value='cl'>Camera Link</option>
                    <option value='cx'>CoaXPress</option>
                </select>
                <br />
                <select value={this.state.currentModel} onChange={this.handleChangeModel}>
                    {this.renderModels()}
                </select>
            </fieldset>
        );
    }
}

export default Model;