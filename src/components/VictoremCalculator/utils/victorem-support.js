import { MODELS, SENSOR, FORMAT, FORMATS, MAX_RESOLUTIONS, OPTION } from '../constants';

const supports2x2Binning = (model) => {
    return MODELS.TYPE_253.includes(model)
        || MODELS.TYPE_255.includes(model)
        || MODELS.TYPE_273.includes(model);
};

const supportsSubSampling = (model) => {
    return MODELS.TYPE_250.includes(model)
        || MODELS.TYPE_252.includes(model)
        || MODELS.TYPE_253.includes(model)
        || MODELS.TYPE_255.includes(model)
        || MODELS.TYPE_273.includes(model);
};

const supportsVerticalBinning = (model) => {
    return MODELS.TYPE_MONO.includes(model)
        && (MODELS.TYPE_250.includes(model)
        || MODELS.TYPE_252.includes(model)
        || MODELS.TYPE_253.includes(model)
        || MODELS.TYPE_255.includes(model));
};

export { supports2x2Binning, supportsVerticalBinning, supportsSubSampling };