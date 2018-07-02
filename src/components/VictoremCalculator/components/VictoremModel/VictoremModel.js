import React, { Component } from 'react';
import { VIC_MODELS, VIC_SENSOR, VIC_FORMAT, VIC_FORMATS, VIC_MAX_RESOLUTION, VIC_OPTION } from '../../constants';

class VictoremModel extends Component {
    supportsSubSampling = (model) => {
        return VIC_MODELS.TYPE_250.includes(model) || VIC_MODELS.TYPE_252.includes(model) || VIC_MODELS.TYPE_253.includes(model) || VIC_MODELS.TYPE_255.includes(model) || VIC_MODELS.TYPE_273.includes(model);
    }

    supportsVerticalBinning = (model) => {
        return VIC_MODELS.TYPE_MONO.includes(model) && (VIC_MODELS.TYPE_250.includes(model) || VIC_MODELS.TYPE_252.includes(model) || VIC_MODELS.TYPE_253.includes(model) || VIC_MODELS.TYPE_255.includes(model));
    }

    supports2x2Binning = (model) => {
        return VIC_MODELS.TYPE_253.includes(model) || VIC_MODELS.TYPE_255.includes(model) || VIC_MODELS.TYPE_273.includes(model);
    }

    handleChangeModel = (e) => {
        const model = e.target.value;
        const supportsSubSampling = this.supportsSubSampling(model);
        const supportsVerticalBinning = this.supportsVerticalBinning(model);
        const supports2x2Binning = this.supports2x2Binning(model);

        let formats = VIC_FORMATS.CX4B;
        if (this.props.model.startsWith('4B')) {
            formats = VIC_FORMATS.CX4B;
        } else if (this.props.model.startsWith('16B')) {
            formats = VIC_FORMATS.CX16B;
        } else {
            formats = VIC_FORMATS.CXX;
        }

        this.props.updateState({
            model: model,
            sensor: VIC_SENSOR[model],
            maxWidth: VIC_MAX_RESOLUTION[model][0],
            maxHeight: VIC_MAX_RESOLUTION[model][1],
            format: VIC_FORMAT.CXP2x1,
            formats: formats,
            supportsSubSampling: supportsSubSampling,
            supportsVerticalBinning: supportsVerticalBinning,
            supports2x2Binning: supports2x2Binning,
            cameraOption: VIC_OPTION.NONE
        });
    }

    render = () => {
        return (
            <fieldset>
            <legend>Model</legend>
                <select name='model' onChange={this.handleChangeModel}>
                    { VIC_MODELS.ALL.map((model, i) => { return <option key={i}>{model}</option> }) }
                </select>
            </fieldset>
        );
    }
}

export default VictoremModel;