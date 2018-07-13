export const calculateDataRate = ({ frameRate, width, height }) => {
    const dataRate = ( frameRate * width * height ) / ( 1024 * 1024 );
    return dataRate.toFixed(2);
};