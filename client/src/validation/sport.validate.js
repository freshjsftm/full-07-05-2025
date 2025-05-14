import * as Yup from 'yup';
import CONSTANTS from '../constants';

export const createValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .matches(/^[A-Z][a-z]{2,63}$/, 'Upper first letter')
    .required(),
  isOlimpic: Yup.boolean(),
  image: Yup.mixed()
    .test('fileSize', 'Filesize must be less 5Mb', (value) => {
      return !value || value.size <= CONSTANTS.MAX_FILE_SIZE;
    })
    .test('fileType', 'Filetype not available', (value) => {
      return !value || CONSTANTS.FILE_TYPES.includes(value.type);
    }),
});
