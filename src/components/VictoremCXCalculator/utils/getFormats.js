import { FORMATS } from '../constants';

export const getFormats = (model) => {
  if (model.startsWith('4B')) {
      return FORMATS.CX4B;
  } else if (model.startsWith('16B')) {
      return FORMATS.CX16B;
  } else {
      return FORMATS.CXX;
  }
};