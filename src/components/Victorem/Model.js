import React, { Component } from 'react';
import { MODELS, SENSOR, FORMAT, FORMATS, MAX_RESOLUTION, CAMERA_OPTION } from '../../constants/victorem';

class Model extends Component {
    constructor(props) {
        super(props);
        this.handleChangeModel = this.handleChangeModel.bind(this);
    }

    supportsSubSampling(model) {
        return MODELS.TYPE_250.includes(model) || MODELS.TYPE_252.includes(model) || MODELS.TYPE_253.includes(model) || MODELS.TYPE_255.includes(model) || MODELS.TYPE_273.includes(model);
    }

    supportsVerticalBinning(model) {
        return MODELS.TYPE_MONO.includes(model) && (MODELS.TYPE_250.includes(model) || MODELS.TYPE_252.includes(model) || MODELS.TYPE_253.includes(model) || MODELS.TYPE_255.includes(model));
    }

    supports2x2Binning(model) {
        return MODELS.TYPE_253.includes(model) || MODELS.TYPE_255.includes(model) || MODELS.TYPE_273.includes(model);
    }

    handleChangeModel(e) {
        const model = e.target.value;
        const supportsSubSampling = this.supportsSubSampling(model);
        const supportsVerticalBinning = this.supportsVerticalBinning(model);
        const supports2x2Binning = this.supports2x2Binning(model);

        let formats = FORMATS.CX4B;
        if (this.props.model.startsWith('4B')) {
            formats = FORMATS.CX4B;
        } else if (this.props.model.startsWith('16B')) {
            formats = FORMATS.CX16B;
        } else {
            formats = FORMATS.CXX;
        }

        this.props.updateState({
            model: model,
            sensor: SENSOR[model],
            maxWidth: MAX_RESOLUTION[model][0],
            maxHeight: MAX_RESOLUTION[model][1],
            format: FORMAT.CXP2x1,
            formats: formats,
            supportsSubSampling: supportsSubSampling,
            supportsVerticalBinning: supportsVerticalBinning,
            supports2x2Binning: supports2x2Binning,
            cameraOption: CAMERA_OPTION.NONE
        });
    }

    render() {
        return (
            <fieldset>
            <legend>Model</legend>
                <select name='model' onChange={this.handleChangeModel}>
                    { MODELS.ALL.map((model, i) => { return <option key={i}>{model}</option> }) }
                </select>
            </fieldset>
        );
    }
}

export default Model;