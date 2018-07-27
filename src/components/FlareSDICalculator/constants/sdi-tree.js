// SDI is a SMPTE format (which is locked to fixed frame-rates
// and resolutions).
//
// Unfortunately, the best way to calculate frame-rate is
// through a tree of constants.

export default JSON.parse(`{
  "2KSDI": {
    "HD-SDI": {
      "2K (1080p)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [23.98, 24, 25, 29.97, 30]
      },
      "HD (1080p)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [23.98, 24, 25, 29.97, 30]
      },
      "HD (1080i)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [50, 59.94, 60]
      },
      "HD (720p)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [50, 59.94, 60]
      }
    },
    "3G-SDI": {
      "2K (1080p)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [47.95, 48, 50, 59.94, 60]
      },
      "HD (1080p)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [50, 59.94, 60]
      }
    },
    "3G-SDI-B": {
      "2K (1080p)": {
        "4:4:4 R'G'B' 10-bit": [23.98, 24, 25, 29.97, 30]
      },
      "HD (1080p)": {
        "4:4:4 R'G'B' 10-bit": [23.98, 24, 25, 29.97, 30]
      }
    }
  },
  "4KSDI": {
    "Quad HD-SDI": {
      "4K (2160p)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [23.98, 24, 25, 29.97, 30]
      },
      "UHD (2160p)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [23.98, 24, 25, 29.97, 30]
      }
    },
    "Quad 3G-SDI": {
      "4K (2160p)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [47.95, 48, 50, 59.94, 60],
        "4:4:4 R'G'B' 10-bit": [23.98, 24, 25, 29.97, 30]
      },
      "UHD (2160p)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [50, 59.94, 60],
        "4:4:4 R'G'B' 10-bit": [23.98, 24, 25, 29.97, 30]
      }
    },
    "Dual 3G-SDI": {
      "4K (2160p)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [23.98, 24, 25, 29.97, 30]
      },
      "UHD (2160p)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [23.98, 24, 25, 29.97, 30]
      }
    }
  }
}`);
