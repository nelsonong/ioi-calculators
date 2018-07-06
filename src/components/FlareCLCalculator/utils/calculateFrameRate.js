import { FORMAT, DUAL_FORMATS } from '../constants';
import { widthMultiple, heightMultiple } from './resolution';

const calculateFrameRate = (parentState) => {

    // Parameters from parent state
    let { model, hwversion, format, bitDepth, linkSpeed, linkCount, width, height, subSampling, slowMode } = parentState;

    // Adjust width and height (if subsampling enabled)
    if (subSampling) {
        width /= 2;
        let step = widthMultiple(model, format);
        let clks = width / step;
        if (width % step) clks++;
        width = clks * step;
        
        height /= 2;
        step = heightMultiple(model);
        let lines = height / step;
        if (height % step) lines++;
        height = lines * step;
    }

    // Frame overhead time + line time
    let { frameOverheadTimeUs, lineTimeUs, frameRate } = calculateCLOverheadAndLineTime(model, hwversion, format, width, slowMode);
    if (frameRate > 0) {
        frameRate = Math.round(frameRate * 100)/100;
        return frameRate + ' FPS [' + width + ' x ' + height + ']';
    }
    if (frameOverheadTimeUs === 0) throw new Error("Frame overhead time is zero.");
    if (lineTimeUs === 0) throw new Error("Line time is zero.");

    // Line scale factor
    const lineScaleFactor = model.startsWith('12M') ? 2 : 1;

    // Frame period
    const framePeriodUs = frameOverheadTimeUs + (height / lineScaleFactor * lineTimeUs);
    if (framePeriodUs === 0) throw new Error("Frame period is zero.");

    // Calculate and return framerate
    frameRate = 1000000.0 / framePeriodUs;
    const frameRateX10 = frameRate * 10;
    frameRate = frameRateX10 / 10.0;
    frameRate = Math.round(frameRate * 100)/100;
    return frameRate;
};

