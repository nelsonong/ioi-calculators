import React, { Component } from 'react';
import { LINK, CL_MODEL, CL_MODELS, CX_MODELS } from '../../constants';

class FlareModel extends Component {
    state = {
        currentModel: CL_MODEL.Type2M360MCL,
        currentModels: CL_MODELS
    }

    handleChangeLink = (e) => {
        const value = e.target.value;
        this.props.updateState({ 'link': value });

        // Update and reset current models
        const cameraModels = (value === LINK.CL) ? CL_MODELS : CX_MODELS;
        const firstModel = cameraModels[0];
        this.setState({ currentModels: cameraModels });
        this.setState({ currentModel: firstModel });

        // Update model and default hardware version
        this.props.updateState({ model: firstModel, hwversion: 1 });
    }

    handleChangeModel = (e) => {
        const value = e.target.value;
        this.props.updateState({ 'model': value });
        this.setState({ currentModel: value });

        // Update default hardware version
        if (this.props.link === LINK.CL && value.startsWith('12M')) {
            this.props.updateState({ hwversion: 2 });
        } else {
            this.props.updateState({ hwversion: 1 });
        }
    }

    renderModels = () => {
        return this.state.currentModels.map((model, i) => {
            return <option key={i}>{model}</option>;
        });
    }

    render = () => {
        return (
            <fieldset>
            <legend>Model</legend>
                <select onChange={this.handleChangeLink}>
                    <option value={LINK.CL}>Camera Link</option>
                    <option value={LINK.CX}>CoaXPress</option>
                </select>
                <br />
                <select value={this.state.currentModel} onChange={this.handleChangeModel}>
                    {this.renderModels()}
                </select>
            </fieldset>
        );
    }
}

export default FlareModel;