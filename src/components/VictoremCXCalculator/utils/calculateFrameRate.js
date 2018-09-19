import {
  MODELS,
  SUBSAMPLING_BINNING,
  SENSOR_DRIVE_MODE,
} from '../constants';
import { supportsOutputBitDepth } from './support';

const isConfiguration = (
  linkSpeed,
  linkCount,
  targetLinkSpeed,
  targetLinkCount,
) => (linkSpeed === targetLinkSpeed) && (linkCount === targetLinkCount);

const calculateDriveModeFrameRate = (height, adcBitDepth, linkSpeed, linkCount, sensorDriveMode) => {
  // Determine hmaxMin (the minimum possible value of hmax)
  let hmaxMin;
  if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_12) hmaxMin = 861;
  else if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_10) hmaxMin = 720;
  else if (sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10) hmaxMin = 546;
  else if (sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10_OC) hmaxMin = 546;
  else if (sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12_16_9) hmaxMin = 362;
  else if (sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12) hmaxMin = 362;
  else {
    throw new Error(`Unsupported sensor drive mode '${sensorDriveMode}'.`);
  }

  // Determine vmax
  let vmax;
  if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_12) vmax = 3728;
  else if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_10) vmax = 3728;
  else if (sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10) vmax = 2200;
  else if (sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10_OC) vmax = 2200;
  else if (sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12_16_9) vmax = 3141;
  else if (sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12) {
    vmax = isConfiguration(linkSpeed, linkCount, 3, 1) || isConfiguration(linkSpeed, linkCount, 2, 1) ? 3141 : 3713;
  } else {
    throw new Error(`Unsupported sensor drive mode '${sensorDriveMode}'.`);
  }

  // Determine hmaxCalc
  let hmaxCalc = 0;
  if (isConfiguration(linkSpeed, linkCount, 5, 2) || isConfiguration(linkSpeed, linkCount, 6, 2)) {
    hmaxCalc = hmaxMin;
  } else if (isConfiguration(linkSpeed, linkCount, 6, 1) || isConfiguration(linkSpeed, linkCount, 3, 2)) {
    if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_12) hmaxCalc = 996;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_10) hmaxCalc = 830;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10) hmaxCalc = 625;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10_OC) hmaxCalc = 645;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12_16_9) hmaxCalc = 362;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12) hmaxCalc = 362;
  } else if (isConfiguration(linkSpeed, linkCount, 5, 1)) {
    if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_12) hmaxCalc = 1362;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_10) hmaxCalc = 1135;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10) hmaxCalc = 850;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10_OC) hmaxCalc = 876;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12_16_9) hmaxCalc = 362;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12) hmaxCalc = 362;
  } else if (isConfiguration(linkSpeed, linkCount, 2, 2)) {
    if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_12) hmaxCalc = 1251;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_10) hmaxCalc = 1040;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10) hmaxCalc = 780;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10_OC) hmaxCalc = 804;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12_16_9) hmaxCalc = 362;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12) hmaxCalc = 362;
  } else if (isConfiguration(linkSpeed, linkCount, 3, 1)) {
    if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_12) hmaxCalc = 1995;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_10) hmaxCalc = 1685;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10) hmaxCalc = 1250;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10_OC) hmaxCalc = 1288;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12_16_9) hmaxCalc = 501;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12) hmaxCalc = 594;
  } else if (isConfiguration(linkSpeed, linkCount, 2, 1)) {
    if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_12) hmaxCalc = 2481;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_10) hmaxCalc = 2100;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10) hmaxCalc = 1555;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10_OC) hmaxCalc = 1602;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12_16_9) hmaxCalc = 621;
    else if (sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12) hmaxCalc = 735;
  } else {
    throw new Error('Unsupported configuration.');
  }

  // Determine clock frequencye
  const clkMHz = sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10_OC ? 74.25 : 72;

  // Calculate the frame rate
  let frameRate;
  // Mode 0
  if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_12) {
    if (isConfiguration(linkSpeed, linkCount, 5, 2) || isConfiguration(linkSpeed, linkCount, 6, 2)) {
      frameRate = 1 / ((hmaxCalc / clkMHz) * vmax / 1000000.0);
    } else if (adcBitDepth === 12) {
      frameRate = 1 / ((hmaxCalc / clkMHz) * vmax / 1000000.0);
    } else {
      const hmaxMod = 3;
      const adcBitRatio = (adcBitDepth === 8 ? 43691 : 54614) / 65536.0;
      if (hmaxMod * Math.ceil((hmaxCalc * adcBitRatio) / hmaxMod) > hmaxMin) {
        frameRate = 1 / ((hmaxMod * (Math.ceil((hmaxCalc * adcBitRatio) / hmaxMod)) / clkMHz) * vmax / 1000000.0);
      } else {
        frameRate = 1 / ((hmaxMin / clkMHz) * vmax / 1000000.0);
      }
    }
  // Mode 1
  } else if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_10) {
    const minVr = Math.max(height, 1826); // VR only affects frame rate between 1826 and 3672 lines
    const minVertBlank = 56;
    if (adcBitDepth === 12) {
      throw new Error(`Unsupported bit depth '${adcBitDepth}'.`);
    }
    if (isConfiguration(linkSpeed, linkCount, 5, 2) || isConfiguration(linkSpeed, linkCount, 6, 2)) {
      frameRate = 1 / ((hmaxCalc / clkMHz) * (minVr + minVertBlank) / 1000000.0);
    } else if (adcBitDepth === 10) {
      const lineTime = hmaxCalc / clkMHz;
      frameRate = 1 / (lineTime * (minVr + minVertBlank) / 1000000.0);
    } else // 8-bit
    if (isConfiguration(linkSpeed, linkCount, 5, 2) || isConfiguration(linkSpeed, linkCount, 6, 2)) {
      throw new Error('Unsupported configuration.');
    } else {
      const hmaxMod = 5;
      const adcBitRatio = 52429 / 65536.0;
      if (hmaxMod * Math.ceil((hmaxCalc * adcBitRatio) / hmaxMod) > hmaxMin) {
        frameRate = 1 / ((hmaxMod
          * (Math.ceil((hmaxCalc * adcBitRatio) / hmaxMod)) / clkMHz)
          * (minVr + minVertBlank)
          / 1000000.0);
      } else {
        frameRate = 1 / ((hmaxMin / clkMHz) * (minVr + minVertBlank) / 1000000.0);
      }
    }
  // Mode 1a/1b
  } else if (sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10 || sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10_OC) {
    if (adcBitDepth === 12) {
      throw new Error(`Unsupported bit depth '${adcBitDepth}'.`);
    }
    if (isConfiguration(linkSpeed, linkCount, 5, 2) || isConfiguration(linkSpeed, linkCount, 6, 2)) {
      frameRate = 1 / ((hmaxCalc / clkMHz) * vmax / 1000000.0);
    } else if (adcBitDepth === 10) {
      frameRate = 1 / ((hmaxCalc / clkMHz) * vmax / 1000000.0);
    } else {
      // 8-bit
      const hmaxMod = 1;
      const adcBitRatio = 52429 / 65536.0;
      if (hmaxMod * Math.ceil((hmaxCalc * adcBitRatio) / hmaxMod) > hmaxMin) {
        frameRate = 1 / ((hmaxMod * (Math.ceil((hmaxCalc * adcBitRatio) / hmaxMod)) / clkMHz) * vmax / 1000000.0);
      } else {
        frameRate = 1 / ((hmaxMin / clkMHz) * vmax / 1000000.0);
      }
    }
  // Mode 2/2A
  } else if (sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12_16_9 || sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12) {
    if (isConfiguration(linkSpeed, linkCount, 6, 2) || isConfiguration(linkSpeed, linkCount, 5, 2)) {
      frameRate = 1 / ((hmaxCalc / clkMHz) * vmax / 1000000.0);
    } else if (isConfiguration(linkSpeed, linkCount, 3, 1) || isConfiguration(linkSpeed, linkCount, 2, 1)) {
      if (adcBitDepth === 12) {
        frameRate = 1 / ((hmaxCalc / clkMHz) * vmax / 1000000.0);
      } else {
        const hmaxMod = 3;
        const adcBitRatio = (adcBitDepth === 8 ? 43691 : 54614) / 65536.0;
        if (hmaxMod * Math.ceil((hmaxCalc * adcBitRatio) / hmaxMod) > hmaxMin) {
          frameRate = 1 / ((hmaxMod * (Math.ceil((hmaxCalc * adcBitRatio) / hmaxMod)) / clkMHz) * vmax / 1000000.0);
        } else {
          frameRate = 1 / ((hmaxMin / clkMHz) * vmax / 1000000.0);
        }
      }
    } else if (adcBitDepth === 12) {
      frameRate = 1 / ((hmaxCalc / clkMHz) * vmax / 1000000.0);
    } else {
      throw new Error(`Unsupported bit depth '${adcBitDepth}'.`);
    }
  } else {
    throw new Error(`Unsupported sensor drive mode '${sensorDriveMode}'.`);
  }

  return frameRate;
};

