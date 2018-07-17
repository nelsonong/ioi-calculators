import { MODEL, FORMAT, COLOR_MODELS } from '../constants';

const calculateMinWidth = (model, format) => 2 * calculateWidthStep(model, format);

const calculateMaxWidth = (model, format) => {
    switch (model) {

        // Camera Link models
        case MODEL.Type2M360MCL:
        case MODEL.Type2M360CCL:
        case MODEL.Type2M360NCL:
        case MODEL.Type2M360CCLENR:
        case MODEL.Type4M180MCL:
        case MODEL.Type4M180CCL:
        case MODEL.Type4M180NCL:
            if (format === FORMAT.Output3x8) return 2052;
            if (format === FORMAT.Output10x8) return 2050;
            return 2048;
       
        case MODEL.Type12M125MCL:
        case MODEL.Type12M125CCL:
        case MODEL.Type12M125NCL:
            if (format === FORMAT.Output3x8) return 4104;
            if (format === FORMAT.Output10x8) return 4100;
            if (format === FORMAT.Output20x8) return 4100;
            return 4096;

        default:
            throw new Error("Unrecognized model type \"" + model + "\".");
    }
};

const calculateMinHeight = (model) => {
    if (COLOR_MODELS.includes(model)) return 4;
    if (model.startsWith('12M')) return 4;
    return 2;
};

const calculateMaxHeight = (model) => {
    switch (model) {
        case MODEL.Type2M360MCL:
        case MODEL.Type2M360CCL:
        case MODEL.Type2M360NCL:
        case MODEL.Type2M360CCLENR:
            return 1088;
        
        case MODEL.Type4M180MCL:
        case MODEL.Type4M180CCL:
        case MODEL.Type4M180NCL:
            return 2048;
        
        
        case MODEL.Type12M125MCL:
        case MODEL.Type12M125CCL:
        case MODEL.Type12M125NCL:
            return 3072;

        default:
            throw new Error("Unrecognized model type \"" + model + "\".");
    }
};

const calculateWidthStep = (model, format) => {
    if (format === FORMAT.Output3x8) return 12;
    if (format === FORMAT.Output10x8) return 10;
    if (format === FORMAT.Output20x8) return 10;
    return 8;
};

const calculateHeightStep = (model) => {
    if (COLOR_MODELS.includes(model)) return 4;
    return 2;
};

export { calculateMinWidth, calculateMaxWidth, calculateMinHeight, calculateMaxHeight, calculateWidthStep, calculateHeightStep };