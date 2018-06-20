// Camera models
const models = {
    cl: [ '2M360MCL/NCL', '2M360CCL', '4M180MCL/NCL', '4M180CCL', '12M125MCL/NCL', '12M125CCL' ],
    cx: [ '2M280MCX/NCX', '2M280CCX', '4M140MCX/NCX', '4M140CCX', '12M180MCX/NCX', '12M180CCX', '48M30MCX', '48M30CCX' ]
};

// Formats
const clFormats = {
    cl_2_4m: {
        formats: [ 'Base 8-bit x 2', 'Base 10-bit x 2', 'Base 8-bit x 3', 'Medium 10-bit x 4', 'Full 8-bit x 8', '80-bit 10-bit x 8', '80-bit 8-bit x 10' ]
    },
    cl_12m: {
        formats: [ 'Base 8-bit x 2', 'Base 10-bit x 2', 'Base 8-bit x 3', 'Medium 10-bit x 4', 'Full 8-bit x 8', '80-bit 10-bit x 8', '80-bit 8-bit x 10', 
                    'Dual Full 8-bit x 16', 'Dual 80-bit 10-bit x 16', 'Dual 80-bit 8-bit x 20' ]
    }
};

const cxFormats = {
    cx_2_4m: {
        bitDepths: [ 8, 10 ],
        linkCounts: [ 1, 2 ],
        linkSpeeds: [ 'CXP-3' ]
    },
    cx_12m: {
        bitDepths: [ 8, 10 ],
        linkCounts: [ 1, 2, 4 ],
        linkSpeeds: [ 'CXP-3', 'CXP-5', 'CXP-6' ]
    },
    cx_48m: {
        bitDepths: [ 8, 10, 12 ],
        linkCounts: [ 1, 2, 4 ],
        linkSpeeds: [ 'CXP-2', 'CXP-3', 'CXP-5', 'CXP-6' ]
    }
};

const slowModeFormats = [ 'Full 8-bit x 8', '80-bit 10-bit x 8' ];

// Resolution Presets
const resolutionPresets = [ 'Maximum', [3840, 2160], [2048, 1024], [1920, 1080], [1280, 1024], [1280, 720], [1024, 1024], [1024, 768], [800, 600], [640, 480], [320, 240], 'Minimum' ];

export { models, clFormats, cxFormats, slowModeFormats, resolutionPresets };