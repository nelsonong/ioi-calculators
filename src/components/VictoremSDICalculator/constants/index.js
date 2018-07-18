export { MODEL, MODELS, COLOR_MODELS } from './models';
export { INTERFACE } from './interfaces';
export { RESOLUTION } from './resolutions';
export { COLOR } from './colors';
export { MODE } from './modes';
export { SDI_TREE } from './sdi-tree';

export const victoremSDIDefaultState = {
	cameraType: 'victorem-sdi',
    model: '',
    models: [],
    sdiInterface: '',
    sdiInterfaces: [],
    width: 0,
    height: 0,
    resolution: '',
    resolutions: [],
    color: '',
    colors: [],
    frameRate: '',
    frameRates: [],
    dataRate: 0,
    mode: false,
    inDVR: false
};