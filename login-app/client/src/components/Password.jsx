import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';

export default function Password() {
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: passwordValidate,
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
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex  justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>

            <div className="textbox flex items-center flex-col gap-6">
              <input
                {...formik.getFieldProps('password')}
                type="password"
                className={styles.textbox}
                placeholder="Enter Password"
              />
              <button className={styles.btn} type="submit">
                Sign Up
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500 px-1">Forgot Password</span>
              <Link className="text-red-500" to="/recovery">
                Recovery Now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
