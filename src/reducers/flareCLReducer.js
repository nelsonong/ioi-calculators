import { FORMATS, RESOLUTION, MODE } from '../components/FlareCLCalculator/constants';
import * as resolution from '../components/FlareCLCalculator/utils/resolution';
import { calculateFrameRate } from '../components/FlareCLCalculator/utils/calculateFrameRate';
import { calculateDataRate } from '../components/FlareCLCalculator/utils/calculateDataRate';
import {
    INITIALIZE_FLARE_CL_DVR_STATE,
    UPDATE_FLARE_CL_MODEL,
    UPDATE_FLARE_CL_FORMAT,
    UPDATE_FLARE_CL_RESOLUTION_PRESET,
    UPDATE_FLARE_CL_WIDTH,
    UPDATE_FLARE_CL_HEIGHT,
    UPDATE_FLARE_CL_SUB_SAMPLING,
    UPDATE_FLARE_CL_SLOW_MODE
} from '../actions/flareCLActions';

const flareCLReducer = (state = new Map(), action) => {
    const { id, type } = action;
    let calculators = new Map(state);
    let calculatorState = state.get(id);

    switch (type) {
        case INITIALIZE_FLARE_CL_DVR_STATE: {
            const { model, mode } = calculatorState;
            
            let formats = model.startsWith('12M') ? FORMATS.CL12m : FORMATS.CL2_4m;
            if (!!mode) {
                formats = filterFormats(formats, mode);
            }
    
            calculatorState = Object.assign({}, calculatorState, {
                formats
            });
            calculatorState = updateResolutionProperties(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;
        }

        case UPDATE_FLARE_CL_MODEL:
            const { model } = action;

            // Update hardware version
            const isVersion2 = model.startsWith('12M');
            const hwversion = isVersion2 ? 2 : 1;

            // Update formats
            let formats = model.startsWith('12M') ? FORMATS.CL12m : FORMATS.CL2_4m;
            const { mode } = calculatorState;
            formats = !!mode ? filterFormats(formats, mode) : formats;

            calculatorState = Object.assign({}, calculatorState, {
                model,
                hwversion,
                formats
            });

            calculatorState = updateResolutionProperties(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_FLARE_CL_FORMAT:
            const { format } = action;
            calculatorState = Object.assign({}, calculatorState, {
                format
            });
            calculatorState = updateResolutionProperties(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_FLARE_CL_RESOLUTION_PRESET: {
            const { resolutionPreset } = action;
            calculatorState = Object.assign({}, calculatorState, {
                resolutionPreset
            });
            switch (resolutionPreset) {
                case RESOLUTION.CUSTOM:
                    break;

                case RESOLUTION.MINIMUM:
                case RESOLUTION.MAXIMUM:
                    calculatorState = updateResolutionProperties(calculatorState);
                    break;

                default:
                    const [ width, height ] = resolutionPreset.split('x');
                    calculatorState = Object.assign({}, calculatorState, {
                        width: Number(width),
                        height: Number(height)
                    });
            }

            // Validate and set resolution
            const { width, height } = calculatorState;
            calculatorState = updateResolution(width, height, calculatorState);

            calculatorState = updateOutput(calculatorState);
            break;
        }

        case UPDATE_FLARE_CL_WIDTH: {
            const { width } = action;

            // Set custom preset
            calculatorState = Object.assign({}, calculatorState, {
                resolutionPreset: RESOLUTION.CUSTOM
            });

            // Validate and set resolution
            const { height } = calculatorState;
            calculatorState = updateResolution(width, height, calculatorState);
            
            calculatorState = updateOutput(calculatorState);
            break;
        }
        
        case UPDATE_FLARE_CL_HEIGHT: {
            const { height } = action;

            // Set custom preset
            calculatorState = Object.assign({}, calculatorState, {
                resolutionPreset: RESOLUTION.CUSTOM
            });

            // Validate and set resolution
            const { width } = calculatorState;
            calculatorState = updateResolution(width, height, calculatorState);

            calculatorState = updateOutput(calculatorState);
            break;
        }

        case UPDATE_FLARE_CL_SUB_SAMPLING:
            const { subSampling } = action;
            calculatorState = Object.assign({}, calculatorState, {
                    subSampling
            });
            calculatorState = updateResolutionProperties(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_FLARE_CL_SLOW_MODE:
            const { slowMode } = action;
            calculatorState = Object.assign({}, calculatorState, {
                slowMode
            });
            calculatorState = updateResolutionProperties(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;
            
        default:
            return state;
    }
    
    return calculators.set(id, calculatorState);
};

// Update resolution properties
const updateResolutionProperties = (calculatorState) => {
    const { resolutionPreset, model, format } = calculatorState;

    // Calculate updated resolution values
    const minWidth = resolution.calculateMinWidth(model, format);
    const maxWidth = resolution.calculateMaxWidth(model, format);
    const widthStep = resolution.calculateWidthStep(format);
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

const updateResolution = (width, height, calculatorState) => {
    const {
        maxWidth,
        maxHeight,
        widthStep,
        heightStep
    } = calculatorState;
    
    let resolutionTooltip = '';

    // Validate max width
    if (width > maxWidth)
        resolutionTooltip = `Maximum width is ${maxWidth}px.`;

    // Validate max height
    if (height > maxHeight)
        resolutionTooltip = `Maximum height is ${maxHeight}px.`;
    
    // Validate width
    let correctMultiple = (width % widthStep) === 0;
    if (!correctMultiple)
        resolutionTooltip = `Width must be a multiple of ${widthStep}.`;

    // Validate height
    correctMultiple = (height % heightStep) === 0;
    if (!correctMultiple)
        resolutionTooltip = `Height must be a multiple of ${heightStep}.`;

    const error = resolutionTooltip !== '';
    
    return Object.assign({}, calculatorState, {
        width,
        height,
        resolutionTooltip,
        error
    });
}

export default flareCLReducer;