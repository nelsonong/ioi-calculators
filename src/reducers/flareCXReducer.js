import { FORMATS, RESOLUTION, MODE } from '../components/FlareCXCalculator/constants';
import * as resolution from '../components/FlareCXCalculator/utils/resolution';
import { calculateFrameRate } from '../components/FlareCXCalculator/utils/calculateFrameRate';
import { calculateDataRate } from '../components/FlareCXCalculator/utils/calculateDataRate';
import {
    INITIALIZE_FLARE_CX_DVR_STATE,
    UPDATE_FLARE_CX_MODEL,
    UPDATE_FLARE_CX_BIT_DEPTH,
    UPDATE_FLARE_CX_LINK_COUNT,
    UPDATE_FLARE_CX_LINK_SPEED,
    UPDATE_FLARE_CX_RESOLUTION_PRESET,
    UPDATE_FLARE_CX_WIDTH,
    UPDATE_FLARE_CX_HEIGHT,
    UPDATE_FLARE_CX_SUB_SAMPLING
} from '../actions/flareCXActions';

const flareCXReducer = (state = new Map(), action) => {
    const id = action.id;
    let calculators = new Map(state);
    let calculatorState = calculators.get(id);
    switch (action.type) {
        case INITIALIZE_FLARE_CX_DVR_STATE: {
            break;
        }

        case UPDATE_FLARE_CX_MODEL: {
            const { model } = action;

            // Update formats
            let formats;
            if (model.startsWith('48M')) {
                formats = FORMATS.CX48m;
            } else if (model.startsWith('12M')) {
                formats = FORMATS.CX12m;
            } else {
                formats = FORMATS.CX2_4m;
            }
            const bitDepth = formats.BitDepths[0];
            const linkCount = formats.LinkCounts[0];
            const linkSpeed = formats.LinkSpeeds[0];

            calculatorState = Object.assign({}, calculatorState, {
                model,
                formats,
                bitDepth,
                linkCount,
                linkSpeed
            });

            calculatorState = updateResolutionProperties(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;
        }

        case UPDATE_FLARE_CX_BIT_DEPTH:
            const { bitDepth } = action;
            calculatorState = Object.assign({}, calculatorState, {
                bitDepth
            });
            calculatorState = updateResolutionProperties(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_FLARE_CX_LINK_COUNT:
            const { linkCount } = action;
            calculatorState = Object.assign({}, calculatorState, {
                linkCount
            });
            calculatorState = updateResolutionProperties(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_FLARE_CX_LINK_SPEED:
            const { linkSpeed } = action;
            calculatorState = Object.assign({}, calculatorState, {
                linkSpeed
            });
            calculatorState = updateResolutionProperties(calculatorState);
            calculatorState = updateOutput(calculatorState);
            break;

        case UPDATE_FLARE_CX_RESOLUTION_PRESET: {
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

        case UPDATE_FLARE_CX_WIDTH: {
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
        
        case UPDATE_FLARE_CX_HEIGHT: {
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

        case UPDATE_FLARE_CX_SUB_SAMPLING:
            const { subSampling } = action;
            calculatorState = Object.assign({}, calculatorState, {
                    subSampling
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

export default flareCXReducer;