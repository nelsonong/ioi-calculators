import { FORMATS, RESOLUTION, MODE } from '../components/CustomCXCalculator/constants';
import { calculateDataRate } from '../components/CustomCXCalculator/utils/calculateDataRate';
import {
    INITIALIZE_CUSTOM_CX_DVR_STATE,
    UPDATE_CUSTOM_CX_BIT_DEPTH,
    UPDATE_CUSTOM_CX_LINK_COUNT,
    UPDATE_CUSTOM_CX_LINK_SPEED,
    UPDATE_CUSTOM_CX_RESOLUTION_PRESET,
    UPDATE_CUSTOM_CX_WIDTH,
    UPDATE_CUSTOM_CX_HEIGHT,
    UPDATE_CUSTOM_CX_FRAME_RATE
} from '../actions/customCXActions';

const customCXReducer = (state = new Map(), action) => {
    const id = action.id;
    let calculators = new Map(state);
    let calculatorState = calculators.get(id);
    switch (action.type) {
        case INITIALIZE_CUSTOM_CX_DVR_STATE: {
            break;
        }

        case UPDATE_CUSTOM_CX_BIT_DEPTH:
            const { bitDepth } = action;
            calculatorState = Object.assign({}, calculatorState, {
                bitDepth
            });
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_CUSTOM_CX_LINK_COUNT:
            const { linkCount } = action;
            calculatorState = Object.assign({}, calculatorState, {
                linkCount
            });
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_CUSTOM_CX_LINK_SPEED:
            const { linkSpeed } = action;
            calculatorState = Object.assign({}, calculatorState, {
                linkSpeed
            });
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_CUSTOM_CX_RESOLUTION_PRESET: {
            const { resolutionPreset } = action;
            switch (resolutionPreset) {
                case RESOLUTION.CUSTOM:
                    calculatorState = Object.assign({}, calculatorState, {
                        resolutionPreset
                    });
                    break;

                case RESOLUTION.MINIMUM:
                case RESOLUTION.MAXIMUM:
                    calculatorState = Object.assign({}, calculatorState, {
                        resolutionPreset
                    });
                    calculatorState = updateResolution(calculatorState);
                    break;

                default:
                    const [ width, height ] = resolutionPreset.split('x');
                    calculatorState = Object.assign({}, calculatorState, {
                            resolutionPreset,
                            width: Number(width),
                            height: Number(height)
                    });
            }
            calculatorState = updateOutput(calculatorState);
            break;
        }

        case UPDATE_CUSTOM_CX_WIDTH: {
            const { width } = action;
            const resolutionPreset = RESOLUTION.CUSTOM;

            calculatorState = Object.assign({}, calculatorState, {
                width,
                resolutionPreset
            });
            calculatorState = updateOutput(calculatorState);
            break;
        }
        
        case UPDATE_CUSTOM_CX_HEIGHT: {
            const { height } = action;
            const resolutionPreset = RESOLUTION.CUSTOM;

            calculatorState = Object.assign({}, calculatorState, {
                    height,
                    resolutionPreset
            });
            calculatorState = updateOutput(calculatorState);
            break;
        }

        case UPDATE_CUSTOM_CX_FRAME_RATE:
            const { frameRate } = action;
            calculatorState = Object.assign({}, calculatorState, {
                frameRate
            });
            calculatorState = updateOutput(calculatorState);
            break;
            
        default:
            return state;
    }
    
    return calculators.set(id, calculatorState);
};

// Update output
const updateOutput = (calculatorState) => {
    const dataRate = calculateDataRate(calculatorState);
    return Object.assign({}, calculatorState, {
        dataRate
    });
};

export default customCXReducer;