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
import OPTION from './options';

export const ntscDefaultState = {
  cameraType: 'ntsc',
  input: INPUT.NTSC,
  format: FORMAT.Type480i,
  color: COLOR.COLOR,
  width: 640,
  height: 480,
  option: OPTION.FIELD_MODE,
  frameRate: 59.94,
  dataRate: 59.32,
};

export {
  INPUT,
  INPUTS,
  FORMAT,
  INPUT_FORMAT,
  COLOR,
  INPUT_COLOR,
  OPTION,
};
