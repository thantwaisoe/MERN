import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/Username.module.css';
import toast,{ Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidate } from '../helper/validate';
import { useState } from 'react';
import convertToBase64 from '../helper/convert'
import {registerUser} from '../helper/helper'

export default function Password() {

  const navigate = useNavigate()
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      username: 'thant123',
      email: 'thantwaisoe456@gmail.com',
      password: 'admin123@',
    },
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = Object.assign(values, {profile: file || ''}) //add profile key value in values object
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success: <b>Register Successful </b>,
        error: <b>Could not Register</b>
      })
      registerPromise.then(() => navigate('/'))
    },
  });
  const onUpload = async (e) => {
    console.log("object");
    const base64 = await convertToBase64(e.target.files[0])
    setFile(base64)
  }
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder="false" />
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ height: '95%', width: '35%' }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">Happy to join us!</span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex  justify-center py-4">
              <label htmlFor="profile">
                <img  src={file || avatar} className={styles.profile_img} alt="avatar"/>
              </label>
              <input onChange={onUpload} type="file" name="profile" id="profile" />
            </div>

            <div className="textbox flex items-center flex-col gap-6">
              <input
                {...formik.getFieldProps('email')}
                type="email"
                className={styles.textbox}
                placeholder="Email*"
              />
              <input
                {...formik.getFieldProps('username')}
                type="username"
                className={styles.textbox}
                placeholder="Username*"
              />
              <input
                {...formik.getFieldProps('password')}
                type="password"
                className={styles.textbox}
                placeholder="Password*"
              />
              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500 px-1">Already Register?</span>
              <Link className="text-red-500" to="/">
                Login Now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
  