import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidate } from '../helper/validate';

export default function Reset() {
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: ''
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder="false" />
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{width: '40%'}}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter new password
            </span>
          </div>

          <form className="py-20" onSubmit={formik.handleSubmit}>
            <div className="textbox flex items-center flex-col gap-6">
              <input
                {...formik.getFieldProps('password')}
                type="password"
                className={styles.textbox}
                placeholder="Enter new Password"
              />
              <input
                {...formik.getFieldProps('confirm_password')}
                type="password"
                className={styles.textbox}
                placeholder="Confirm Password"
              />
              <button className={styles.btn} type="submit">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