// -------------- Get frame overhead and line time --------------
const calculateCLOverheadAndLineTime = (model, hwversion, format, width, slowMode) => {
    let frameOverheadTimeUs = 0, lineTimeUs = 0;
    if (model.startsWith('2M')) {
        switch (format) {
            case 'Base 8-bit x 2':
            case FORMAT.Output2x10:
                if (width > 1024) {
                    frameOverheadTimeUs = 59;
                    lineTimeUs = 12.90;
                } else if (width > 512) {
                    frameOverheadTimeUs = 46;
                    lineTimeUs = 6.45;
                } else {
                    frameOverheadTimeUs = 39;
                    lineTimeUs = 3.23;
                }
                break;

            case FORMAT.Output3x8:
                if (width > 1704) {
                    frameOverheadTimeUs = 61;
                    lineTimeUs = 8.6;
                } else if (width > 1536) {
                    frameOverheadTimeUs = 51;
                    lineTimeUs = 7.16;
                } else if (width > 1272) {
                    frameOverheadTimeUs = 46;
                    lineTimeUs = 6.45;
                } else if (width > 1020) {
                    frameOverheadTimeUs = 38;
                    lineTimeUs = 5.38;
                } else if (width > 852) {
                    frameOverheadTimeUs = 52;
                    lineTimeUs = 4.3;
                } else if (width > 768) {
                    frameOverheadTimeUs = 43;
                    lineTimeUs = 3.58;
                } else if (width > 636) {
                    frameOverheadTimeUs = 39;
                    lineTimeUs = 3.23;
                } else {
                    frameOverheadTimeUs = 33;
                    lineTimeUs = 2.69;
                }
                break;

            case FORMAT.Output4x8:
            case FORMAT.Output4x10:
                if (width > 1024) {
                    frameOverheadTimeUs = 46;
                    lineTimeUs = 6.45;
                } else {
                    frameOverheadTimeUs = 39;
                    lineTimeUs = 3.23;
                }
                break;

            case FORMAT.Output8x8:
                if (slowMode) {
                    frameOverheadTimeUs = 43;
                    lineTimeUs = 3.58;
                } else {
                    frameOverheadTimeUs = 39;
                    lineTimeUs = 3.23;
                }
                break;

            case FORMAT.Output10x8:
                frameOverheadTimeUs = 33;
                lineTimeUs = 2.69;
                break;

            case FORMAT.Output8x10:
                if (slowMode) {
                    frameOverheadTimeUs = 43;
                    lineTimeUs = 3.58;
                } else {
                    frameOverheadTimeUs = 39;
                    lineTimeUs = 3.23;
                }
                break;

            default:
                throw new Error("Unsupported Camera Link format \"" + format + "\"");
        }
    } else if (model.startsWith('4M')) {
        switch (format) {
            case FORMAT.Output2x8:
            case FORMAT.Output2x10:
                if (width > 1024) {
                    frameOverheadTimeUs = 91;
                    lineTimeUs = 12.90;
                } else if (width > 512) {
                    frameOverheadTimeUs = 78;
                    lineTimeUs = 6.45;
                } else {
                    frameOverheadTimeUs = 71;
                    lineTimeUs = 3.23;
                }
                break;

            case FORMAT.Output3x8:
                if (width > 1704) {
                    frameOverheadTimeUs = 104;
                    lineTimeUs = 8.6;
                } else if (width > 1536) {
                    frameOverheadTimeUs = 86;
                    lineTimeUs = 7.16;
                } else if (width > 1272) {
                    frameOverheadTimeUs = 78;
                    lineTimeUs = 6.45;
                } else if (width > 1020) {
                    frameOverheadTimeUs = 65;
                    lineTimeUs = 5.38;
                } else if (width > 852) {
                    frameOverheadTimeUs = 95;
                    lineTimeUs = 4.3;
                } else if (width > 768) {
                    frameOverheadTimeUs = 79;
                    lineTimeUs = 3.58;
                } else if (width > 636) {
                    frameOverheadTimeUs = 71;
                    lineTimeUs = 3.23;
                } else {
                    frameOverheadTimeUs = 60;
                    lineTimeUs = 2.69;
                }
                break;

            case FORMAT.Output4x8:
            case FORMAT.Output4x10:
                if (width > 1024) {
                    frameOverheadTimeUs = 78;
                    lineTimeUs = 6.45;
                } else {
                    frameOverheadTimeUs = 71;
                    lineTimeUs = 3.23;
                }
                break;

            case FORMAT.Output8x8:
                if (slowMode) {
                    frameOverheadTimeUs = 79;
                    lineTimeUs = 3.58;
                } else {
                    frameOverheadTimeUs = 71;
                    lineTimeUs = 3.23;
                }
                break;

            case FORMAT.Output10x8:
                frameOverheadTimeUs = 60;
                lineTimeUs = 2.69;
                break;

            case FORMAT.Output8x10:
                if (slowMode) {
                    frameOverheadTimeUs = 79;
                    lineTimeUs = 3.58;
                } else {
                    frameOverheadTimeUs = 71;
                    lineTimeUs = 3.23;
                }
                break;

            default:
                throw new Error("Unsupported Camera Link format \"" + format + "\"");
        }
    } else if (model.startsWith('12M')) {
        switch (format) {
            case FORMAT.Output2x8:
            case FORMAT.Output2x10:
                if (hwversion === '2') {
                    if (width > 2048) {
                        frameOverheadTimeUs = 207;
                        lineTimeUs = 51 + 615.0 / 1024.0;
                    } else if (width > 1280) {
                        frameOverheadTimeUs = 129;
                        lineTimeUs = 25 + 819.0 / 1024.0;
                    } else if (width > 1024) {
                        frameOverheadTimeUs = 138;
                        lineTimeUs = 17 + 205.0 / 1024.0;
                    } else if (width > 512) {
                        frameOverheadTimeUs = 104;
                        lineTimeUs = 12 + 922.0 / 1024.0;
                    } else {
                        frameOverheadTimeUs = 91;
                        lineTimeUs = 6.5;
                    }
                } else {
                    frameOverheadTimeUs = 207;
                    lineTimeUs = 51.6;
                }
                break;

            case FORMAT.Output3x8:
                if (hwversion === '2') {
                    if (width > 2040) {
                        frameOverheadTimeUs = 172;
                        lineTimeUs = 34 + 410.0 / 1024.0;
                    } else if (width > 1284) {
                        frameOverheadTimeUs = 86;
                        lineTimeUs = 17 + 205.0 / 1024.0;
                    } else if (width > 1020) {
                        frameOverheadTimeUs = 92;
                        lineTimeUs = 11 + 478.0 / 1024.0;
                    } else if (width > 504) {
                        frameOverheadTimeUs = 69;
                        lineTimeUs = 8 + 615.0 / 1024.0;
                    } else {
                        frameOverheadTimeUs = 61;
                        lineTimeUs = 4 + 308.0 / 1024.0;
                    }
                } else {
                    frameOverheadTimeUs = 207;
                    lineTimeUs = 34.4;
                }
                break;

            case FORMAT.Output4x8:
            case FORMAT.Output4x10:
                if (hwversion === '2') {
                    if (width > 2048) {
                        frameOverheadTimeUs = 129;
                        lineTimeUs = 25 + 820.0 / 1024.0;
                    } else if (width > 1280) {
                        frameOverheadTimeUs = 104;
                        lineTimeUs = 12 + 922.0 / 1024.0;
                    } else if (width > 1024) {
                        frameOverheadTimeUs = 121;
                        lineTimeUs = 8 + 615.0 / 1024.0;
                    } else if (width > 512) {
                        frameOverheadTimeUs = 91;
                        lineTimeUs = 6.5;
                    } else {
                        frameOverheadTimeUs = 46;
                        lineTimeUs = 3 + 282.0 / 1024.0;
                    }
                } else {
                    frameOverheadTimeUs = 155;
                    lineTimeUs = 25.8;
                }
                break;

            case FORMAT.Output8x8:
            case FORMAT.Output8x10:
                if (hwversion === '2') {
                    if (width > 2048) {
                        frameOverheadTimeUs = 104;
                        lineTimeUs = 12 + 922.0 / 1024.0;
                    } else if (width > 1280) {
                        frameOverheadTimeUs = 91;
                        lineTimeUs = 6.5;
                    } else if (width > 1024) {
                        frameOverheadTimeUs = 61;
                        lineTimeUs = 4 + 308.0 / 1024.0;
                    } else if (width > 512) {
                        frameOverheadTimeUs = 46;
                        lineTimeUs = 3 + 282.0 / 1024.0;
                    } else {
                        frameOverheadTimeUs = 33;
                        lineTimeUs = 2 + 354.0 / 1024.0;
                    }
                } else {
                    frameOverheadTimeUs = 117;
                    lineTimeUs = 12.9;
                }
                break;

            case FORMAT.Output10x8:
                if (hwversion === '2') {
                    if (width > 2050) {
                        frameOverheadTimeUs = 104;
                        lineTimeUs = 10 + 392.0 / 1024.0;
                    } else if (width > 1280) {
                        frameOverheadTimeUs = 84;
                        lineTimeUs = 5 + 196.0 / 1024.0;
                    } else if (width > 1020) {
                        frameOverheadTimeUs = 53;
                        lineTimeUs = 3 + 299.0 / 1024.0;
                    } else if (width > 520) {
                        frameOverheadTimeUs = 42;
                        lineTimeUs = 2 + 629.0 / 1024.0;
                    } else {
                        frameOverheadTimeUs = 34;
                        lineTimeUs = 2 + 97.0 / 1024.0;
                    }
                } else {
                    frameOverheadTimeUs = 94;
                    lineTimeUs = 10.38;
                }
                break;

            case DUAL_FORMATS.Output16x8:
            case DUAL_FORMATS.Output16x10:
                if (hwversion === '2') {
                    if (width > 2048) {
                        frameOverheadTimeUs = 91;
                        lineTimeUs = 6 + 461.0 / 1024.0;
                    } else if (width > 1280) {
                        frameOverheadTimeUs = 46;
                        lineTimeUs = 3 + 256.0 / 1024.0;
                    } else {
                        frameOverheadTimeUs = 33;
                        lineTimeUs = 2 + 354.0 / 1024.0;
                    }
                } else {
                    frameOverheadTimeUs = 104;
                    lineTimeUs = 6.45;
                }
                break;

            case DUAL_FORMATS.Output20x8:
                if (hwversion === '2') {
                    if (width > 2050) {
                        frameOverheadTimeUs = 84;
                        lineTimeUs = 5 + 196.0 / 1024.0;
                    } else if (width > 1280) {
                        frameOverheadTimeUs = 42;
                        lineTimeUs = 2 + 610.0 / 1024.0;
                    } else {
                        frameOverheadTimeUs = 34;
                        lineTimeUs = 2 + 97.0 / 1024.0;
                    }
                } else {
                    frameOverheadTimeUs = 73;
                    lineTimeUs = 5.19;
                }
                break;

            default:
                throw new Error("Unsupported Camera Link format \"" + format + "\"");
        }
    } else {
        throw new Error("Unsupported camera type");
    }

    return { frameOverheadTimeUs, lineTimeUs, frameRate: 0 };
};

export { calculateFrameRate, widthMultiple, heightMultiple };