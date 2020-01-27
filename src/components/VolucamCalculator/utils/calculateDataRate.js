import { DRIVE } from '../constants';

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
  frameRate,
}) => {
  const capacity = getCapacity(driveModel);

  const bytesPerPixel = outputBitDepth / 8;
  const frameHeader = 64;
  let frameSize = frameHeader + (width * height * bytesPerPixel);
  if (frameSize % 512 !== 0) {
    const padding = frameSize % 512;
    frameSize += padding;
  }

  const freeBlocks = Math.floor(capacity / 512);
  const blocksPerFrame = Math.ceil((width * height * bytesPerPixel + frameHeader) / 2048) * 4;
  const blocksPerSecond = blocksPerFrame * frameRate;
  const secondsRemaining = freeBlocks / blocksPerSecond;

  const dataRate = (frameSize * frameRate) / (1024 * 1024);
  return {
    dataRate,
    secondsRemaining,
  };
};
