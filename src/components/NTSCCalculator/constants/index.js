import { INPUT, INPUTS } from './inputs';
import { FORMAT, INPUT_FORMAT } from './formats';
import { COLOR, INPUT_COLOR } from './colors';
import { OPTION, OPTIONS } from './options';

export const ntscDefaultState = {
    cameraType: 'ntsc',	        // Camera type
    input: INPUT.NTSC,          // Input
    format: FORMAT.Type480i,    // Format
    color: COLOR.COLOR,         // Color
    width: 640,                 // Resolution - width
    height: 480,                // Resolution - height
    option: OPTION.FIELD_MODE,  // Option
    frameRate: 59.94,           // Frame-rate
    dataRate: 59.32             // Data-rate (in MB/s)
};

export {
    INPUT,
    INPUTS,
	FORMAT,
    INPUT_FORMAT,
    COLOR,
    INPUT_COLOR,
    OPTION,
    OPTIONS
};