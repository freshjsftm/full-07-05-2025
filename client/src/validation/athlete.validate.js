import * as Yup from 'yup';
import { schemaImage } from './validate';
import CONSTANTS from '../constants';

export const createValidationSchema = Yup.object({
  name: Yup.string().trim().min(6).max(255).required(),
  country: Yup.string().oneOf(CONSTANTS.COUNTRIES).required(),
  birthYear: Yup.number()
    .min(1900)
    .max(new Date().getFullYear() - 15)
    .required(),
  sportId: Yup.string().required(),
  avatar: schemaImage,
});
