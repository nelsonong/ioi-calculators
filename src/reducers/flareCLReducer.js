import { FORMATS, RESOLUTION, MODE } from '../components/FlareCLCalculator/constants';
import * as resolution from '../components/FlareCLCalculator/utils/resolution';
import { calculateFrameRate } from '../components/FlareCLCalculator/utils/calculateFrameRate';
import { calculateDataRate } from '../components/FlareCLCalculator/utils/calculateDataRate';
import {
    UPDATE_CL_MODEL,
    UPDATE_CL_FORMAT,
    UPDATE_CL_RESOLUTION_PRESET,
    UPDATE_CL_WIDTH,
    UPDATE_CL_HEIGHT,
    UPDATE_CL_SUB_SAMPLING,
    UPDATE_CL_SLOW_MODE
} from '../actions/flareCLActions';

const flareCLReducer = (state = new Map(), action) => {
    const id = action.id;
    let calculators = new Map(state);
    let calculatorState = calculators.get(id);
    switch (action.type) {
        case UPDATE_CL_MODEL:
            const { model } = action;

            // Update hardware version
            const isVersion2 = model.startsWith('12M');
            const hwversion = isVersion2 ? 2 : 1;

            // Update formats
            let formats = model.startsWith('12M') ? FORMATS.CL12m : FORMATS.CL2_4m;
            const { mode } = calculatorState;
            formats = mode ? filterFormats(formats, mode) : formats;

            calculatorState = Object.assign({}, calculatorState, {
                model,
                hwversion,
                formats
            });

            calculatorState = updateResolution(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_CL_FORMAT:
            const { format } = action;
            calculatorState = Object.assign({}, calculatorState, {
                format
            });
            calculatorState = updateResolution(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_CL_RESOLUTION_PRESET: {
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

        case UPDATE_CL_WIDTH: {
            const { width } = action;
            const resolutionPreset = RESOLUTION.CUSTOM;

            // Validate resolution
            const { height } = calculatorState;
            const resolutionTooltip = validateResolution(width, height, calculatorState);
            const error = resolutionTooltip !== '';

            calculatorState = Object.assign({}, calculatorState, {
                width,
                resolutionPreset,
                resolutionTooltip,
                error
            });
            calculatorState = updateOutput(calculatorState);
            break;
        }
        
        case UPDATE_CL_HEIGHT: {
            const { height } = action;
            const resolutionPreset = RESOLUTION.CUSTOM;

            // Validate resolution
            const { width } = calculatorState;
            const resolutionTooltip = validateResolution(width, height, calculatorState);
            const error = resolutionTooltip !== '';

            calculatorState = Object.assign({}, calculatorState, {
                    height,
                    resolutionPreset,
                    resolutionTooltip,
                    error
            });
            calculatorState = updateOutput(calculatorState);
            break;
        }

        case UPDATE_CL_SUB_SAMPLING:
            const { subSampling } = action;
            calculatorState = Object.assign({}, calculatorState, {
                    subSampling
            });
            calculatorState = updateResolution(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_CL_SLOW_MODE:
            const { slowMode } = action;
            calculatorState = Object.assign({}, calculatorState, {
                slowMode
            });
            calculatorState = updateResolution(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;
            
        default:
            return state;
    }
    
    return calculators.set(id, calculatorState);
};

// Update resolution values
const updateResolution = (calculatorState) => {
    const { resolutionPreset, model, format } = calculatorState;

    // Calculate updated resolution values
    const minWidth = resolution.calculateMinWidth(model, format);
    const maxWidth = resolution.calculateMaxWidth(model, format);
    const widthStep = resolution.calculateWidthStep(model);
    const minHeight = resolution.calculateMinHeight(model, format);
    const maxHeight = resolution.calculateMaxHeight(model);
    const heightStep = resolution.calculateHeightStep(model);

    // If min/max preset, update values
    switch (resolutionPreset) {
        case RESOLUTION.MINIMUM:
            calculatorState = Object.assign({}, calculatorState, {
                width: minWidth,
                height: minHeight
            });

        case RESOLUTION.MAXIMUM:
            calculatorState = Object.assign({}, calculatorState, {
                width: maxWidth,
                height: maxHeight
            });

        default:
            return Object.assign({}, calculatorState, {
                minWidth,
                maxWidth,
                widthStep,
                minHeight,
                maxHeight,
                heightStep
            });
    }
};

// Update output
const updateOutput = (calculatorState) => {
    const frameRate = calculateFrameRate(calculatorState);
    const dataRate = calculateDataRate({ ...calculatorState, frameRate });
    return Object.assign({}, calculatorState, {
        frameRate,
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

const validateResolution = (width, height, calculatorState) => {
    const {
        maxWidth,
        maxHeight,
        widthStep,
        heightStep
    } = calculatorState;
    
    // Validate max width
    if (width > maxWidth)
        return `Maximum width is ${maxWidth}px.`;

    // Validate max height
    if (height > maxHeight)
        return `Maximum height is ${maxHeight}px.`;
    
    // Validate width
    let correctMultiple = (width % widthStep) === 0;
    if (!correctMultiple)
        return `Width must be a multiple of ${widthStep}.`;

    // Validate height
    correctMultiple = (height % heightStep) === 0;
    if (!correctMultiple)
        return `Height must be a multiple of ${heightStep}.`;
    
    return '';
}

export default flareCLReducer;