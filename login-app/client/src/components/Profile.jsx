import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import { useState } from 'react';
import convertToBase64 from '../helper/convert';

export default function Password() {
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      first: '',
      last: '',
      address: '',
      mobile: '',
      email: '',
    },
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = Object.assign(values, { profile: file || '' }); //add profile key value in values object
      console.log(values);
    },
  });
  const onUpload = async (e) => {
    console.log('object');
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder="false" />
      <div className="flex justify-center items-center h-screen">
        <div className={`${styles.glass} ${extend.glass}`} style={{ height: '95%', width: '35%', paddingTop: '60px' }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can upload the details.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex  justify-center py-4">
              <label htmlFor="profile">
                <img src={file || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
              </label>
              <input onChange={onUpload} type="file" name="profile" id="profile" />
            </div>

            <div className="textbox flex items-center flex-col gap-6">
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps('first')}
                  type="text"
                  className={`${styles.textbox} ${extend.textbox}`}
                  placeholder="First Name"
                />
                <input
                  {...formik.getFieldProps('last')}
                  type="text"
                  className={`${styles.textbox} ${extend.textbox}`}
                  placeholder="Last Name"
                />
              </div>
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps('mobile')}
                  type="text"
                  className={`${styles.textbox} ${extend.textbox}`}
                  placeholder="Mobile No"
                />
                <input
                  {...formik.getFieldProps('email')}
                  type="email"
                  className={`${styles.textbox} ${extend.textbox}`}
                  placeholder="Email*"
                />
              </div>
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps('address')}
                  type="text"
                  className={`${styles.textbox} ${extend.textbox}`}
                  placeholder="Address"
                />
              </div>
              <button className={styles.btn} type="submit">
                Update
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500 px-1">Comeback Later?</span>
              <Link className="text-red-500" to="/">
                Logout
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
