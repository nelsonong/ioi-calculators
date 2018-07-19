import { FORMAT, FORMATS, FORMAT_BITS } from './formats';
import { RESOLUTION, RESOLUTIONS } from './resolutions';
import { MODE } from './modes';

export const customCLDefaultState = {
	cameraType: 'custom-cl',			// Camera type
	format: FORMAT.Output1x8,           // Link format (Camera Link)
	formats: [],
	resolutionPreset: '1920x1080',		// Resolution preset
	width: 1920,                        // Resolution - width
	height: 1080,                       // Resolution - height
	frameRate: 30,                      // Maximum frame-rate
	dataRate: 59.32,                    // Data-rate (in MB/s)
	mode: false      			        // Mode (Base or Full if in DVR calculator)
};

export {
	FORMAT,
	FORMATS,
	FORMAT_BITS,
	RESOLUTION,
	RESOLUTIONS,
	MODE
};