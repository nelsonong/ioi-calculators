export const splitResolution = (resolution) => {
    return resolution.match(/\((.*)\)/).pop().split('x').map(number => Number(number));
};