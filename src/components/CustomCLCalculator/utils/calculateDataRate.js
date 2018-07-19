import { FORMAT_BITS } from '../constants';

export const calculateDataRate = ({ format, width, height, frameRate }) => {
    const bitsPerPixel = FORMAT_BITS[format];
    const dataRate = ( bitsPerPixel * width * height * frameRate ) / ( 1024 * 1024 );
    return dataRate.toFixed(2);
};