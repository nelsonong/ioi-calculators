import { VIC_MODELS, VIC_SENSOR, VIC_FORMAT, VIC_FORMATS, VIC_MAX_RESOLUTION, VIC_OPTION } from '../constants';

const supports2x2Binning = (model) => {
    return VIC_MODELS.TYPE_253.includes(model)
        || VIC_MODELS.TYPE_255.includes(model)
        || VIC_MODELS.TYPE_273.includes(model);
};

const supportsSubSampling = (model) => {
    return VIC_MODELS.TYPE_250.includes(model)
        || VIC_MODELS.TYPE_252.includes(model)
        || VIC_MODELS.TYPE_253.includes(model)
        || VIC_MODELS.TYPE_255.includes(model)
        || VIC_MODELS.TYPE_273.includes(model);
};

const supportsVerticalBinning = (model) => {
    return VIC_MODELS.TYPE_MONO.includes(model)
        && (VIC_MODELS.TYPE_250.includes(model)
        || VIC_MODELS.TYPE_252.includes(model)
        || VIC_MODELS.TYPE_253.includes(model)
        || VIC_MODELS.TYPE_255.includes(model));
};

export { supports2x2Binning, supportsVerticalBinning, supportsSubSampling };