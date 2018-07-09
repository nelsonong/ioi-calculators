import { COLOR } from '../constants';

export const calculateDataRate = (frameRate, link, width, height, color) => {

    // Determine pixel size
    let pixelSize;
    if (color === COLOR.YCbCr) pixelSize = 20;
    else if (color === COLOR.RGB) pixelSize = 30;

    const dataRate = ( frameRate * width * height * link * pixelSize ) / ( 1024 * 1024 );
    return dataRate.toFixed(2);
};