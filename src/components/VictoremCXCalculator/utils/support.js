import { MODELS } from '../constants';

const supports2x2Binning = model => MODELS.TYPE_253.includes(model)
  || MODELS.TYPE_255.includes(model)
  || MODELS.TYPE_273.includes(model);

const supportsSubSampling = model => MODELS.TYPE_250.includes(model)
  || MODELS.TYPE_252.includes(model)
  || MODELS.TYPE_253.includes(model)
  || MODELS.TYPE_255.includes(model)
  || MODELS.TYPE_273.includes(model);

const supportsVerticalBinning = model => MODELS.TYPE_MONO.includes(model)
  && (MODELS.TYPE_250.includes(model)
  || MODELS.TYPE_252.includes(model)
  || MODELS.TYPE_253.includes(model)
  || MODELS.TYPE_255.includes(model));

export {
  supports2x2Binning,
  supportsVerticalBinning,
  supportsSubSampling,
};
