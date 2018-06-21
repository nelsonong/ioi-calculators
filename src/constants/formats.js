const clFormat = {
    output_2x8: "Base 8-bit x 2",
    output_3x8: "Base 8-bit x 3",
    output_4x8: "Medium 8-bit x 4",
    output_8x8: "Full 8-bit x 8",
    output_10x8: "80-bit 8-bit x 10",
    output_2x10: "Base 10-bit x 2",
    output_4x10: "Medium 10-bit x 4",
    output_8x10: "80-bit 10-bit x 8",
    output_16x8: "Dual Full 8-bit x 16",
    output_16x10: "Dual 80-bit 10-bit x 16",
    output_20x8: "Dual 80-bit 8-bit x 20"
}

const clFormats = {
    cl_2_4m: [
        clFormat.output_2x8,
        clFormat.output_2x10,
        clFormat.output_3x8,
        clFormat.output_4x10,
        clFormat.output_8x8,
        clFormat.output_8x10,
        clFormat.output_10x8
    ],
    cl_12m: [
        clFormat.output_2x8,
        clFormat.output_2x10,
        clFormat.output_3x8,
        clFormat.output_4x10,
        clFormat.output_8x8,
        clFormat.output_8x10,
        clFormat.output_10x8,
        clFormat.output_16x8,
        clFormat.output_16x10,
        clFormat.output_20x8
    ]
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

const slowModeFormats = [ clFormat.output_8x8, clFormat.output_8x10 ];

export { clFormat, clFormats, cxFormats, slowModeFormats };