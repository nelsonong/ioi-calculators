import { FORMATS, RESOLUTION, MODE } from '../components/CustomCLCalculator/constants';
import { calculateDataRate } from '../components/CustomCLCalculator/utils/calculateDataRate';
import {
    INITIALIZE_CUSTOM_CL_DVR_STATE,
    UPDATE_CUSTOM_CL_FORMAT,
    UPDATE_CUSTOM_CL_RESOLUTION_PRESET,
    UPDATE_CUSTOM_CL_WIDTH,
    UPDATE_CUSTOM_CL_HEIGHT,
    UPDATE_CUSTOM_CL_FRAME_RATE
} from '../actions/customCLActions';

const customCLReducer = (state = new Map(), action) => {
    const { id, type } = action;
    let calculators = new Map(state);
    let calculatorState = state.get(id);

    switch (type) {
        case INITIALIZE_CUSTOM_CL_DVR_STATE: {
            const { mode } = action;
            const formats = filterFormats(FORMATS, mode);

            calculatorState = Object.assign({}, calculatorState, {
                formats
            });
            calculatorState = updateOutput(calculatorState);
            break;
        }

        case UPDATE_CUSTOM_CL_FORMAT:
            const { format } = action;
            calculatorState = Object.assign({}, calculatorState, {
                format
            });
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_CUSTOM_CL_RESOLUTION_PRESET: {
            const { resolutionPreset } = action;
            switch (resolutionPreset) {
                case RESOLUTION.CUSTOM:
                    calculatorState = Object.assign({}, calculatorState, {
                        resolutionPreset
                    });
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

        case UPDATE_CUSTOM_CL_WIDTH: {
            const { width } = action;
            const resolutionPreset = RESOLUTION.CUSTOM;

            calculatorState = Object.assign({}, calculatorState, {
                width,
                resolutionPreset
            });
            calculatorState = updateOutput(calculatorState);
            break;
        }
        
        case UPDATE_CUSTOM_CL_HEIGHT: {
            const { height } = action;
            const resolutionPreset = RESOLUTION.CUSTOM;

            calculatorState = Object.assign({}, calculatorState, {
                    height,
                    resolutionPreset
            });
            calculatorState = updateOutput(calculatorState);
            break;
        }

        case UPDATE_CUSTOM_CL_FRAME_RATE:
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
    const dataRate = calculateDataRate({ ...calculatorState });
    return Object.assign({}, calculatorState, {
        dataRate
    });
};

const filterFormats = (formats, mode) => {
    switch (mode) {
        case MODE.BASE:
            return formats.filter(clFormat => clFormat.startsWith('Base'));
        case MODE.FULL:
            return formats.filter(clFormat => !clFormat.startsWith('Base'));
        case MODE.DUAL_FULL:
            return formats.filter(clFormat => (clFormat.startsWith('80') || clFormat.startsWith('Dual')));
        default:
            throw new Error('Mode not found.');
    }
}

export default customCLReducer;