export const SUBSAMPLING_BINNING = {
  NONE: 'Disabled',
  SUBSAMPLING: '1/2 Horizontal/Vertical Sub-Sample',
  BIN_HORIZONTAL: '2-Pixel Horizontal Binning',
  BIN_VERTICAL: '2-Pixel Vertical Binning',
  BIN_2X2: '2-Pixel Vertical/Horizontal Binning',
};

export const SENSOR_DRIVE_MODE = {
  ALL_12: 'All Pixel Scan Mode 12-bit',
  ALL_10: 'All Pixel Scan Mode 10-bit',
  UHD_10: 'UHD 10-bit ADC',
  UHD_10_OC: 'UHD 10-bit ADC Overclocked',
  BIN_12_16_9: '16:9 2x2 Binning 12-bit',
  BIN_12: '2x2 Binning 12-bit',
};

export const SENSOR_DRIVE_MODES = Object.values(SENSOR_DRIVE_MODE);
