import { MODEL, MODELS, INTERFACE, LINKS, MODE, SDI_TREE } from '../components/FlareSDICalculator/constants';
import { splitResolution } from '../components/FlareSDICalculator/utils/splitResolution';
import { calculateDataRate } from '../components/FlareSDICalculator/utils/calculateDataRate';
import {
    INITIALIZE_SDI_DVR_STATE,
    UPDATE_SDI_MODEL,
    UPDATE_SDI_INTERFACE,
    UPDATE_SDI_RESOLUTION,
    UPDATE_SDI_COLOR,
    UPDATE_SDI_FRAME_RATE,
    UPDATE_SDI_LINK
} from '../actions/flareSDIActions';

const flareSDIReducer = (state = new Map(), action) => {
    const { id } = action;
    let calculators = new Map(state);
    let calculatorState = calculators.get(id);
    switch (action.type) {
        case INITIALIZE_SDI_DVR_STATE: {
            const { inDVR, mode } = action;
            let models = MODELS;
            let links = LINKS[models[0]];
            if (inDVR) {
                switch (mode) {
                    case MODE.SINGLE:
                        models = [ MODEL.Type2KSDI ];
                        links = [ 1 ];
                        break;
                    case MODE.DUAL:
                        models = [ MODEL.Type2KSDI, MODEL.Type4KSDI ]
                        links = [ 2 ];
                        break;
                    case MODE.QUAD:
                        models = [ MODEL.Type4KSDI ];
                        links = [ 4 ];
                }
            }
            const model = models[0];
            const link = links[0];
            calculatorState = Object.assign({}, calculatorState, {
                model,
                models,
                link,
                links
            });
        }

        case UPDATE_SDI_MODEL: {
            const { model } = action.model ? action : calculatorState;
            let { link, links, mode, inDVR } = calculatorState;
            let sdiInterfaces = Object.keys(SDI_TREE[model]);
            let sdiInterface = sdiInterfaces[0];
            if (inDVR) {
                if (model === MODEL.Type4KSDI) {
                    sdiInterfaces = (mode === MODE.QUAD) ? [ INTERFACE.ST_292, INTERFACE.ST_425_A ] : [ INTERFACE.ST_372 ];
                    sdiInterface = sdiInterfaces[0];
                }
            } else {
                const is2k = model === MODEL.Type2KSDI;
                links = is2k ? LINKS[model] : [ 4 ];
                link = links[0];
            }

            calculatorState = Object.assign({}, calculatorState, {
                model,
                sdiInterface,
                sdiInterfaces,
                link,
                links
            });
        }
    
        case UPDATE_SDI_INTERFACE: {
            const { sdiInterface } = action.sdiInterface ? action : calculatorState;
            const { model, inDVR } = calculatorState;
            const resolutions = Object.keys(SDI_TREE[model][sdiInterface]);
            const resolution = resolutions[0];
            const [ width, height ] = splitResolution(resolution);
            if (inDVR) {
                calculatorState = Object.assign({}, calculatorState, {
                    width,
                    height,
                    resolution,
                    resolutions
                });
            } else {
                let { links } = calculatorState;
                if (model === MODEL.Type4KSDI) {
                    const isQuad = sdiInterface === INTERFACE.ST_292 || sdiInterface === INTERFACE.ST_425_A;
                    links = isQuad ? [ 4 ] : [ 2 ];
                }
                const link = links[0];
                calculatorState = Object.assign({}, calculatorState, {
                    sdiInterface,
                    width,
                    height,
                    resolution,
                    resolutions,
                    link,
                    links
                });
            }
        }
    
        case UPDATE_SDI_RESOLUTION: {
            const { resolution } = action.resolution ? action : calculatorState;
            const { model, sdiInterface } = calculatorState;
            const colors = Object.keys(SDI_TREE[model][sdiInterface][resolution]);
            const color = colors[0];
            const [ width, height ] = splitResolution(resolution);
            calculatorState = Object.assign({}, calculatorState, {
                resolution,
                width,
                height,
                color,
                colors
            });
        }
    
        case UPDATE_SDI_COLOR: {
            const { color } = action.color ? action : calculatorState;
            const { model, sdiInterface, resolution } = calculatorState;
            const frameRates = SDI_TREE[model][sdiInterface][resolution][color];
            const frameRate = frameRates[0];
            calculatorState = Object.assign({}, calculatorState, {
                color,
                frameRate,
                frameRates
            });
        }
    
        case UPDATE_SDI_FRAME_RATE: {
            const { frameRate } = action.frameRate ? action : calculatorState;
            calculatorState = Object.assign({}, calculatorState, {
                frameRate
            });
            calculatorState = updateDataRate(calculatorState);
            break;
        }

        case UPDATE_SDI_LINK: {
            const { link } = action.link ? action : calculatorState;
            calculatorState = Object.assign({}, calculatorState, {
                link
            });
            calculatorState = updateDataRate(calculatorState);
            break;
        }
            
        default:
            return state;
    }

    return calculators.set(id, calculatorState);
};

const updateDataRate = (calculatorState) => {
    const { link, width, height, color, frameRate } = calculatorState;
    const dataRate = calculateDataRate(frameRate, link, width, height, color);
    return Object.assign({}, calculatorState, {
        dataRate
    });
}

export default flareSDIReducer;