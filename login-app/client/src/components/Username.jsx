import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import {usernameValidate} from '../helper/validate'
import { useAuthStore } from '../store/index.js';
import { auth } from '../helper/helper';


export default function Username() {
  // * Make username variable to use globally in all components
  const setUsername = useAuthStore(state => state.setUserName)
  const navigate = useNavigate()
  
  const formik = useFormik({
    initialValues: {
      username: 'thant123',
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setUsername(values.username)
      await auth(values.username)
      navigate('/password')
    },
  });
  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder='false'/>
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
                {...formik.getFieldProps('username')}
                type="text"
                className={styles.textbox}
                placeholder="UserName"
              />
              <button className={styles.btn} type="submit">
                Let's GO
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500 px-1">Not a Member</span>
              <Link className="text-red-500" to="/register">
                Register Now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
