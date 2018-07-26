// SDI is a SMPTE format (which is locked to fixed frame-rates
// and resolutions).
//
// Unfortunately, the best way to calculate frame-rate is
// through a tree of constants.

export default JSON.parse(`{
  "2KSDI": {
    "HD-SDI": {
      "2K (2048x1080)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [23.98, 24, 25, 29.97, 30]
      },
      "FHD (1920x1080)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [23.98, 24, 25, 29.97, 30]
      },
      "FHDi (1920x1080)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [50, 59.94, 60]
      },
      "HD (1280x720)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [50, 59.94, 60]
      }
    },
    "3G-SDI": {
      "2K (2048x1080)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [47.95, 48, 50, 59.94, 60]
      },
      "FHD (1920x1080)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [50, 59.94, 60]
      }
    },
    "3G-SDI-B": {
      "2K (2048x1080)": {
        "4:4:4 R'G'B' 10-bit": [23.98, 24, 25, 29.97, 30]
      },
      "FHD (1920x1080)": {
        "4:4:4 R'G'B' 10-bit": [23.98, 24, 25, 29.97, 30]
      }
    }
  },
  "4KSDI": {
    "Quad HD-SDI": {
      "UHD (4096x2160)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [23.98, 24, 25, 29.97, 30]
      },
      "UHD (3840x2160)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [23.98, 24, 25, 29.97, 30]
      }
    },
    "Quad 3G-SDI": {
      "UHD (4096x2160)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [47.95, 48, 50, 59.94, 60],
        "4:4:4 R'G'B' 10-bit": [23.98, 24, 25, 29.97, 30]
      },
      "UHD (3840x2160)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [50, 59.94, 60],
        "4:4:4 R'G'B' 10-bit": [23.98, 24, 25, 29.97, 30]
      }
    },
    "Dual 3G-SDI": {
      "UHD (4096x2160)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [23.98, 24, 25, 29.97, 30]
      },
      "UHD (3840x2160)": {
        "4:2:2 Y'Cb'Cr' 10-bit": [23.98, 24, 25, 29.97, 30]
      }
    }
  }
}`);
