import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { fetchAllSportsAsync } from '../../store/sportsSlice';
import { fetchCreateAthleteAsync } from '../../store/athletesSlice';
import { createValidationSchema } from '../../validation/athlete.validate';
import CONSTANTS from '../../constants';
import styles from './form.module.scss';

const FormCreateAthlete = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sports } = useSelector((state) => state.sports);

  useEffect(() => {
    dispatch(fetchAllSportsAsync());
  }, [dispatch]);

  const onSubmit = (values, formikBag) => {
    console.log(values);
    dispatch(fetchCreateAthleteAsync(values));
    formikBag.resetForm();
    navigate(`/sports/${values.sportId}`);
  };
  const showCountry = (country) => (
    <option key={country} value={country}>
      {country}
    </option>
  );
  const showSport = (sport) => (
    <option key={sport._id} value={sport._id}>
      {sport.name}
    </option>
  );
  return (
    <Formik
      initialValues={{
        name: '',
        country: '',
        birthYear: 2000,
        sportId: '',
        avatar: '',
      }}
      onSubmit={onSubmit}
      validationSchema={createValidationSchema}
    >
      {({ setFieldValue }) => {
        return (
          <Form className={styles.form}>
            <label>
              <span>Name of athlete</span>
              <Field name="name" />
              <ErrorMessage name="name" />
            </label>
            <label>
              <span>Country</span>
              <select
                name="country"
                onChange={(event) => {
                  setFieldValue(
                    'country',
                    event.currentTarget.selectedOptions[0].value
                  );
                }}
              >
                <option value="">choose country</option>
                {CONSTANTS.COUNTRIES.map(showCountry)}
              </select>
              <ErrorMessage name="country" />
            </label>
            <label>
              <span>birthYear of athlete</span>
              <Field
                name="birthYear"
                type="number"
                min="1900"
                max={new Date().getFullYear() - 15}
              />
              <ErrorMessage name="birthYear" />
            </label>
            <label>
              <span>Sport</span>
              <select
                name="sportId"
                onChange={(event) => {
                  setFieldValue(
                    'sportId',
                    event.currentTarget.selectedOptions[0].value
                  );
                }}
              >
                <option value="">choose sport</option>
                {sports?.map(showSport)}
              </select>
              <ErrorMessage name="sportId" />
            </label>
            <label>
              <span>Add picture</span>
              <input
                name="avatar"
                type="file"
                onChange={(event) => {
                  setFieldValue('avatar', event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage name="avatar" />
            </label>
            <button type="submit">Create new athlete</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormCreateAthlete;
