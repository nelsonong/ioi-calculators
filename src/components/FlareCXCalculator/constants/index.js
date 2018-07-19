import { MODEL, MODELS, COLOR_MODELS } from './models';
import { LINK_SPEEDS, FORMATS } from './formats';
import { RESOLUTION, RESOLUTIONS, NAN_RESOLUTIONS } from './resolutions';
import { MODE } from './modes';

export const flareCXDefaultState = {
	cameraType: 'flare-cx',					// Camera type
    model: MODEL.Type2M280MCX,              // Camera model
    formats: FORMATS.CX2_4m,                // Current formats (changes based on model)
    bitDepth: 8,                            // Bit-depth (CoaXPress)
    linkCount: 1,                           // Link count (CoaXPress)
    linkSpeed: LINK_SPEEDS.CXP3,            // Link speed (CoaXPress)
    resolutionPreset: RESOLUTION.MAXIMUM,   // Resolution preset
    width: 2048,                            // Resolution - width
    widthStep: 8,                           // Acceptable width multiple
    height: 1088,                           // Resolution - height
    heightStep: 2,                          // Acceptable height multiple
    resolutionTooltip: '',                  // Warning if incorrect resolution multiple
    subSampling: false,                     // Sub-sampling enabled
    frameRate: 132.72,                      // Maximum frame-rate
    dataRate: 282.03,                       // Data-rate (in MB/s)
    error: false,                           // Error occured with an input
};

export {
	MODEL,
	MODELS,
	COLOR_MODELS,
	LINK_SPEEDS,
	FORMATS,
	RESOLUTION,
	RESOLUTIONS,
	NAN_RESOLUTIONS,
	MODE
};