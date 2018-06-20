import React, { Component } from 'react';
import { cameras } from './Constants';

class Model extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: 'cl'
        };

        this.handleChangeLink = this.handleChangeLink.bind(this);
        this.handleChangeModel = this.handleChangeModel.bind(this);
    }

    handleChangeLink(e) {
        this.setState({
            link: e.target.value
        });

        this.props.updateState({ link: e.target.value });
    }

    handleChangeModel(e) {
        this.props.updateState({ model: e.target.value });
    }

    renderModels(camera) {
        return camera[0].models.map((model, i) => {
            return <option key={i}>{model}</option>;
        });
    }

    render() {
        // Get camera object with correct models (cl or cx).
        const camera = cameras.filter(camera => {
            return camera.link === this.state.link
        });

        return (
            <fieldset>
            <legend>Model</legend>
                <select onChange={this.handleChangeLink}>
                    <option value='cl'>Camera Link</option>
                    <option value='cx'>CoaXPress</option>
                </select>
                <br />
                <select onChange={this.handleChangeModel}>
                    {this.renderModels(camera)}
                </select>
            </fieldset>
        );
    }
}

export default Model;