import {
  MODELS,
  SUBSAMPLING_BINNING,
  SENSOR_DRIVE_MODE,
} from '../constants';

const isConfiguration = (
  linkSpeed,
  linkCount,
  targetLinkSpeed,
  targetLinkCount,
) => (linkSpeed === targetLinkSpeed) && (linkCount === targetLinkCount);

const calculateSubSamplingBinningFrameRate = (model, height, adcBitDepth, linkSpeed, linkCount, subSamplingBinning) => {
  const subSampling = (subSamplingBinning === SUBSAMPLING_BINNING.SUBSAMPLING);
  const binv = (subSamplingBinning === SUBSAMPLING_BINNING.BIN_VERTICAL);
  const bin2 = (subSamplingBinning === SUBSAMPLING_BINNING.BIN_2X2);

  // Determine HMAX and minimum vertical blanking
  let hmax = 0;
  let minVertBlank = 0;
  if (MODELS.TYPE_250.includes(model)) {
    minVertBlank = 38;
    if (isConfiguration(linkSpeed, linkCount, 6, 2)) {
      if (adcBitDepth === 8) {
        hmax = subSampling ? 218 : 217;
      } else if (adcBitDepth === 10) {
        hmax = subSampling ? 260 : 245;
      } else if (adcBitDepth === 12) {
        hmax = 396;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 5, 2)) {
      if (adcBitDepth === 8) {
        hmax = subSampling ? 218 : 217;
      } else if (adcBitDepth === 10) {
        hmax = 260;
      } else if (adcBitDepth === 12) {
        hmax = 396;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 6, 1) || isConfiguration(linkSpeed, linkCount, 3, 2)) {
      if (adcBitDepth === 8) {
        if (subSampling) hmax = 218;
        else if (binv) hmax = 416;
        else hmax = 380;
      } else if (adcBitDepth === 10) {
        if (subSampling) hmax = 260;
        else if (binv) hmax = 520;
        else hmax = 475;
      } else if (adcBitDepth === 12) {
        if (subSampling) hmax = 396;
        else if (binv) hmax = 624;
        else hmax = 513;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 5, 1)) {
      if (adcBitDepth === 8) {
        hmax = subSampling ? 218 : 418;
      } else if (adcBitDepth === 10) {
        hmax = subSampling ? 260 : 520;
      } else if (adcBitDepth === 12) {
        hmax = subSampling ? 396 : 624;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 2, 2)) {
      if (adcBitDepth === 8) {
        if (subSampling) hmax = 218;
        else if (binv) hmax = 416;
        else hmax = 384;
      } else if (adcBitDepth === 10) {
        if (subSampling) hmax = 260;
        else if (binv) hmax = 520;
        else hmax = 480;
      } else if (adcBitDepth === 12) {
        if (subSampling) hmax = 396;
        else if (binv) hmax = 624;
        else hmax = 570;
      }
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
    if (isConfiguration(linkSpeed, linkCount, 6, 2)) {
      if (adcBitDepth === 8) {
        hmax = subSampling ? 218 : 217;
      } else if (adcBitDepth === 10) {
        hmax = 245;
      } else if (adcBitDepth === 12) {
        hmax = 396;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 5, 2)) {
      if (adcBitDepth === 8) {
        hmax = subSampling ? 218 : 217;
      } else if (adcBitDepth === 10) {
        hmax = 245;
      } else if (adcBitDepth === 12) {
        hmax = 396;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 6, 1) || isConfiguration(linkSpeed, linkCount, 3, 2)) {
      if (adcBitDepth === 8) {
        hmax = subSampling ? 218 : 256;
      } else if (adcBitDepth === 10) {
        hmax = subSampling ? 245 : 320;
      } else if (adcBitDepth === 12) {
        hmax = 396;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 5, 1)) {
      if (adcBitDepth === 8) {
        if (subSampling) hmax = 218;
        else if (binv) hmax = 352;
        else hmax = 348;
      } else if (adcBitDepth === 10) {
        if (subSampling) hmax = 245;
        else if (binv) hmax = 440;
        else hmax = 435;
      } else if (adcBitDepth === 12) {
        if (subSampling) hmax = 396;
        else if (binv) hmax = 528;
        else hmax = 522;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 2, 2)) {
      if (adcBitDepth === 8) {
        hmax = subSampling ? 218 : 318;
      } else if (adcBitDepth === 10) {
        hmax = subSampling ? 245 : 400;
      } else if (adcBitDepth === 12) {
        hmax = subSampling ? 396 : 477;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 3, 1)) {
      if (adcBitDepth === 8) {
        hmax = subSampling ? 250 : 512;
      } else if (adcBitDepth === 10) {
        hmax = subSampling ? 315 : 640;
      } else if (adcBitDepth === 12) {
        hmax = subSampling ? 396 : 768;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 2, 1)) {
      if (adcBitDepth === 8) {
        hmax = subSampling ? 312 : 636;
      } else if (adcBitDepth === 10) {
        hmax = subSampling ? 390 : 795;
      } else if (adcBitDepth === 12) {
        hmax = subSampling ? 468 : 954;
      }
    }
  } else if (MODELS.TYPE_253.includes(model)) {
    minVertBlank = 54;
    if (isConfiguration(linkSpeed, linkCount, 6, 2)) {
      if (adcBitDepth === 8) {
        hmax = (subSampling || binv || bin2) ? 356 : 355;
      } else if (adcBitDepth === 10) {
        hmax = (subSampling || bin2) ? 380 : 375;
      } else if (adcBitDepth === 12) {
        hmax = 522;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 5, 2)) {
      if (adcBitDepth === 8) {
        hmax = (subSampling || binv || bin2) ? 356 : 355;
      } else if (adcBitDepth === 10) {
        if (subSampling || bin2) hmax = 380;
        else if (binv) hmax = 430;
        else hmax = 435;
      } else if (adcBitDepth === 12) {
        hmax = 522;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 6, 1) || isConfiguration(linkSpeed, linkCount, 3, 2)) {
      if (adcBitDepth === 8) {
        if (subSampling || bin2) hmax = 356;
        else if (binv) hmax = 504;
        else hmax = 512;
      } else if (adcBitDepth === 10) {
        if (subSampling || bin2) hmax = 380;
        else if (binv) hmax = 630;
        else hmax = 640;
      } else if (adcBitDepth === 12) {
        if (subSampling || bin2) hmax = 522;
        else if (binv) hmax = 756;
        else hmax = 768;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 5, 1)) {
      if (adcBitDepth === 8) {
        if (subSampling || bin2) hmax = 356;
        else if (bin2) hmax = 356;
        else hmax = 696;
      } else if (adcBitDepth === 10) {
        if (subSampling || bin2) hmax = 420;
        else if (binv) hmax = 855;
        else hmax = 870;
      } else if (adcBitDepth === 12) {
        if (subSampling || bin2) hmax = 522;
        else if (binv) hmax = 1026;
        else hmax = 1044;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 2, 2)) {
      if (adcBitDepth === 8) {
        if (subSampling || bin2) hmax = 356;
        else if (binv) hmax = 628;
        else hmax = 640;
      } else if (adcBitDepth === 10) {
        if (subSampling) hmax = 420;
        else if (binv) hmax = 785;
        else if (bin2) hmax = 390;
        else hmax = 800;
      } else if (adcBitDepth === 12) {
        if (subSampling || bin2) hmax = 522;
        else if (binv) hmax = 942;
        else hmax = 960;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 3, 1)) {
      if (adcBitDepth === 8) {
        if (subSampling || bin2) hmax = 504;
        else if (binv) hmax = 1004;
        else hmax = 1024;
      } else if (adcBitDepth === 10) {
        if (subSampling || bin2) hmax = 630;
        else if (binv) hmax = 1255;
        else hmax = 1280;
      } else if (adcBitDepth === 12) {
        if (subSampling || bin2) hmax = 756;
        else if (binv) hmax = 1506;
        else hmax = 1536;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 2, 1)) {
      if (adcBitDepth === 8) {
        if (subSampling || bin2) hmax = 628;
        else if (binv) hmax = 1256;
        else hmax = 1280;
      } else if (adcBitDepth === 10) {
        if (subSampling || bin2) hmax = 785;
        else if (binv) hmax = 1570;
        else hmax = 1600;
      } else if (adcBitDepth === 12) {
        if (subSampling || bin2) hmax = 942;
        else if (binv) hmax = 1884;
        else hmax = 1920;
      }
    }
  } else if (MODELS.TYPE_255.includes(model)) {
    minVertBlank = 54;
    if (isConfiguration(linkSpeed, linkCount, 6, 2)) {
      if (adcBitDepth === 8) {
        hmax = (subSampling || binv || bin2) ? 356 : 355;
      } else if (adcBitDepth === 10) {
        hmax = (subSampling || bin2) ? 380 : 375;
      } else if (adcBitDepth === 12) {
        hmax = 522;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 5, 2)) {
      if (adcBitDepth === 8) {
        hmax = (subSampling || binv || bin2) ? 356 : 355;
      } else if (adcBitDepth === 10) {
        if (subSampling || bin2) hmax = 380;
        else if (binv) hmax = 430;
        else hmax = 435;
      } else if (adcBitDepth === 12) {
        hmax = 522;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 6, 1) || isConfiguration(linkSpeed, linkCount, 3, 2)) {
      if (adcBitDepth === 8) {
        if (subSampling || bin2) hmax = 356;
        else if (binv) hmax = 500;
        else hmax = 512;
      } else if (adcBitDepth === 10) {
        if (subSampling || bin2) hmax = 380;
        else if (binv) hmax = 625;
        else hmax = 640;
      } else if (adcBitDepth === 12) {
        if (subSampling || bin2) hmax = 522;
        else if (binv) hmax = 750;
        else hmax = 768;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 5, 1)) {
      if (adcBitDepth === 8) {
        if (subSampling || bin2) hmax = 356;
        else if (bin2) hmax = 676;
        else hmax = 692;
      } else if (adcBitDepth === 10) {
        if (subSampling || bin2) hmax = 420;
        else if (binv) hmax = 845;
        else hmax = 865;
      } else if (adcBitDepth === 12) {
        if (subSampling || bin2) hmax = 522;
        else if (binv) hmax = 1014;
        else hmax = 1038;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 2, 2)) {
      if (adcBitDepth === 8) {
        if (subSampling || bin2) hmax = 356;
        else if (binv) hmax = 620;
        else hmax = 636;
      } else if (adcBitDepth === 10) {
        if (subSampling) hmax = 420;
        else if (binv) hmax = 775;
        else if (bin2) hmax = 390;
        else hmax = 795;
      } else if (adcBitDepth === 12) {
        if (subSampling || bin2) hmax = 522;
        else if (binv) hmax = 930;
        else hmax = 954;
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
    if (isConfiguration(linkSpeed, linkCount, 5, 1)) {
      if (adcBitDepth === 8) {
        hmax = (subSampling || bin2) ? 218 : 238;
      } else if (adcBitDepth === 10) {
        hmax = (subSampling || bin2) ? 250 : 290;
      } else if (adcBitDepth === 12) {
        hmax = 396;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 3, 1)) {
      if (adcBitDepth === 8) {
        if (subSampling || bin2) hmax = 218;
        else if (binv) hmax = 238;
        else hmax = 356;
      } else if (adcBitDepth === 10) {
        if (subSampling || bin2) hmax = 250;
        else if (binv) hmax = 290;
        else hmax = 445;
      } else if (adcBitDepth === 12) {
        hmax = (subSampling || binv || bin2) ? 396 : 534;
      }
    } else if (isConfiguration(linkSpeed, linkCount, 2, 1)) {
      if (adcBitDepth === 8) {
        if (subSampling || bin2) hmax = 218;
        else if (binv) hmax = 238;
        else hmax = 444;
      } else if (adcBitDepth === 10) {
        if (subSampling || bin2) hmax = 250;
        else if (binv) hmax = 290;
        else hmax = 555;
      } else if (adcBitDepth === 12) {
        if (subSampling || binv || bin2) hmax = 396;
        else hmax = 666;
      }
    }
  } else if (MODELS.TYPE_287.includes(model)) {
    minVertBlank = 42;
    if (adcBitDepth === 8) {
      hmax = 242;
    } else if (adcBitDepth === 10) {
      hmax = 290;
    } else if (adcBitDepth === 12) {
      hmax = 396;
    }
  } else {
    throw new Error('Unsupported model');
  }

  if (hmax === 0) {
    throw new Error('Can\'t determine HMAX');
  }

  // Calculate the frame rate
  const linetime = hmax / 74.25;
  const frameRate = 1 / (linetime * (height + minVertBlank) / 1000000);
  return frameRate;
};

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
    vmax = isConfiguration(linkSpeed, linkCount, 3, 1)
      || isConfiguration(linkSpeed, linkCount, 2, 1) ? 3141 : 3713;
  } else {
    throw new Error(`Unsupported sensor drive mode '${sensorDriveMode}'.`);
  }

  // Determine hmaxCalc
  let hmaxCalc = 0;
  if (isConfiguration(linkSpeed, linkCount, 5, 2) || isConfiguration(linkSpeed, linkCount, 6, 2)) {
    hmaxCalc = hmaxMin;
  } else if (isConfiguration(linkSpeed, linkCount, 6, 1)
    || isConfiguration(linkSpeed, linkCount, 3, 2)) {
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
  if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_12) { // Mode 0
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
  } else if (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_10) { // Mode 1
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
    } else if (isConfiguration(linkSpeed, linkCount, 5, 2) || isConfiguration(linkSpeed, linkCount, 6, 2)) {
      throw new Error('Unsupported configuration.');
    } else {
      const hmaxMod = 5;
      const adcBitRatio = 52429 / 65536.0;
      if (hmaxMod * Math.ceil((hmaxCalc * adcBitRatio) / hmaxMod) > hmaxMin) {
        frameRate = 1 / ((hmaxMod * (Math.ceil((hmaxCalc * adcBitRatio) / hmaxMod)) / clkMHz)
          * (minVr + minVertBlank) / 1000000.0);
      } else {
        frameRate = 1 / ((hmaxMin / clkMHz) * (minVr + minVertBlank) / 1000000.0);
      }
    }
  } else if (sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10
      || sensorDriveMode === SENSOR_DRIVE_MODE.UHD_10_OC) { // Mode 1a/1b
    if (adcBitDepth === 12) {
      throw new Error(`Unsupported bit depth '${adcBitDepth}'.`);
    }

    if (isConfiguration(linkSpeed, linkCount, 5, 2) || isConfiguration(linkSpeed, linkCount, 6, 2)) {
      frameRate = 1 / ((hmaxCalc / clkMHz) * vmax / 1000000.0);
    } else if (adcBitDepth === 10) {
      frameRate = 1 / ((hmaxCalc / clkMHz) * vmax / 1000000.0);
    } else { // 8-bit
      const hmaxMod = 1;
      const adcBitRatio = 52429 / 65536.0;
      if (hmaxMod * Math.ceil((hmaxCalc * adcBitRatio) / hmaxMod) > hmaxMin) {
        frameRate = 1 / ((hmaxMod * (Math.ceil((hmaxCalc * adcBitRatio) / hmaxMod)) / clkMHz) * vmax / 1000000.0);
      } else {
        frameRate = 1 / ((hmaxMin / clkMHz) * vmax / 1000000.0);
      }
    }
  } else if (sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12_16_9
      || sensorDriveMode === SENSOR_DRIVE_MODE.BIN_12) { // Mode 2/2A
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

export default ({
  model,
  format,
  adcBitDepth,
  width,
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
      height,
      adcBitDepth,
      linkSpeed,
      linkCount,
      subSamplingBinning,
    );
  }

  return frameRate.toFixed(2);
};
