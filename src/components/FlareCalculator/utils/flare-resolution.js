import { FLARE_LINK, FLARE_CL_MODEL, FLARE_CX_MODEL, FLARE_CL_FORMAT, FLARE_COLOR_MODELS } from '../constants';

const minWidth = (link, model, format) => {
    if (link === FLARE_LINK.CL) {
        return 2 * widthMultiple(link, model, format);
    } else if (link === FLARE_LINK.CX) {
        if (model.startsWith('12M')) return 64;
        return 16;
    } else {    // SDI
        return maxWidth( model );
    }
};

const maxWidth = (model, format) => {
    switch (model) {

        // Camera Link models
        case FLARE_CL_MODEL.Type2M360MCL:
        case FLARE_CL_MODEL.Type2M360CCL:
        case FLARE_CL_MODEL.Type2M360NCL:
        case FLARE_CL_MODEL.Type2M360CCLENR:
        case FLARE_CL_MODEL.Type4M180MCL:
        case FLARE_CL_MODEL.Type4M180CCL:
        case FLARE_CL_MODEL.Type4M180NCL:
            if (format === FLARE_CL_FORMAT.Output3x8) return 2052;
            if (format === FLARE_CL_FORMAT.Output10x8) return 2050;
            return 2048;
       
        case FLARE_CL_MODEL.Type12M125MCL:
        case FLARE_CL_MODEL.Type12M125CCL:
        case FLARE_CL_MODEL.Type12M125NCL:
            if (format === FLARE_CL_FORMAT.Output3x8) return 4104;
            if (format === FLARE_CL_FORMAT.Output10x8) return 4100;
            if (format === FLARE_CL_FORMAT.Output20x8) return 4100;
            return 4096;

        // CoaXPress formats
        case FLARE_CX_MODEL.Type2M280MCX:
        case FLARE_CX_MODEL.Type2M280CCX:
        case FLARE_CX_MODEL.Type2M280NCX:
        case FLARE_CX_MODEL.Type2M280CCXENR:
        case FLARE_CX_MODEL.Type4M140MCX:
        case FLARE_CX_MODEL.Type4M140CCX:
        case FLARE_CX_MODEL.Type4M140NCX:
            return 2048;
        
        case FLARE_CX_MODEL.Type12M180MCX:
        case FLARE_CX_MODEL.Type12M180CCX:
        case FLARE_CX_MODEL.Type12M180NCX:
            return 4096;

        case FLARE_CX_MODEL.Type48M30MCX:
        case FLARE_CX_MODEL.Type48M30CCX:
            return 7920;

        // SDI
        /*
        case Type2KSDI:
        case Type2KMSDI:
        case Type2KNSDI:
        case Type2KSDIENR:
        case Type2KMSDIENR:
        case Type2KNSDIENR:
            return 2048;

        case Type4KSDI:
        case Type4KMSDI:
        case Type4KNSDI:
            return 4096;
        */
        default:
            throw new Error("Unrecognized model type \"" + model + "\".");
    }
};

const minHeight = (link, model) => {
    if (link === FLARE_LINK.CL || link === FLARE_LINK.CX) {
        if (model.startsWith('12M') && link === FLARE_LINK.CX) return 8;
        if (FLARE_COLOR_MODELS.includes(model)) return 4;
        if (model.startsWith('12M')) return 4;
        return 2;
    } else {    // SDI
        return maxHeight(model);
    }
};

const maxHeight = (model) => {
    switch (model) {

        // Camera Link models
        case FLARE_CL_MODEL.Type2M360MCL:
        case FLARE_CL_MODEL.Type2M360CCL:
        case FLARE_CL_MODEL.Type2M360NCL:
        case FLARE_CL_MODEL.Type2M360CCLENR:
            return 1088;
        
        case FLARE_CL_MODEL.Type4M180MCL:
        case FLARE_CL_MODEL.Type4M180CCL:
        case FLARE_CL_MODEL.Type4M180NCL:
            return 2048;
        
        
        case FLARE_CL_MODEL.Type12M125MCL:
        case FLARE_CL_MODEL.Type12M125CCL:
        case FLARE_CL_MODEL.Type12M125NCL:
            return 3072;

        // CoaXPress models
        case FLARE_CX_MODEL.Type2M280MCX:
        case FLARE_CX_MODEL.Type2M280CCX:
        case FLARE_CX_MODEL.Type2M280NCX:
        case FLARE_CX_MODEL.Type2M280CCXENR:
            return 1088;
        
        case FLARE_CX_MODEL.Type4M140MCX:
        case FLARE_CX_MODEL.Type4M140CCX:
        case FLARE_CX_MODEL.Type4M140NCX:
             return 2048;
        
        case FLARE_CX_MODEL.Type12M180MCX:
        case FLARE_CX_MODEL.Type12M180CCX:
        case FLARE_CX_MODEL.Type12M180NCX:
            return 3072;
        
        case FLARE_CX_MODEL.Type48M30MCX:
        case FLARE_CX_MODEL.Type48M30CCX:
            return 6004;

        // SDI models
        /*
        case Type2KSDI:
        case Type2KMSDI:
        case Type2KNSDI:
            return 1088;
        
        case Type2KSDIENR:
        case Type2KMSDIENR:
        case Type2KNSDIENR:
            return 1080;
        
        case Type4KSDI:
        case Type4KMSDI:
        case Type4KNSDI:
            return 3172;
        */
        default:
            throw new Error("Unrecognized model type \"" + model + "\".");
    }
};

const widthMultiple = (link, model, format) => {
    if (link === FLARE_LINK.CL) {
        if (format === FLARE_CL_FORMAT.Output3x8) return 12;
        if (format === FLARE_CL_FORMAT.Output10x8) return 10;
        if (format === FLARE_CL_FORMAT.Output20x8) return 10;
        return 8;
    } else if (link === FLARE_LINK.CX) {
        if (model.startsWith('48M')) return 16;
        if (model.startsWith('12M')) return 64;
        return 8;
    } else {  // TODO: SDI
        return 1;
//        return maxWidth(model);
    }
};

const heightMultiple = (link, model) => {
    if(link === FLARE_LINK.CL || link === FLARE_LINK.CX) {
        if (model.startsWith('12M') && link === FLARE_LINK.CX) return 4;
        if (FLARE_COLOR_MODELS.includes(model)) return 4;
        return 2;
    } else {    // SDI
        return 1
//        return maxHeight(model);
    }
};

export { minWidth, maxWidth, minHeight, maxHeight, widthMultiple, heightMultiple };