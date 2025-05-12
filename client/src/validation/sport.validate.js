import * as Yup from 'yup';

export const createValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .matches(/^[A-Z][a-z]{2,63}$/, 'Upper first letter')
    .required(),
  isOlimpic: Yup.boolean()
});
