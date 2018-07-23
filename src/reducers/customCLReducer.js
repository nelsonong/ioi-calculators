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

const customCLReducer = (state = { order: [] }, action) => {
    const {
        cameraId,
        type
    } = action;

    let calculators = { ...state };
    let calculatorState = calculators[cameraId];

    switch (type) {
        case INITIALIZE_CUSTOM_CL_DVR_STATE: {
            const { mode } = action;

            const formats = filterFormats(FORMATS, mode);

            calculatorState = {
                ...calculatorState,
                formats
            };
            calculatorState = updateOutput(calculatorState);
            break;
        }

        case UPDATE_CUSTOM_CL_FORMAT:
            const { format } = action;

            calculatorState = {
                ...calculatorState,
                format
            };
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_CUSTOM_CL_RESOLUTION_PRESET: {
            const { resolutionPreset } = action;

            switch (resolutionPreset) {
                case RESOLUTION.CUSTOM:
                    calculatorState = {
                        ...calculatorState,
                        resolutionPreset
                    };
                    break;

                default:
                    const [ width, height ] = resolutionPreset.split('x');
                    calculatorState = {
                        ...calculatorState,
                        resolutionPreset,
                        width: Number(width),
                        height: Number(height)
                    };
            }
            calculatorState = updateOutput(calculatorState);
            break;
        }

        case UPDATE_CUSTOM_CL_WIDTH: {
            const { width } = action;

            calculatorState = {
                ...calculatorState,
                width,
                resolutionPreset: RESOLUTION.CUSTOM
            };
            calculatorState = updateOutput(calculatorState);
            break;
        }
        
        case UPDATE_CUSTOM_CL_HEIGHT: {
            const { height } = action;

            calculatorState = {
                ...calculatorState,
                height,
                resolutionPreset: RESOLUTION.CUSTOM
            };
            calculatorState = updateOutput(calculatorState);
            break;
        }

        case UPDATE_CUSTOM_CL_FRAME_RATE:
            const { frameRate } = action;

            calculatorState = {
                ...calculatorState,
                frameRate
            };
            calculatorState = updateOutput(calculatorState);
            break;
            
        default:
            return state;
    }
    
    calculators[cameraId] = calculatorState;
    return calculators;
};

// Update output
const updateOutput = (calculatorState) => {
    const dataRate = calculateDataRate({ ...calculatorState });

    return {
        ...calculatorState,
        dataRate
    };
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
};

export default customCLReducer;