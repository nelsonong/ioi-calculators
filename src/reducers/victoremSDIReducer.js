import { MODEL, MODELS, INTERFACE, MODE, SDI_TREE } from '../components/VictoremSDICalculator/constants';
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

const victoremSDIReducer = (state = { order: [] }, action) => {
    const {
        cameraId,
        type
    } = action;

    let calculators = { ...state };
    let calculatorState = calculators[cameraId];

    switch (type) {
        case INITIALIZE_VICTOREM_SDI_DVR_STATE: {
            const { mode } = action;

            // Get models
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

            calculatorState = {
                ...calculatorState,
                model,
                models
            };
        }

        case UPDATE_VICTOREM_SDI_MODEL: {
            const { model } = action.model ? action : calculatorState;

            // Get interfaces
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

            calculatorState = {
                ...calculatorState,
                model,
                sdiInterface,
                sdiInterfaces
            };
        }
    
        case UPDATE_VICTOREM_SDI_INTERFACE: {
            const { sdiInterface } = action.sdiInterface ? action : calculatorState;

            // Get resolutions
            const { model } = calculatorState;
            const resolutions = Object.keys(SDI_TREE[model][sdiInterface]);
            const resolution = resolutions[0];
            const [ width, height ] = splitResolution(resolution);

            calculatorState = {
                ...calculatorState,
                sdiInterface,
                width,
                height,
                resolution,
                resolutions
            };
        }
    
        case UPDATE_VICTOREM_SDI_RESOLUTION: {
            const { resolution } = action.resolution ? action : calculatorState;
            
            // Get colors
            const { model, sdiInterface } = calculatorState;
            const colors = Object.keys(SDI_TREE[model][sdiInterface][resolution]);
            const color = colors[0];
            const [ width, height ] = splitResolution(resolution);

            calculatorState = {
                ...calculatorState,
                resolution,
                width,
                height,
                color,
                colors
            };
        }
    
        case UPDATE_VICTOREM_SDI_COLOR: {
            const { color } = action.color ? action : calculatorState;

            // Get frame rates
            const { model, sdiInterface, resolution } = calculatorState;
            const frameRates = SDI_TREE[model][sdiInterface][resolution][color];
            const frameRate = frameRates[0];

            calculatorState = {
                ...calculatorState,
                color,
                frameRate,
                frameRates
            };
        }
    
        case UPDATE_VICTOREM_SDI_FRAME_RATE: {
            const { frameRate } = action.frameRate ? action : calculatorState;

            calculatorState = {
                ...calculatorState,
                frameRate
            };
            calculatorState = updateDataRate(calculatorState);
            break;
        }
            
        default:
            return state;
    }
    
    calculators[cameraId] = calculatorState;
    return calculators;
};

const updateDataRate = (calculatorState) => {
    const {
        width,
        height,
        color,
        frameRate
    } = calculatorState;

    const dataRate = calculateDataRate(frameRate, width, height, color);

    return {
        ...calculatorState,
        dataRate
    };
}

export default victoremSDIReducer;