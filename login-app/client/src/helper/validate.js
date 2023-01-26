import toast from 'react-hot-toast';
// validate login page username
export const usernameValidate = async (values) => {
  const errors = usernameVerify({}, values);
  return errors;
};
// validate login page username
export const passwordValidate = async (values) => {
  const errors = passwordVerify({}, values);
  if(values.password !== values.confrim_password) {
    errors.exit = toast.error("Password not match")
  }
  return errors;
};
export const resetPasswordValidate = async(values) =>{
  const errors = passwordVerify({}, values);
  return errors;
}
// validation from register
export const registerValidate = (values) => {
  let err = usernameVerify({}, values)
  passwordVerify(err, values)
  emailVerify(err, values)

  return err

};
// validation form profile page
export const profileValidation = (error={}, values) => {
  let errors = emailVerify({}, values)
  return errors
};
// validate password
const passwordVerify = (error = {}, values) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!values.password) {
    error.password = toast.error('Password required');
  } else if (values.password.includes(' ')) {
    error.password = toast.error('Wrong Password');
  } else if (values.password.length < 4) {
    error.password = toast.error('Password must be more than 4 characters');
  }
  else if (!specialChars.test(values.password)) {
    error.password = toast.error('Password must be includes special characters');
  }
  return error
};

// validate user name
const usernameVerify = (error = {}, values) => {
  if (!values.username) {
    error.username = toast.error('Username Required');
  } else if (values.username.includes(' ')) {
    error.username = toast.error('Invalid Username');
  }
  return error;
};
// validate email
const emailVerify = (error={}, values) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if(!values.email){
    error.email = toast.error('Email Required')
  }else if(values.email.includes(' ')){
    error.email = toast.error('Email cannot be blank')
  }else if(!specialChars.test(values.email)){
    error.email = toast.error('Wrong email format')
  }
  return error;
};
