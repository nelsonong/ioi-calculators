import { MODEL } from './models';

export const LINK = {
    SINGLE: 'SINGLE',
    DUAL: 'DUAL',
    QUAD: 'QUAD'
};

export const LINKS = {
    [MODEL.Type2KSDI]: [ LINK.SINGLE, LINK.DUAL ],
    [MODEL.Type4KSDI]: [ LINK.DUAL, LINK.QUAD ]
};