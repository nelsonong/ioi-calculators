import React, { Component } from 'react';

class Model extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cameras: [
                { link: 'cl', models: [ '2M360MCL/NCL', '2M360CCL', '4M180MCL/NCL', '4M180CCL', '12M125MCL/NCL', '12M125CCL' ] },
                { link: 'cx', models: [ '2M280MCX/NCX', '2M280CCX', '4M140MCX/NCX', '4M140CCX', '12M180MCX/NCX', '12M180CCX', '48M30MCX', '48M30CCX' ] }
            ],
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
        let camera = this.state.cameras.filter(camera => {
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