const calculateSubSamplingBinningFrameRate = (
  model,
  width,
  maxWidth,
  height,
  adcBitDepth,
  outputBitDepth,
  linkSpeed,
  linkCount,
  subSamplingBinning,
) => {
  const subSampling = (subSamplingBinning === SUBSAMPLING_BINNING.SUBSAMPLING);
  const binv = (subSamplingBinning === SUBSAMPLING_BINNING.BIN_VERTICAL);
  const bin2 = (subSamplingBinning === SUBSAMPLING_BINNING.BIN_2X2);

  let hmaxMod;
  if (adcBitDepth === 8) hmaxMod = 1;
  else if (adcBitDepth === 10) hmaxMod = 5;
  else if (adcBitDepth === 12) hmaxMod = 3;
  else throw new Error(`Unsupported bit depth '${adcBitDepth}'.`);

  let CXPClock; // ns
  if (linkSpeed === 6) CXPClock = 6.4;
  else if (linkSpeed === 5) CXPClock = 8;
  else if (linkSpeed === 3) CXPClock = 12.8;
  else if (linkSpeed === 2) CXPClock = 16;
  else throw new Error(`Unsupported CXP linkSpeed '${linkSpeed}'.`);

  const CLK_DDR = 297;

  const SixteenPixelTime = adcBitDepth * (1 / (2 * CLK_DDR)) * 1000; // 16-Pixel Time
  const SixteenPixelTimeOut = CXPClock * (16.0 / (32.0 / adcBitDepth));
  const SixteenPixelTimeRatio = SixteenPixelTimeOut / SixteenPixelTime;
  const FixedPoint = Math.floor((SixteenPixelTimeRatio - SixteenPixelTimeRatio) * 65536) / 65536
    + SixteenPixelTimeRatio;

  let hmaxFast = 0;
  let hmax = 0;
  let hmaxCalc = 0;
  let minVertBlank = 0;
  if (MODELS.TYPE_174.includes(model)) {
    if (adcBitDepth === 8) {
      throw new Error(`Unsupported bit depth '${adcBitDepth}'.`);
    }

    minVertBlank = 38;

    hmaxFast = adcBitDepth === 10 ? 360 : 462;

    if (isConfiguration(linkSpeed, linkCount, 6, 1) || isConfiguration(linkSpeed, linkCount, 3, 2)) {
      hmaxCalc = hmaxFast;
    } else if (isConfiguration(linkSpeed, linkCount, 5, 1)) {
      hmax = adcBitDepth === 10 ? 405 : 486;
    } else if (isConfiguration(linkSpeed, linkCount, 2, 2)) {
      hmax = adcBitDepth === 10 ? 375 : 462;
    } else if (isConfiguration(linkSpeed, linkCount, 3, 1)) {
      hmax = adcBitDepth === 10 ? 595 : 714;
    } else if (isConfiguration(linkSpeed, linkCount, 2, 1)) {
      hmax = adcBitDepth === 10 ? 755 : 906;
    }
  } else if (MODELS.TYPE_250.includes(model)) {
    minVertBlank = 38;

    if (adcBitDepth === 12) hmaxFast = 396;
    else if (adcBitDepth === 10) hmaxFast = subSampling ? 260 : 245;
    else hmaxFast = subSampling ? 218 : 217; // 8-Bit

    if (isConfiguration(linkSpeed, linkCount, 6, 2)) {
      hmaxCalc = hmaxFast;
    } else if (isConfiguration(linkSpeed, linkCount, 5, 2)) {
      if (subSampling) {
        hmaxCalc = hmaxFast;
      } else if (adcBitDepth === 8) hmax = 217;
      else if (adcBitDepth === 10) hmax = 260;
      else if (adcBitDepth === 12) hmax = 396;
    } else if (isConfiguration(linkSpeed, linkCount, 6, 1) || isConfiguration(linkSpeed, linkCount, 3, 2)) {
      if (subSampling) {
        hmaxCalc = hmaxFast;
      } else if (adcBitDepth === 8) hmax = binv ? 304 : 308;
      else if (adcBitDepth === 10) hmax = binv ? 380 : 385;
      else if (adcBitDepth === 12) hmax = binv ? 456 : 462;
    } else if (isConfiguration(linkSpeed, linkCount, 5, 1)) {
      if (subSampling) {
        hmaxCalc = hmaxFast;
      } else if (adcBitDepth === 8) hmax = 416;
      else if (adcBitDepth === 10) hmax = 520;
      else if (adcBitDepth === 12) hmax = 624;
    } else if (isConfiguration(linkSpeed, linkCount, 2, 2)) {
      if (subSampling) {
        hmaxCalc = hmaxFast;
      } else if (adcBitDepth === 8) hmax = binv ? 416 : 384;
      else if (adcBitDepth === 10) hmax = binv ? 520 : 480;
      else if (adcBitDepth === 12) hmax = binv ? 624 : 570;
    } else if (isConfiguration(linkSpeed, linkCount, 3, 1)) {
      if (adcBitDepth === 8) {
        if (subSampling) hmax = 304;
        else if (binv) hmax = 608;
        else hmax = 612;
      } else if (adcBitDepth === 10) {
        if (subSampling) hmax = 380;
        else if (binv) hmax = 760;
        else hmax = 765;
      } else if (adcBitDepth === 12) {
        if (subSampling) hmax = 456;
        else if (binv) hmax = 912;
        else hmax = 918;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 2, 1)) {
      if (adcBitDepth === 8) {
        if (subSampling) hmax = 376;
        else if (binv) hmax = 760;
        else hmax = 764;
      } else if (adcBitDepth === 10) {
        if (subSampling) hmax = 470;
        else if (binv) hmax = 950;
        else hmax = 955;
      } else if (adcBitDepth === 12) {
        if (subSampling) hmax = 564;
        else if (binv) hmax = 1140;
        else hmax = 1146;
      }
    }
  } else if (MODELS.TYPE_252.includes(model)) {
    minVertBlank = 38;

    if (adcBitDepth === 12) hmaxFast = 396;
    else if (adcBitDepth === 10) hmaxFast = 245;
    else hmaxFast = subSampling ? 218 : 217; // 8-Bit

    if (isConfiguration(linkSpeed, linkCount, 6, 2) || isConfiguration(linkSpeed, linkCount, 5, 2)) {
      hmaxCalc = hmaxFast;
    } else if (isConfiguration(linkSpeed, linkCount, 6, 1) || isConfiguration(linkSpeed, linkCount, 3, 2)) {
      if (adcBitDepth === 8) {
        if (subSampling) {
          hmaxCalc = 218;
        } else {
          hmax = 256;
        }
      } else if (adcBitDepth === 10) {
        if (subSampling) {
          hmaxCalc = 245;
        } else {
          hmax = 320;
        }
      } else if (adcBitDepth === 12) {
        if (subSampling) {
          hmaxCalc = 396;
        } else {
          hmax = 396;
        }
      }
    } else if (isConfiguration(linkSpeed, linkCount, 5, 1)) {
      if (adcBitDepth === 8) {
        if (subSampling) {
          hmaxCalc = 218;
        } else {
          hmax = binv ? 352 : 348;
        }
      } else if (adcBitDepth === 10) {
        if (subSampling) {
          hmaxCalc = 245;
        } else {
          hmax = binv ? 440 : 435;
        }
      } else if (adcBitDepth === 12) {
        if (subSampling) {
          hmaxCalc = 396;
        } else {
          hmax = binv ? 528 : 522;
        }
      }
    } else if (isConfiguration(linkSpeed, linkCount, 2, 2)) {
      if (subSampling) {
        hmaxCalc = 218; // 8-Bit
        if (adcBitDepth === 10) hmaxCalc = 245;
        if (adcBitDepth === 12) hmaxCalc = 396;
      } else {
        hmax = 318; // 8-Bit
        if (adcBitDepth === 10) hmax = 400;
        if (adcBitDepth === 12) hmax = 477;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 3, 1)) {
      hmax = subSampling ? 250 : 512; // 8-bit
      if (adcBitDepth === 10) hmax = subSampling ? 315 : 640;
      if (adcBitDepth === 12) hmax = subSampling ? 396 : 768;
    } else if (isConfiguration(linkSpeed, linkCount, 2, 1)) {
      hmax = subSampling ? 312 : 636; // 8-bit
      if (adcBitDepth === 10) hmax = subSampling ? 390 : 795;
      if (adcBitDepth === 12) hmax = subSampling ? 468 : 954;
    }
  } else if (MODELS.TYPE_253.includes(model)) {
    minVertBlank = 54;

    if (adcBitDepth === 12) hmaxFast = 522;
    else if (adcBitDepth === 10) hmaxFast = (bin2 || subSampling) ? 380 : 375;
    else hmaxFast = (binv || bin2 || subSampling) ? 356 : 355; // 8-Bit

    if (isConfiguration(linkSpeed, linkCount, 6, 2)) {
      hmaxCalc = hmaxFast;
    } else if (isConfiguration(linkSpeed, linkCount, 5, 2)) {
      if (subSampling || bin2 || (binv && adcBitDepth !== 10)) {
        hmaxCalc = hmaxFast;
      } else {
        hmax = 355; // 8-Bit
        if (adcBitDepth === 10) hmax = binv ? 430 : 435;
        if (adcBitDepth === 12) hmax = 522;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 6, 1) || isConfiguration(linkSpeed, linkCount, 3, 2)) {
      if (subSampling || bin2) {
        hmaxCalc = hmaxFast;
      } else {
        hmax = binv ? 504 : 512; // 8-Bit
        if (adcBitDepth === 10) hmax = binv ? 630 : 640;
        if (adcBitDepth === 12) hmax = binv ? 756 : 768;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 5, 1)) {
      if ((subSampling || bin2) && adcBitDepth !== 10) {
        hmaxCalc = hmaxFast;
      } else {
        hmax = binv ? 684 : 696; // 8-Bit
        if (adcBitDepth === 10) {
          if (subSampling) hmax = 420;
          else if (binv) hmax = 855;
          else if (bin2) hmax = 420;
          else hmax = 870;
        }
        if (adcBitDepth === 12) hmax = binv ? 1026 : 1044;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 2, 2)) {
      if ((subSampling || bin2) && adcBitDepth !== 10) {
        hmaxCalc = hmaxFast;
      } else {
        hmax = binv ? 628 : 640; // 8-Bit
        if (adcBitDepth === 10) {
          if (subSampling) hmax = 420;
          else if (binv) hmax = 785;
          else if (bin2) hmax = 390;
          else hmax = 800;
        }
        if (adcBitDepth === 12) hmax = binv ? 942 : 960;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 3, 1)) {
      if (adcBitDepth === 8) {
        if (subSampling) hmax = 504;
        else if (binv) hmax = 1004;
        else if (bin2) hmax = 504;
        else hmax = 1024;
      } else if (adcBitDepth === 10) {
        if (subSampling) hmax = 630;
        else if (binv) hmax = 1255;
        else if (bin2) hmax = 630;
        else hmax = 1280;
      } else if (adcBitDepth === 12) {
        if (subSampling) hmax = 756;
        else if (binv) hmax = 1506;
        else if (bin2) hmax = 756;
        else hmax = 1536;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 2, 1)) {
      if (adcBitDepth === 8) {
        if (subSampling) hmax = 628;
        else if (binv) hmax = 1256;
        else if (bin2) hmax = 628;
        else hmax = 1280;
      } else if (adcBitDepth === 10) {
        if (subSampling) hmax = 785;
        else if (binv) hmax = 1570;
        else if (bin2) hmax = 785;
        else hmax = 1600;
      } else if (adcBitDepth === 12) {
        if (subSampling) hmax = 942;
        else if (binv) hmax = 1884;
        else if (bin2) hmax = 942;
        else hmax = 1920;
      }
    }
  } else if (MODELS.TYPE_255.includes(model)) {
    minVertBlank = 54;

    if (adcBitDepth === 12) hmaxFast = 522;
    else if (adcBitDepth === 10) hmaxFast = (bin2 || subSampling) ? 380 : 375;
    else hmaxFast = (binv || bin2 || subSampling) ? 356 : 355; // 8-Bit

    if (isConfiguration(linkSpeed, linkCount, 6, 2)) {
      hmaxCalc = hmaxFast;
    } else if (isConfiguration(linkSpeed, linkCount, 5, 2)) {
      if (subSampling || bin2 || (binv && adcBitDepth !== 10)) {
        hmaxCalc = hmaxFast;
      } else {
        hmax = hmaxFast; // 8-Bit / 12-bit
        if (adcBitDepth === 10) {
          if (binv) hmax = 430;
          else if (bin2) hmax = 380;
          else hmax = 435;
        }
      }
    } else if (isConfiguration(linkSpeed, linkCount, 6, 1) || isConfiguration(linkSpeed, linkCount, 3, 2)) {
      if (subSampling || bin2) {
        hmaxCalc = hmaxFast;
      } else {
        hmax = binv ? 500 : 512; // 8-Bit
        if (adcBitDepth === 10) hmax = binv ? 625 : 640;
        if (adcBitDepth === 12) hmax = binv ? 750 : 768;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 5, 1)) {
      if ((subSampling || bin2) && adcBitDepth !== 10) {
        hmaxCalc = hmaxFast;
      } else {
        hmax = binv ? 676 : 692; // 8-Bit
        if (adcBitDepth === 10) {
          if (subSampling || bin2) hmax = 420;
          else if (binv) hmax = 845;
          else hmax = 865;
        }
        if (adcBitDepth === 12) hmax = binv ? 1014 : 1038;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 2, 2)) {
      if ((subSampling || bin2) && adcBitDepth !== 10) {
        hmaxCalc = hmaxFast;
      } else {
        hmax = binv ? 620 : 636; // 8-Bit
        if (adcBitDepth === 10) {
          if (subSampling) hmax = 420;
          else if (binv) hmax = 775;
          else if (bin2) hmax = 390;
          else hmax = 795;
        }
        if (adcBitDepth === 12) hmax = binv ? 930 : 954;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 3, 1)) {
      if (adcBitDepth === 8) {
        if (subSampling || bin2) hmax = 500;
        else if (binv) hmax = 1000;
        else hmax = 1020;
      } else if (adcBitDepth === 10) {
        if (subSampling || bin2) hmax = 625;
        else if (binv) hmax = 1250;
        else hmax = 1275;
      } else if (adcBitDepth === 12) {
        if (subSampling || bin2) hmax = 750;
        else if (binv) hmax = 1500;
        else hmax = 1530;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 2, 1)) {
      if (adcBitDepth === 8) {
        if (subSampling || bin2) hmax = 624;
        else if (binv) hmax = 1244;
        else hmax = 1276;
      } else if (adcBitDepth === 10) {
        if (subSampling || bin2) hmax = 780;
        else if (binv) hmax = 1555;
        else hmax = 1595;
      } else if (adcBitDepth === 12) {
        if (subSampling || bin2) hmax = 936;
        else if (binv) hmax = 1866;
        else hmax = 1914;
      }
    }
  } else if (MODELS.TYPE_273.includes(model)) {
    minVertBlank = 42;

    if (adcBitDepth === 12) hmaxFast = 396;
    else if (adcBitDepth === 10) hmaxFast = (bin2 || subSampling) ? 250 : 290;
    else hmaxFast = (bin2 || subSampling) ? 218 : 238; // 8-Bit

    if (isConfiguration(linkSpeed, linkCount, 5, 1)) {
      hmaxCalc = hmaxFast;
    } else if (isConfiguration(linkSpeed, linkCount, 3, 1)) {
      if (bin2 || subSampling) {
        hmaxCalc = hmaxFast;
      } else if (binv) {
        hmax = 356; // 8-Bit
        if (adcBitDepth === 10) hmax = 450;
        if (adcBitDepth === 12) hmax = 534;
      } else {
        hmax = 360; // 8-Bit
        if (adcBitDepth === 10) hmax = 450;
        if (adcBitDepth === 12) hmax = 540;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 2, 1)) {
      if (bin2 || subSampling) {
        hmaxCalc = hmaxFast;
      } else {
        hmax = 444; // 8-Bit
        if (adcBitDepth === 10) hmax = 555;
        if (adcBitDepth === 12) hmax = 666;
      }
    }
  } else if (MODELS.TYPE_287.includes(model)) {
    minVertBlank = 42;

    hmaxCalc = 242; // 8-Bit
    if (adcBitDepth === 10) hmaxCalc = 290;
    if (adcBitDepth === 12) hmaxCalc = 396;
  } else {
    throw new Error('Unsupported model');
  }

  if (hmax > 0) {
    if (bin2) {
      if (Math.ceil(hmax - (((maxWidth - width) / 16) * FixedPoint)) > hmaxFast) {
        hmaxCalc = Math.ceil(hmax - (((maxWidth - width) / 16) * FixedPoint));
      } else {
        hmaxCalc = hmaxFast;
      }
    } else if ((hmaxMod * Math.ceil((Math.ceil((hmax - (((maxWidth - width) / 16)
      * FixedPoint)))) / hmaxMod) > hmaxFast)) {
      hmaxCalc = hmaxMod * Math.ceil((Math.ceil((hmax - (((maxWidth - width) / 16) * FixedPoint)))) / hmaxMod);
    } else {
      hmaxCalc = hmaxFast;
    }
  }

  // Calculate the frame rate
  let frameRate;
  if (supportsOutputBitDepth(model, subSamplingBinning, linkSpeed, linkCount) && outputBitDepth < adcBitDepth) {
    const adcBitDepthIs12 = (adcBitDepth === 12);
    let adcBitRatio;
    if (adcBitDepthIs12) {
      adcBitRatio = outputBitDepth === 8 ? 43691 : 54614;
    } else {
      adcBitRatio = 52429;
    }
    adcBitRatio /= 65536.0;

    if (hmaxMod * (Math.ceil((hmaxCalc * adcBitRatio) / hmaxMod)) > hmaxFast) {
      frameRate = 1 / ((hmaxMod * (Math.ceil((hmaxCalc * adcBitRatio) / hmaxMod))
        * (1 / 74.25)) * (height + minVertBlank) / 1000000);
    } else {
      const linetime = hmaxFast / 74.25;
      frameRate = 1 / (linetime * (height + minVertBlank) / 1000000);
    }
  } else {
    const linetime = hmaxCalc / 74.25;
    frameRate = 1 / (linetime * (height + minVertBlank) / 1000000);
  }

  return frameRate;
};

export default ({
  model,
  format,
  adcBitDepth,
  outputBitDepth,
  width,
  maxWidth,
  height,
  subSamplingBinning,
  sensorDriveMode,
}) => {
  const linkSpeed = Number(format.slice(-1));
  const linkCount = Number(format.slice(0, 1));
  let frameRate;
  if (MODELS.TYPE_183.includes(model)) {
    frameRate = calculateDriveModeFrameRate(
      height,
      adcBitDepth,
      linkSpeed,
      linkCount,
      sensorDriveMode,
    );
  } else {
    frameRate = calculateSubSamplingBinningFrameRate(
      model,
      width,
      maxWidth,
      height,
      adcBitDepth,
      outputBitDepth,
      linkSpeed,
      linkCount,
      subSamplingBinning,
    );
  }

  return frameRate.toFixed(2);
};
