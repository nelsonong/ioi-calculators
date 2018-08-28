import {
  INPUT,
  INPUTS,
} from './inputs';
import {
  FORMAT,
  INPUT_FORMAT,
} from './formats';
import {
  COLOR,
  INPUT_COLOR,
} from './colors';

export const ntscDefaultState = {
  cameraType: 'ntsc',
  model: INPUT.NTSC,
  input: INPUT.NTSC,
  format: FORMAT.Type480i,
  color: COLOR.COLOR,
  width: 640,
  height: 480,
  frameRate: 59.94,
  dataRate: 59.32,
  initialized: false,
};

export {
  INPUT,
  INPUTS,
  FORMAT,
  INPUT_FORMAT,
  COLOR,
  INPUT_COLOR,
};
