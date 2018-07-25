import { INPUT } from './inputs';

export const FORMAT = {
    Type480i: '480i: 59.94',
    Type576i: '576i: 50'
};

export const INPUT_FORMAT = {
    [INPUT.NTSC]: FORMAT.Type480i,
    [INPUT.RS170]: FORMAT.Type480i,
    [INPUT.PAL]: FORMAT.Type576i,
    [INPUT.CCIR]: FORMAT.Type576i
};