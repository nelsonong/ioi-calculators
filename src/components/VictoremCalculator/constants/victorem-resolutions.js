import { MODEL } from './victorem-models';

export const RESOLUTION = {
    MAXIMUM: 'Maximum',
    UHD: [3840, 2160],
    FHD: [1920, 1080],
    SXGA: [1280, 1024],
    HD: [1280, 720],
    NETWORK: [1024, 1024],
    XGA: [1024, 768],
    SVGA: [800, 600],
    VGA: [640, 480],
    QVGA: [320, 240],
    MINIMUM: 'Minimum',
    CUSTOM: 'Custom'
};

export const RESOLUTIONS = Object.values(RESOLUTION);

export const MAX_RESOLUTION = {
    [MODEL.Type51B163MCX]: [2464, 2056],
    [MODEL.Type51B163CCX]: [2464, 2056],
    [MODEL.Type32B216MCX]: [2064, 1544],
    [MODEL.Type32B216CCX]: [2064, 1544],
    [MODEL.Type120B68MCX]: [4112, 3008],
    [MODEL.Type120B68CCX]: [4112, 3008],
    [MODEL.Type89B93MCX]: [4112, 2176],
    [MODEL.Type89B93CCX]: [4112, 4112],
    [MODEL.Type16B276MCX]: [1456, 1088],
    [MODEL.Type16B276CCX]: [1456, 1088],
    [MODEL.Type4B523MCX]: [728, 544],
    [MODEL.Type4B523CCX]: [728, 544]
}