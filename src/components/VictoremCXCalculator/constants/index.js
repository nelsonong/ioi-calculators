import { MODEL, MODELS } from './models';
import { SENSOR } from './sensors';
import { FORMAT, FORMATS, BIT_DEPTHS } from './formats';
import { RESOLUTION, RESOLUTIONS, NAN_RESOLUTIONS, MAX_RESOLUTIONS } from './resolutions';
import { CAMERA_OPTION } from './camera-options';

export const victoremCXDefaultState = {
    cameraType: 'victorem-cx',              // Camera type
    model: MODEL.Type51B163MCX,             // Camera model
    sensor: SENSOR[MODEL.Type51B163MCX],    // Camera's sensor
    format: FORMAT.CXP2x1,                  // Current format selected
    formats: FORMATS.CXX,                   // Formats supported by camera
    bitDepth: 8,                            // Bit depth
    resolutionPreset: RESOLUTION.MAXIMUM,   // Resolution preset selected
    width: 2464,                            // Width
    widthStep: 16,                          // Acceptable width multiple
    maxWidth: 2464,
    height: 2056,                           // Height
    heightStep: 4,                          // Acceptable height multiple
    maxHeight: 2056,
    resolutionTooltip: '',                  // Warning if incorrect resolution multiple
    cameraOption: CAMERA_OPTION.NONE,       // Camera options [none, sub-sample, vertical bin, 2x2 bin]
    frameRate: 46.66,                       // Maximum frame-rate
    dataRate: 225.43,                       // Data-rate
    supports2x2Binning: true,               // 2x2 binning supported by camera
    supportsSubSampling: true,              // Sub-sampling supported by camera
    supportsVerticalBinning: true,          // Vertical binning supported by camera
    error: false,                           // Error occured with an input
};

export {
    MODEL,
    MODELS,
    SENSOR,
    FORMAT,
    FORMATS,
    BIT_DEPTHS,
    RESOLUTION,
    RESOLUTIONS,
    NAN_RESOLUTIONS,
    MAX_RESOLUTIONS,
    CAMERA_OPTION
};