const { Router } = require('express');
const {
   verifyUser,
   register,
   login,
   getUser,
   updateUser,
   generateOtp,
   verifyOtp,
   createResetSession,
   resetPassword,
} = require('../controller/app_controller');
const { auth, localVariables } = require('../middleware/auth');
const { registerMail } = require('../controller/mail_controller');

const router = Router();

//* POST Methods
router.route('/register').post(register);
router.route('/register-mail').post(registerMail); // send email
router.route('/auth').post(verifyUser, (req, res) => res.end()); // for authentication
router.route('/login').post(verifyUser, login); // *verifyUser is middleware before login
//* GET Methods
router.route('/user/:username').get(getUser); // user with username
router.route('/generate-otp').get(verifyUser, localVariables, generateOtp); // to generate random otp
router.route('/verify-otp').get(verifyUser, verifyOtp); // to verify generated otp
router.route('/create-reset-session').get(createResetSession); // reset all variables

//* PUT Methods
router.route('/update-user').put(auth, updateUser); // for update user profile
router.route('/reset-password').put(verifyUser, resetPassword); // use to reset password
module.exports =  router ;
