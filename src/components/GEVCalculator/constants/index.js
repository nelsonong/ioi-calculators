import { RESOLUTION, RESOLUTIONS } from './resolutions';

export const gevDefaultState = {
	cameraType: 'gev',				        // Camera type
    bitDepths: [ 8, 10, 12, 14, 16 ],       // Current formats (changes based on model)
    bitDepth: 8,                            // Bit-depth (CoaXPress)
    resolutionPreset: '1920x1080',          // Resolution preset
    width: 1920,                            // Resolution - width
    height: 1080,                           // Resolution - height
    frameRate: 30,                          // Maximum frame-rate
    dataRate: 59.32                         // Data-rate (in MB/s)
};

export {
	RESOLUTION,
	RESOLUTIONS
};