import * as Yup from 'yup';
import { schemaImage } from './validate';
import CONSTANTS from '../constants';

const nameSchema = Yup.string().trim().min(6).max(255);
const countrySchema = Yup.string().oneOf(CONSTANTS.COUNTRIES);
const birthYearSchema = Yup.number().min(1900).max(new Date().getFullYear() - 15);

export const createValidationSchema = Yup.object({
  name: nameSchema.required(),
  country: countrySchema.required(),
  birthYear: birthYearSchema.required(),
  sportId: Yup.string().required(),
  avatar: schemaImage,
});

export const updateValidationSchema = Yup.object({
  name: nameSchema,
  country: countrySchema,
  birthYear: birthYearSchema,
  sportId: Yup.string(),
  avatar: schemaImage,
});
