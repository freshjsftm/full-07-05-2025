import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { fetchCreateSportAsync } from '../../store/sportsSlice';
import { createValidationSchema } from '../../validation/sport.validate';
import styles from './form.module.scss';

const FormCreateSport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.sports);
  const onSubmit = (values, formikBag) => {
    dispatch(fetchCreateSportAsync(values));
    formikBag.resetForm();
    navigate('/');
  };
  return (
    <Formik
      initialValues={{ name: '', isOlimpic: false, image: '' }}
      onSubmit={onSubmit}
      validationSchema={createValidationSchema}
    >
      {({setFieldValue})=>(
      <Form className={styles.form}>
        <p>{error && 'Sport with this name already exists'}</p>
        <label>
          <span>Name of sport</span>
          <Field name="name" />
          <ErrorMessage name="name" />
        </label>
        <label>
          <span>Choose olimpic</span>
          <Field name="isOlimpic" type="checkbox" />
          <ErrorMessage name="isOlimpic" />
        </label>
        <label>
          <span>Add picture</span>
          <input name="image" type="file" onChange={(event)=>{
           
            setFieldValue('image', event.currentTarget.files[0])
          }}/>
          <ErrorMessage name="image" />
        </label>
        <button type="submit">Create new sport</button>
      </Form>
      )}
    </Formik>
  );
};

export default FormCreateSport;
