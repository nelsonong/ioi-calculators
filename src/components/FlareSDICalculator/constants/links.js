import { MODEL } from './models';

export const LINK = {
    SINGLE: 1,
    DUAL: 2,
    QUAD: 4
};

export const LINKS = {
    [MODEL.Type2KSDI]: [ LINK.SINGLE, LINK.DUAL ],
    [MODEL.Type4KSDI]: [ LINK.DUAL, LINK.QUAD ]
};