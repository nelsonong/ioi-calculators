import { MODEL, MODELS, INTERFACE, LINKS, MODE, SDI_TREE } from '../components/VictoremSDICalculator/constants';
import { splitResolution } from '../components/VictoremSDICalculator/utils/splitResolution';
import { calculateDataRate } from '../components/VictoremSDICalculator/utils/calculateDataRate';
import {
    INITIALIZE_VICTOREM_SDI_DVR_STATE,
    UPDATE_VICTOREM_SDI_MODEL,
    UPDATE_VICTOREM_SDI_INTERFACE,
    UPDATE_VICTOREM_SDI_RESOLUTION,
    UPDATE_VICTOREM_SDI_COLOR,
    UPDATE_VICTOREM_SDI_FRAME_RATE
} from '../actions/victoremSDIActions';

const victoremSDIReducer = (state = new Map(), action) => {
    const { id } = action;
    let calculators = new Map(state);
    let calculatorState = calculators.get(id);
    switch (action.type) {
        case INITIALIZE_VICTOREM_SDI_DVR_STATE: {
            const { mode } = action;
            let models = MODELS;
            if (!!mode) {
                switch (mode) {
                    case MODE.SINGLE:
                        models = [ MODEL.Type2KSDIMini, MODEL.Type4KSDIMini ];
                        break;

                    case MODE.DUAL:
                        models = [ MODEL.Type4KSDIMini ]
                        break;

                    case MODE.QUAD:
                        models = [ MODEL.Type4KSDIMini ];
                }
            }
            const model = models[0];
            calculatorState = Object.assign({}, calculatorState, {
                model,
                models
            });
        }

        case UPDATE_VICTOREM_SDI_MODEL: {
            const { model } = action.model ? action : calculatorState;
            let { mode } = calculatorState;
            let sdiInterfaces = Object.keys(SDI_TREE[model]);
            if (!!mode) {
                if (model === MODEL.Type4KSDIMini) {
                    const { HD_SDI, S_3G_SDI, D_3G_SDI, Q_3G_SDI, S_6G_SDI, S_12G_SDI } = INTERFACE;
                    switch (mode) {
                        case MODE.SINGLE:
                            sdiInterfaces = [ HD_SDI, S_3G_SDI, S_6G_SDI, S_12G_SDI ];
                            break;

                        case MODE.DUAL:
                            sdiInterfaces = [ D_3G_SDI ];
                            break;

                        case MODE.QUAD:
                            sdiInterfaces = [ Q_3G_SDI ];
                    }
                } else if (model === MODEL.Type2KSDIMini) {
                    sdiInterfaces = [ HD_SDI, S_3G_SDI, S_6G_SDI, S_12G_SDI ];
                }
            }
            const sdiInterface = sdiInterfaces[0];

            calculatorState = Object.assign({}, calculatorState, {
                model,
                sdiInterface,
                sdiInterfaces
            });
        }
    
        case UPDATE_VICTOREM_SDI_INTERFACE: {
            const { sdiInterface } = action.sdiInterface ? action : calculatorState;
            const { model } = calculatorState;
            const resolutions = Object.keys(SDI_TREE[model][sdiInterface]);
            const resolution = resolutions[0];
            const [ width, height ] = splitResolution(resolution);
            calculatorState = Object.assign({}, calculatorState, {
                sdiInterface,
                width,
                height,
                resolution,
                resolutions
            });
        }
    
        case UPDATE_VICTOREM_SDI_RESOLUTION: {
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
    
        case UPDATE_VICTOREM_SDI_COLOR: {
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
    
        case UPDATE_VICTOREM_SDI_FRAME_RATE: {
            const { frameRate } = action.frameRate ? action : calculatorState;
            calculatorState = Object.assign({}, calculatorState, {
                frameRate
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
    const { width, height, color, frameRate } = calculatorState;
    const dataRate = calculateDataRate(frameRate, width, height, color);
    return Object.assign({}, calculatorState, {
        dataRate
    });
}

export default victoremSDIReducer;