export const FLARE_RESOLUTION = {
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

export const FLARE_RESOLUTIONS = Object.values(FLARE_RESOLUTION);

export const FLARE_NAN_RESOLUTIONS = [
    FLARE_RESOLUTION.MINIMUM,
    FLARE_RESOLUTION.MAXIMUM,
    FLARE_RESOLUTION.CUSTOM
];