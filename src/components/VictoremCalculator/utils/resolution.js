import { MODELS, FORMAT, OPTION } from '../constants';

const minWidth = (model) => {
    if (MODELS.TYPE_287.includes(model)) return 8;
    //    if (isSdi2k(model)) return 2048;
    //    if (isSdi4k(model)) return 4096;
    return 16;
};

const maxWidth = (parentState) => {

    // Get parameters from parent state
    let { model, format, bitDepth, cameraOption } = parentState;

    const linkSpeed = Number(format.slice(-1));
    const linkCount = Number(format.slice(0, 1));
    const binv = (cameraOption === OPTION.BIN_VERTICAL);
    const bin2 = (cameraOption === OPTION.BIN_2X2);
    const bin0 = !binv && !bin2;
    const subSampling = (cameraOption === OPTION.SUBSAMPLING);

    if (MODELS.TYPE_250.includes(model)) {
        if (subSampling) {
            if (bin0) return 1232;
            return 0;
        }
        if (binv) {
            return MODELS.TYPE_MONO.includes(model) ? 2464 : 0;
        }
        if (bitDepth === 10 && format === FORMAT.CXP3x2) {
            return 1232;
        }
        if (bitDepth === 10 && format === FORMAT.CXP6x1) {
            return 1232;
        }
        if (bitDepth === 12 && format === FORMAT.CXP2x2) {
            return 2200;
        }
        return 2464;
    } else if (MODELS.TYPE_252.includes(model)) {
        if (subSampling) {
            if (bin0) return 1032;
            return 0;
        }
        if (binv) {
            return MODELS.TYPE_MONO.includes(model) ? 2464 : 0;
        }
        return 2064;
    } else if (MODELS.TYPE_253.includes(model) || MODELS.TYPE_255.includes(model)) {
        if (subSampling) {
            if (bin0) return 2056;
            return 0;
        }
        if (binv) {
            return MODELS.TYPE_MONO.includes(model) ? 4112 : 0;
        }
        if (bin2) {
            return 2056;
        }
        return 4112;
    } else if (MODELS.TYPE_273.includes(model)) {
        if (subSampling) {
            if (bin0) return 728;
            return 0;
        }
        if (binv) {
            return MODELS.TYPE_MONO.includes(model) ? 728 : 0;
        }
        if (bin2) {
            return 728;
        }
        return 1456;
    } else if (MODELS.TYPE_287.includes(model)) {
        if (subSampling) return 0;
        if (cameraOption !== OPTION.NONE) return 0;
        if (linkCount === 2) return 0;
        if (linkSpeed === 5 || linkSpeed === 6) return 0;
        return 728;
        //    } else if (isSdi2k(model)) {
        //        return 2048;
        //    } else if (isSdi4k(model)) {
        //        return 4096;
    }
    return 0;
};

const minHeight = (model) => {
    //    if (isSdi2k(model)) return 1080;
    //    if (isSdi4k(model)) return 2160;
    return 4;
};

const maxHeight = (parentState) => {

    // Get parameters from parent state
    let { model, format, bitDepth, cameraOption } = parentState;

    const linkSpeed = Number(format.slice(-1));
    const linkCount = Number(format.slice(0, 1));
    const binv = (cameraOption === OPTION.BIN_VERTICAL);
    const bin2 = (cameraOption === OPTION.BIN_2X2);
    const bin0 = !binv && !bin2;
    const subSampling = (cameraOption === OPTION.SUBSAMPLING);

    if (MODELS.TYPE_250.includes(model)) {
        if (subSampling) {
            if (bin0) return 1028;
            return 0;
        }
        if (binv) {
            return MODELS.TYPE_MONO.includes(model) ? 1028 : 0;
        }
        return 2056;
    } else if (MODELS.TYPE_252.includes(model)) {
        if (subSampling) {
            if (bin0) return 772;
            return 0;
        }
        if (binv) {
            return MODELS.TYPE_MONO.includes(model) ? 772 : 0;
        }
        if (bitDepth === 12 && format === FORMAT.CXP6x2) {
            return 1080;
        }
        if (bitDepth === 12 && format === FORMAT.CXP5x2) {
            return 1080;
        }
        return 1544;
    } else if (MODELS.TYPE_253.includes(model)) {
        if (subSampling) {
            if (bin0) return 1504;
            return 0;
        }
        if (binv) {
            return MODELS.TYPE_MONO.includes(model) ? 1504 : 0;
        }
        if (bin2) {
            return 1504;
        }
        return 3008;
    } else if (MODELS.TYPE_255.includes(model)) {
        if (subSampling) {
            if (bin0) return 1088;
            return 0;
        }
        if (binv) {
            return MODELS.TYPE_MONO.includes(model) ? 1088 : 0;
        }
        if (bin2) {
            return 1088;
        }
        return 2176;
    } else if (MODELS.TYPE_273.includes(model)) {
        if (subSampling) {
            if (bin0) return 544;
            return 0;
        }
        if (binv) {
            return MODELS.TYPE_MONO.includes(model) ? 544 : 0;
        }
        if (bin2) {
            return 544;
        }
        return 1088;
    } else if (MODELS.TYPE_287.includes(model)) {
        if (subSampling) return 0;
        if (cameraOption !== OPTION.NONE) return 0;
        if (linkCount === 2) return 0;
        if (linkSpeed === 5 || linkSpeed === 6) return 0;
        return 544;
//    } else if (isSdi2k(model)) {
//        return 1080;
//    } else if (isSdi4k(model)) {
//        return 2160;
    }
    return 0;
};

export { minWidth, maxWidth, minHeight,  maxHeight };