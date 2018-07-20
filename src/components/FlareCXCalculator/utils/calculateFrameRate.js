import { LINK_SPEEDS } from '../constants';
import { calculateWidthStep, calculateHeightStep } from './resolution';

const calculateFrameRate = ({
    model,
    format,
    bitDepth,
    linkSpeed,
    linkCount,
    width,
    height,
    subSampling
}) => {
    // Adjust width and height (if subsampling enabled)
    if (subSampling) {
        width /= 2;
        let step = calculateWidthStep(model, format);
        let clks = width / step;
        if (width % step) clks++;
        width = clks * step;
        
        height /= 2;
        step = calculateHeightStep(model);
        let lines = height / step;
        if (height % step) lines++;
        height = lines * step;
    }

    // Frame overhead time + line time
    let { frameOverheadTimeUs, lineTimeUs, frameRate } = 
        calculateCXOverheadAndLineTime(model, bitDepth, width, height, linkSpeed, linkCount);
    if (frameRate > 0) {
        return frameRate.toFixed(2);
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
    return frameRate.toFixed(2);
};

// -------------- Get frame overhead and line time --------------
const calculateCXOverheadAndLineTime = (model, bitDepth, width, height, linkSpeed, linkCount) => {

    // Selected CoaXPress format options
    const is8bit = bitDepth === 8;
    const is10bit = bitDepth === 10;
    const is12bit = bitDepth === 12;
    const is2G = linkSpeed === LINK_SPEEDS.CXP2;
    const is3G = linkSpeed === LINK_SPEEDS.CXP3;
    const is5G = linkSpeed === LINK_SPEEDS.CXP5;
    const is6G = linkSpeed === LINK_SPEEDS.CXP6;
    const isSingleLink = linkCount === 1;
    const isDualLink = linkCount === 2;
    const isQuadLink = linkCount === 4;

    // Initialization
    let frameOverheadTimeUs = 0, lineTimeUs = 0;

    if (model.startsWith('2M')) {
        if (is8bit && isSingleLink) {
            if (width > 1792) {
                frameOverheadTimeUs = 49;
                lineTimeUs = 6.88;
            } else if (width > 1536) {
                frameOverheadTimeUs = 43;
                lineTimeUs = 6.14;
            } else if (width > 1024) {
                frameOverheadTimeUs = 38;
                lineTimeUs = 5.38;
            } else if (width > 896) {
                frameOverheadTimeUs = 42;
                lineTimeUs = 3.44;
            } else if (width > 768) {
                frameOverheadTimeUs = 37;
                lineTimeUs = 3.07;
            } else {
                frameOverheadTimeUs = 33;
                lineTimeUs = 2.69;
            }
        } else if (is10bit && isSingleLink) {
            if (width > 1792) {
                frameOverheadTimeUs = 61;
                lineTimeUs = 8.6;
            } else if (width > 1536) {
                frameOverheadTimeUs = 54;
                lineTimeUs = 7.59;
            } else if (width > 1280) {
                frameOverheadTimeUs = 46;
                lineTimeUs = 6.45;
            } else if (width > 1024) {
                frameOverheadTimeUs = 38;
                lineTimeUs = 5.38;
            } else if (width > 896) {
                frameOverheadTimeUs = 52;
                lineTimeUs = 4.3;
            } else if (width > 768) {
                frameOverheadTimeUs = 46;
                lineTimeUs = 3.79;
            } else if (width > 640) {
                frameOverheadTimeUs = 39;
                lineTimeUs = 3.23;
            } else {
                frameOverheadTimeUs = 33;
                lineTimeUs = 2.69;
            }
        } else if (is8bit && isDualLink) {
            if (width > 1792) {
                frameOverheadTimeUs = 42;
                lineTimeUs = 3.44;
            } else if (width > 1536) {
                frameOverheadTimeUs = 37;
                lineTimeUs = 3.07;
            } else {
                frameOverheadTimeUs = 33;
                lineTimeUs = 2.69;
            }
        } else if (is10bit && isDualLink) {
            if (width > 1792) {
                frameOverheadTimeUs = 52;
                lineTimeUs = 4.3;
            } else if (width > 1536) {
                frameOverheadTimeUs = 46;
                lineTimeUs = 3.79;
            } else if (width > 1280) {
                frameOverheadTimeUs = 39;
                lineTimeUs = 3.23;
            } else {
                frameOverheadTimeUs = 33;
                lineTimeUs = 2.69;
            }
        } else {
            throw new Error("Unsupported mode");
        }
    } else if (model.startsWith('4M')) {
        if (is8bit && isSingleLink) {
            if (width > 1792) {
                frameOverheadTimeUs = 83;
                lineTimeUs = 6.88;
            } else if (width > 1536) {
                frameOverheadTimeUs = 74;
                lineTimeUs = 6.14;
            } else if (width > 1024) {
                frameOverheadTimeUs = 65;
                lineTimeUs = 5.38;
            } else if (width > 896) {
                frameOverheadTimeUs = 76;
                lineTimeUs = 3.44;
            } else if (width > 768) {
                frameOverheadTimeUs = 68;
                lineTimeUs = 3.07;
            } else {
                frameOverheadTimeUs = 60;
                lineTimeUs = 2.69;
            }
        } else if (is10bit && isSingleLink) {
            if (width > 1792) {
                frameOverheadTimeUs = 104;
                lineTimeUs = 8.6;
            } else if (width > 1536) {
                frameOverheadTimeUs = 92;
                lineTimeUs = 7.59;
            } else if (width > 1280) {
                frameOverheadTimeUs = 78;
                lineTimeUs = 6.45;
            } else if (width > 1024) {
                frameOverheadTimeUs = 65;
                lineTimeUs = 5.38;
            } else if (width > 896) {
                frameOverheadTimeUs = 95;
                lineTimeUs = 4.3;
            } else if (width > 768) {
                frameOverheadTimeUs = 84;
                lineTimeUs = 3.79;
            } else if (width > 640) {
                frameOverheadTimeUs = 71;
                lineTimeUs = 3.23;
            } else {
                frameOverheadTimeUs = 60;
                lineTimeUs = 2.69;
            }
        } else if (is8bit && isDualLink) {
            if (width > 1792) {
                frameOverheadTimeUs = 76;
                lineTimeUs = 3.44;
            } else if (width > 1536) {
                frameOverheadTimeUs = 68;
                lineTimeUs = 3.07;
            } else {
                frameOverheadTimeUs = 60;
                lineTimeUs = 2.69;
            }
        } else if (is10bit && isDualLink) {
            if (width > 1792) {
                frameOverheadTimeUs = 95;
                lineTimeUs = 4.3;
            } else if (width > 1536) {
                frameOverheadTimeUs = 84;
                lineTimeUs = 3.79;
            } else if (width > 1280) {
                frameOverheadTimeUs = 71;
                lineTimeUs = 3.23;
            } else {
                frameOverheadTimeUs = 60;
                lineTimeUs = 2.69;
            }
        } else {
            throw new Error("Unsupported mode");
        }
    } else if (model.startsWith('12M')) {
        if (is8bit && isSingleLink && is3G) {
            if (width > 2048) {
                frameOverheadTimeUs = 165.12;
                lineTimeUs = 27.52;
            } else if (width > 1024) {
                frameOverheadTimeUs = 137.6;
                lineTimeUs = 13.76;
            } else if (width > 512) {
                frameOverheadTimeUs = 66.8;
                lineTimeUs = 6.88;
            } else {
                frameOverheadTimeUs = 55.02;
                lineTimeUs = 3.44;
            }
        } else if (is10bit && isSingleLink && is3G) {
            if (width > 2048) {
                frameOverheadTimeUs = 172;
                lineTimeUs = 34.4;
            } else if (width > 1024) {
                frameOverheadTimeUs = 137.6;
                lineTimeUs = 17.2;
            } else if (width > 512) {
                frameOverheadTimeUs = 120.4;
                lineTimeUs = 8.6;
            } else {
                frameOverheadTimeUs = 60.2;
                lineTimeUs = 4.3;
            }
        } else if (is8bit && ((isDualLink && is3G) || (isSingleLink && is6G))) {
            if (width > 2048) {
                frameOverheadTimeUs = 137.6;
                lineTimeUs = 13.76;
            } else if (width > 1024) {
                frameOverheadTimeUs = 68.8;
                lineTimeUs = 6.88;
            } else if (width > 576) {
                frameOverheadTimeUs = 55.02;
                lineTimeUs = 3.44;
            } else {
                frameOverheadTimeUs = 30.72;
                lineTimeUs = 1.92;
            }
        } else if (is10bit && ((isDualLink && is3G) || (isSingleLink && is6G))) {
            if (width > 2048) {
                frameOverheadTimeUs = 137.6;
                lineTimeUs = 17.2;
            } else if (width > 1024) {
                frameOverheadTimeUs = 120.4;
                lineTimeUs = 8.6;
            } else if (width > 512) {
                frameOverheadTimeUs = 60.2;
                lineTimeUs = 4.3;
            } else {
                frameOverheadTimeUs = 30.1;
                lineTimeUs = 2.15;
            }
        } else if (is8bit && ((isQuadLink && is3G) || (isDualLink && is6G))) {
            if (width > 2048) {
                frameOverheadTimeUs = 68.8;
                lineTimeUs = 6.88;
            } else if (width > 1088) {
                frameOverheadTimeUs = 55.02;
                lineTimeUs = 3.44;
            } else {
                frameOverheadTimeUs = 30.72;
                lineTimeUs = 1.92;
            }
        } else if (is10bit && ((isQuadLink && is3G) || (isDualLink && is6G))) {
            if (width > 2048) {
                frameOverheadTimeUs = 120.4;
                lineTimeUs = 8.6;
            } else if (width > 1024) {
                frameOverheadTimeUs = 60.2;
                lineTimeUs = 4.3;
            } else {
                frameOverheadTimeUs = 30.1;
                lineTimeUs = 2.15;
            }
        } else if (is8bit && isQuadLink && is6G) {
            if (width > 2240) {
                frameOverheadTimeUs = 55.02;
                lineTimeUs = 3.44;
            } else {
                frameOverheadTimeUs = 30.72;
                lineTimeUs = 1.92;
            }
        } else if (is10bit && isQuadLink && is6G) {
            if (width > 2048) {
                frameOverheadTimeUs = 60.2;
                lineTimeUs = 4.3;
            } else {
                frameOverheadTimeUs = 30.1;
                lineTimeUs = 2.15;
            }
        } else if (is8bit && isSingleLink && is5G) {
            if (width > 2048) {
                frameOverheadTimeUs = 192;
                lineTimeUs = 19.2;
            } else if (width > 1024) {
                frameOverheadTimeUs = 96;
                lineTimeUs = 9.6;
            } else if (width > 512) {
                frameOverheadTimeUs = 48;
                lineTimeUs = 4.8;
            } else {
                frameOverheadTimeUs = 38.4;
                lineTimeUs = 2.4;
            }
        } else if (is10bit && isSingleLink && is5G) {
            if (width > 2048) {
                frameOverheadTimeUs = 192;
                lineTimeUs = 24;
            } else if (width > 1024) {
                frameOverheadTimeUs = 168;
                lineTimeUs = 12;
            } else if (width > 512) {
                frameOverheadTimeUs = 84;
                lineTimeUs = 6;
            } else {
                frameOverheadTimeUs = 42;
                lineTimeUs = 3;
            }
        } else if (is8bit && isDualLink && is5G) {
            if (width > 2048) {
                frameOverheadTimeUs = 96;
                lineTimeUs = 9.6;
            } else if (width > 1024) {
                frameOverheadTimeUs = 48;
                lineTimeUs = 4.8;
            } else if (width > 512) {
                frameOverheadTimeUs = 38.4;
                lineTimeUs = 2.4;
            } else {
                frameOverheadTimeUs = 30.72;
                lineTimeUs = 1.92;
            }
        } else if (is10bit && isDualLink && is5G) {
            if (width > 2048) {
                frameOverheadTimeUs = 84;
                lineTimeUs = 12;
            } else if (width > 1024) {
                frameOverheadTimeUs = 42;
                lineTimeUs = 6;
            } else if (width > 512) {
                frameOverheadTimeUs = 21;
                lineTimeUs = 3;
            } else {
                frameOverheadTimeUs = 15.05;
                lineTimeUs = 2.15;
            }
        } else if (is8bit && isQuadLink && is5G) {
            if (width > 2048) {
                frameOverheadTimeUs = 48;
                lineTimeUs = 4.8;
            } else if (width > 1024) {
                frameOverheadTimeUs = 38.4;
                lineTimeUs = 2.4;
            } else {
                frameOverheadTimeUs = 30.72;
                lineTimeUs = 1.92;
            }
        } else if (is10bit && isQuadLink && is5G) {
            if (width > 2048) {
                frameOverheadTimeUs = 84;
                lineTimeUs = 6;
            } else if (width > 1024) {
                frameOverheadTimeUs = 42;
                lineTimeUs = 3;
            } else {
                frameOverheadTimeUs = 30.1;
                lineTimeUs = 2.15;
            }
        } else {
            throw new Error("Unsupported mode.");
        }
    } else if (model.startsWith('48M')) {
        let widthModeParam = 0;
        if (is2G) {
            if (isSingleLink) {
                if (is8bit) widthModeParam = 20144;
                else if (is10bit) widthModeParam = 24984;
                else if (is12bit) widthModeParam = 30400;
            } else if (isDualLink) {
                if (is8bit) widthModeParam = 10072;
                else if (is10bit) widthModeParam = 12492;
                else if (is12bit) widthModeParam = 15200;
            } else if (isQuadLink) {
                if (is8bit) widthModeParam = 5036;
                else if (is10bit) widthModeParam = 6246;
                else if (is12bit) widthModeParam = 7600;
            }
        } else if (is3G) {
            if (isSingleLink) {
                if (is8bit) widthModeParam = 16116;
                else if (is10bit) widthModeParam = 19987;
                else if (is12bit) widthModeParam = 24320;
            } else if (isDualLink) {
                if (is8bit) widthModeParam = 8058;
                else if (is10bit) widthModeParam = 9994;
                else if (is12bit) widthModeParam = 12160;
            } else if (isQuadLink) {
                if (is8bit) widthModeParam = 4029;
                else if (is10bit) widthModeParam = 4997;
                else if (is12bit) widthModeParam = 6080;
            }
        } else if (is5G) {
            if (isSingleLink) {
                if (is8bit) widthModeParam = 10378;
                else if (is10bit) widthModeParam = 12911;
                else if (is12bit) widthModeParam = 15566;
            } else if (isDualLink) {
                if (is8bit) widthModeParam = 5189;
                else if (is10bit) widthModeParam = 6456;
                else if (is12bit) widthModeParam = 7783;
            } else if (isQuadLink) {
                if (is8bit) widthModeParam = 2595;
                else if (is10bit) widthModeParam = 3228;
                else if (is12bit) widthModeParam = 3892;
            }
        } else if (is6G) {
            if (isSingleLink) {
                if (is8bit) widthModeParam = 8058;
                else if (is10bit) widthModeParam = 9994;
                else if (is12bit) widthModeParam = 12160;
            } else if (isDualLink) {
                if (is8bit) widthModeParam = 4029;
                else if (is10bit) widthModeParam = 4997;
                else if (is12bit) widthModeParam = 6080;
            } else if (isQuadLink) {
                if (is8bit) widthModeParam = 2015;
                else if (is10bit) widthModeParam = 2499;
                else if (is12bit) widthModeParam = 3040;
            }
        }

        if (widthModeParam === 0) throw new Error("widthModeParam is zero.");

        const widthFactor = Math.max(370.0, Math.ceil(width * widthModeParam / 65536.0));
        const readoutOverhead = 2 * Math.ceil(1173 / widthFactor) + 7;
        const readoutTime = (readoutOverhead + height) * widthFactor * 0.014458;
        const framePeriod = 150 + readoutTime;
        const frameRate = 1000000 / framePeriod;

        return { frameOverheadTimeUs, lineTimeUs, frameRate };
    } else {
        throw new Error("Unsupported camera type.");
    }
    
    return { frameOverheadTimeUs, lineTimeUs, frameRate: 0 };
};

export { calculateFrameRate };