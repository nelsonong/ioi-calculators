import { MODEL, COLOR_MODELS } from '../constants';

const minWidth = (model) => {
    if (model.startsWith('12M')) return 64;
    return 16;
};

const maxWidth = (model) => {
    switch (model) {
        case MODEL.Type2M280MCX:
        case MODEL.Type2M280CCX:
        case MODEL.Type2M280NCX:
        case MODEL.Type2M280CCXENR:
        case MODEL.Type4M140MCX:
        case MODEL.Type4M140CCX:
        case MODEL.Type4M140NCX:
            return 2048;
        
        case MODEL.Type12M180MCX:
        case MODEL.Type12M180CCX:
        case MODEL.Type12M180NCX:
            return 4096;

        case MODEL.Type48M30MCX:
        case MODEL.Type48M30CCX:
            return 7920;

        default:
            throw new Error("Unrecognized model type \"" + model + "\".");
    }
};

const minHeight = (model) => {
    if (model.startsWith('12M')) return 8;
    if (COLOR_MODELS.includes(model)) return 4;
    return 2;
};

const maxHeight = (model) => {
    switch (model) {
        case MODEL.Type2M280MCX:
        case MODEL.Type2M280CCX:
        case MODEL.Type2M280NCX:
        case MODEL.Type2M280CCXENR:
            return 1088;
        
        case MODEL.Type4M140MCX:
        case MODEL.Type4M140CCX:
        case MODEL.Type4M140NCX:
             return 2048;
        
        case MODEL.Type12M180MCX:
        case MODEL.Type12M180CCX:
        case MODEL.Type12M180NCX:
            return 3072;
        
        case MODEL.Type48M30MCX:
        case MODEL.Type48M30CCX:
            return 6004;

        default:
            throw new Error("Unrecognized model type \"" + model + "\".");
    }
};

const widthMultiple = (model) => {
    if (model.startsWith('48M')) return 16;
    if (model.startsWith('12M')) return 64;
    return 8;
};

const heightMultiple = (model) => {
    if (model.startsWith('12M')) return 4;
    if (COLOR_MODELS.includes(model)) return 4;
    return 2;
};

export { minWidth, maxWidth, minHeight, maxHeight, widthMultiple, heightMultiple };