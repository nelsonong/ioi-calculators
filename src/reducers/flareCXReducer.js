import { FORMATS, RESOLUTION, MODE } from '../components/FlareCXCalculator/constants';
import * as resolution from '../components/FlareCXCalculator/utils/resolution';
import { calculateFrameRate } from '../components/FlareCXCalculator/utils/calculateFrameRate';
import { calculateDataRate } from '../components/FlareCXCalculator/utils/calculateDataRate';
import {
    UPDATE_CX_MODEL,
    UPDATE_CX_BIT_DEPTH,
    UPDATE_CX_LINK_COUNT,
    UPDATE_CX_LINK_SPEED,
    UPDATE_CX_RESOLUTION_PRESET,
    UPDATE_CX_WIDTH,
    UPDATE_CX_HEIGHT,
    UPDATE_CX_SUB_SAMPLING
} from '../actions/flareCXActions';

const flareCXReducer = (state = new Map(), action) => {
    const id = action.id;
    let calculators = new Map(state);
    let calculatorState = calculators.get(id);
    switch (action.type) {
        case UPDATE_CX_MODEL:
            const { model } = action;
            console.log(model);

            // Update formats
            let formats;
            if (model.startsWith('48M')) {
                formats = FORMATS.CX48m;
            } else if (model.startsWith('12M')) {
                formats = FORMATS.CX12m;
            } else {
                formats = FORMATS.CX2_4m;
            }

            calculatorState = Object.assign({}, calculatorState, {
                model,
                formats
            });

            calculatorState = updateResolution(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_CX_BIT_DEPTH:
            const { bitDepth } = action;
            calculatorState = Object.assign({}, calculatorState, {
                bitDepth
            });
            calculatorState = updateResolution(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_CX_LINK_COUNT:
            const { linkCount } = action;
            calculatorState = Object.assign({}, calculatorState, {
                linkCount
            });
            calculatorState = updateResolution(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_CX_LINK_SPEED:
            const { linkSpeed } = action;
            calculatorState = Object.assign({}, calculatorState, {
                linkSpeed
            });
            calculatorState = updateResolution(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_CX_RESOLUTION_PRESET: {
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

        case UPDATE_CX_WIDTH: {
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
        
        case UPDATE_CX_HEIGHT: {
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

        case UPDATE_CX_SUB_SAMPLING:
            const { subSampling } = action;
            calculatorState = Object.assign({}, calculatorState, {
                    subSampling
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
    const { resolutionPreset, model } = calculatorState;

    // Calculate updated resolution values
    const minWidth = resolution.calculateMinWidth(model);
    const maxWidth = resolution.calculateMaxWidth(model);
    const widthStep = resolution.calculateWidthStep(model);
    const minHeight = resolution.calculateMinHeight(model);
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

export default flareCXReducer;