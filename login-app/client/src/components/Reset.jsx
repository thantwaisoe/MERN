import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from '../styles/Username.module.css';
import toast,{ Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidate } from '../helper/validate';
import {resetPassword} from '../helper/helper'
import { useAuthStore } from '../store';
import useFetch from '../hook/fetchData.hook'


export default function Reset() {
  const nav = useNavigate()
  const { username } = useAuthStore((state) => state.auth);
  const [{isLoading, apiData, status, serverError}] = useFetch('create-reset-session')
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: ''
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let resetPromise = resetPassword({username, password: values.password})
      toast.promise(resetPromise, {
        loading: 'Updating..',
        success: <b>Successfully Updated</b>,
        error: <b>Fail to Update</b>
      })
      resetPromise.then(() => nav('/password'))
    },
  });
  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>
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
