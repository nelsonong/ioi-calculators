import {
  DRIVE,
  FIRMWARE,
} from '../constants';

const getCapacity = (driveModel) => {
  const fileSystemSize = 256 * 1024;
  let capacity;
  switch (driveModel) {
    case DRIVE.VIDIOMOD480M2: {
      capacity = 512110190592;
      break;
    }

    case DRIVE.VIDIOMOD960M2: {
      capacity = 1024209543168;
      break;
    }

    case DRIVE.VIDIOMOD1920M2: {
      capacity = 2000398934016;
      break;
    }

    default:
  }

  return capacity - fileSystemSize;
};

export default ({
  outputBitDepth,
  width,
  height,
  driveModel,
  firmware,
  frameRate,
}) => {
  const FRAME_HEADER_SIZE = 64;
  const capacity = getCapacity(driveModel);
  const freeBlocks = Math.floor(capacity / 512);
  const firmwareEnabled = firmware !== FIRMWARE.STANDARD;
  const firmwareFactor = firmwareEnabled ? 2.0 : 1.0;

  let secondsRemaining = 0;
  const frameSize = Math.ceil(width * height * outputBitDepth / 8.0) + FRAME_HEADER_SIZE;
  const blocksPerFrame = Math.ceil(frameSize / 2048) * 4;
  const blocksPerSecond = blocksPerFrame * frameRate;
  if (blocksPerSecond > 0) secondsRemaining = freeBlocks / blocksPerSecond;
  secondsRemaining *= firmwareFactor;

  let dataRate = (frameSize * frameRate) / (1024 * 1024);
  dataRate /= firmwareFactor;

  return {
    dataRate,
    secondsRemaining,
  };
};
