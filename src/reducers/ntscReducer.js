import { calculateDataRate } from '../components/NTSCCalculator/utils/calculateDataRate';

import {
    INITIALIZE_NTSC_DVR_STATE,
    UPDATE_NTSC_INPUT,
    UPDATE_NTSC_FORMAT,
    UPDATE_NTSC_COLOR,
    UPDATE_NTSC_OPTION
} from '../actions/ntscActions';

import {
    FORMAT,
    INPUT_FORMAT,
    INPUT_COLOR
} from '../components/NTSCCalculator/constants';

const ntscReducer = (state = { order: [] }, action) => {
    const {
        cameraId,
        type
    } = action;

    let calculators = { ...state };
    let calculatorState = calculators[cameraId];

    switch (type) {
        case INITIALIZE_NTSC_DVR_STATE: {
            break;
        }

        case UPDATE_NTSC_INPUT: {
            const { input } = action;

            const format = INPUT_FORMAT[input];
            const color = INPUT_COLOR[input];
            const width = (format === FORMAT.Type480i) ? 640 : 768;
            const height = (format === FORMAT.Type480i) ? 480 : 576;
            const frameRate = (format === FORMAT.Type480i) ? 59.94 : 50;

            calculatorState = {
                ...calculatorState,
                input,
                format,
                color,
                width,
                height,
                frameRate
            };
            
            calculatorState = updateOutput(calculatorState);
            break;
        }

        case UPDATE_NTSC_FORMAT: {
            const { format } = action;

            const frameRate = (format === FORMAT.Type480i) ? 59.94 : 50;

            calculatorState = {
                ...calculatorState,
                format,
                frameRate
            };

            calculatorState = updateOutput(calculatorState);
            break;
        }

        case UPDATE_NTSC_COLOR: {
            const { color } = action;

            calculatorState = {
                ...calculatorState,
                color
            };

            calculatorState = updateOutput(calculatorState);
            break;
        }

        case UPDATE_NTSC_OPTION: {
            const { option } = action;

            calculatorState = {
                ...calculatorState,
                option
            };
            
            calculatorState = updateOutput(calculatorState);
            break;
        }
            
        default:
            return state;
    }
    
    calculators[cameraId] = calculatorState;
    return calculators;
};

// Update output
const updateOutput = (calculatorState) => {
    const dataRate = calculateDataRate(calculatorState);

    return {
        ...calculatorState,
        dataRate
    };
};

export default ntscReducer;