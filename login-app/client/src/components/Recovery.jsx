import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';

export default function Recovery() {
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder="false" />
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password.
            </span>
          </div>

          <form className="pt-20">
            <div className="textbox flex items-center flex-col gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit OPT sent to your email.
                </span>
                <input
                  type="password"
                  className={styles.textbox}
                  placeholder="Enter OTP"
                />
              </div>
              <button className={styles.btn} type="submit">
                Recover
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500 px-1">Can't get OTP?</span>
              <button className="text-red-500">
                Resend
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
