import { LINK, COLOR } from '../constants';

export const calculateDataRate = (frameRate, link, resolution, color) => {

    // Extract width + height
    const [ width, height ] = splitResolution(resolution);

    // Determine pixel size
    let pixelSize;
    if (color === COLOR.YCbCr) pixelSize = 20;
    else if (color === COLOR.RGB) pixelSize = 30;

    const dataRate = ( frameRate * width * height * link * pixelSize ) / ( 1024 * 1024 );
    return dataRate.toFixed(2);
};

// Remove parenthesis and split from 'x'
const splitResolution = (resolution) => {
    return resolution.match(/\((.*)\)/).pop().split('x').map(number => Number(number));
};