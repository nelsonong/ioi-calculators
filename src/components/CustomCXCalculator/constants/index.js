import { LINK_SPEEDS, FORMATS } from './formats';
import { RESOLUTION, RESOLUTIONS, NAN_RESOLUTIONS } from './resolutions';
import { MODE } from './modes';

export const customCXDefaultState = {
	cameraType: 'custom-cx',				// Camera type
    formats: FORMATS.CX2_4m,                // Current formats (changes based on model)
    bitDepth: 8,                            // Bit-depth (CoaXPress)
    linkCount: 1,                           // Link count (CoaXPress)
    linkSpeed: LINK_SPEEDS.CXP3,            // Link speed (CoaXPress)
    resolutionPreset: '1920x1080',          // Resolution preset
    width: 1920,                            // Resolution - width
    height: 1080,                           // Resolution - height
    frameRate: 30,                          // Maximum frame-rate
    dataRate: 59.32                         // Data-rate (in MB/s)
};

export {
	LINK_SPEEDS,
	FORMATS,
	RESOLUTION,
	RESOLUTIONS,
	MODE
};