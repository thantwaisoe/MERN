import React, { useEffect, useState } from 'react';
import styles from '../styles/Username.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/index.js';
import { useNavigate } from 'react-router-dom';
import { generateOtp, verifyOtp } from '../helper/helper';

export default function Recovery() {
   const { username } = useAuthStore((state) => state.auth);
   const [OTP, setOTP] = useState();

   const nav = useNavigate();

   useEffect(() => {
      generateOtp(username).then((code) => {
         console.log(code);
         if (code) return toast.success('OTP is sent your email');
         return toast.error('Problem when generating OTP');
      });
   }, [username]);

   // handle form submit
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const { status } = await verifyOtp({ username, code: OTP });
         if (status === 201) {
            toast.success('Verified OTP');
            return nav('/reset');
         }
      } catch (error) {
         return toast.error('Wrong OTP');
      }
   };
   //handle resend button
   const handleResend = () => {
      let resPromise = generateOtp(username);
      toast.promise(resPromise, {
         loading: 'Sending',
         success: <b>OTP has been sent to your email</b>,
         error: <b>Fail to generate OTP</b>,
      });
      resPromise.then((code) => console.log(`OPT re-generated ${code}`));
   };

   return (
      <div className="container mx-auto">
         <Toaster position="top-center" reverseOrder="false" />
         <div className="flex justify-center items-center h-screen">
            <div className={styles.glass}>
               <div className="title flex flex-col items-center">
                  <h4 className="text-5xl font-bold">Recovery</h4>
                  <span className="py-4 text-xl w-2/3 text-center text-gray-500">Enter OTP to recover password.</span>
               </div>

               <form className="pt-20" onSubmit={handleSubmit}>
                  <div className="textbox flex items-center flex-col gap-6">
                     <div className="input text-center">
                        <span className="py-4 text-sm text-left text-gray-500">
                           Enter 6 digit OPT sent to your email.
                        </span>
                        <input
                           onChange={(e) => setOTP(e.target.value)}
                           type="password"
                           className={styles.textbox}
                           placeholder="Enter OTP"
                        />
                     </div>
                     <button className={styles.btn} type="submit">
                        Recover
                     </button>
                  </div>
               </form>
               <div className="text-center py-4">
                  <span className="text-gray-500 px-1">Can't get OTP?</span>
                  <button className="text-red-500" onClick={handleResend}>
                     Resend
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
