import { MODEL, SENSOR, FORMAT, FORMATS, CAMERA_OPTION, RESOLUTION } from '../components/VictoremCXCalculator/constants';
import * as resolution from '../components/VictoremCXCalculator/utils/resolution';
import { calculateFrameRate } from '../components/VictoremCXCalculator/utils/calculateFrameRate';
import { calculateDataRate } from '../components/VictoremCXCalculator/utils/calculateDataRate';
import * as support from '../components/VictoremCXCalculator/utils/support';
import {
    UPDATE_VICTOREM_CX_MODEL,
    UPDATE_VICTOREM_CX_FORMAT,
    UPDATE_VICTOREM_CX_BIT_DEPTH,
    UPDATE_VICTOREM_CX_RESOLUTION_PRESET,
    UPDATE_VICTOREM_CX_WIDTH,
    UPDATE_VICTOREM_CX_HEIGHT,
    UPDATE_VICTOREM_CX_CAMERA_OPTION
} from '../actions/victoremCXActions';

const victoremCXReducer = (state = new Map(), action) => {
    const id = action.id;
    let calculators = new Map(state);
    let calculatorState = calculators.get(id);
    switch (action.type) {
        case UPDATE_VICTOREM_CX_MODEL:
            const { model } = action;

            // Update formats
            let formats;
            if (model.startsWith('4B')) {
                formats = FORMATS.CX4B;
            } else if (model.startsWith('16B')) {
                formats = FORMATS.CX16B;
            } else {
                formats = FORMATS.CXX;
            }
            
            // Update support
            const supports2x2Binning = support.supports2x2Binning(model);
            const supportsSubSampling = support.supportsSubSampling(model);
            const supportsVerticalBinning = support.supportsVerticalBinning(model);

            calculatorState = Object.assign({}, calculatorState, {
                model,
                sensor: SENSOR[model],
                format: FORMAT.CXP2x1,
                formats,
                supports2x2Binning,
                supportsSubSampling,
                supportsVerticalBinning,
                cameraOption: CAMERA_OPTION.NONE
            });

            calculatorState = updateResolutionProperties(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_VICTOREM_CX_FORMAT:
            const { format } = action;
            calculatorState = Object.assign({}, calculatorState, {
                format
            });
            calculatorState = updateResolutionProperties(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_VICTOREM_CX_BIT_DEPTH:
            const { bitDepth } = action;
            calculatorState = Object.assign({}, calculatorState, {
                bitDepth
            });
            calculatorState = updateResolutionProperties(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_VICTOREM_CX_RESOLUTION_PRESET: {
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

        case UPDATE_VICTOREM_CX_WIDTH: {
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
        
        case UPDATE_VICTOREM_CX_HEIGHT: {
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

        case UPDATE_VICTOREM_CX_CAMERA_OPTION:
            const { cameraOption } = action;
            calculatorState = Object.assign({}, calculatorState, {
                cameraOption
            });
            calculatorState = updateResolutionProperties(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;
            
        default:
            return state;
    }
    
    return calculators.set(id, calculatorState);
};

// Update resolution values
const updateResolutionProperties = (calculatorState) => {
    const { resolutionPreset, model } = calculatorState;

    // Calculate updated resolution values
    const minWidth = resolution.calculateMinWidth(model);
    const maxWidth = resolution.calculateMaxWidth(calculatorState);
    const widthStep = resolution.calculateWidthStep(model);
    const minHeight = resolution.calculateMinHeight(model);
    const maxHeight = resolution.calculateMaxHeight(calculatorState);
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

export default victoremCXReducer;