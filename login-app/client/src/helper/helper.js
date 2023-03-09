import axios from 'axios';
import decode from 'jwt-decode';
// axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER

export const getUsernameFromToken = () => {
   let token = localStorage.getItem('token');
   if (!token) return Promise.reject('Cannot find token');
   return decode(token)
};

export const auth = async (username) => {
   try {
      return await axios.post('http://localhost:8080/api/auth', { username: username });
   } catch (error) {
      return { error: 'username doesdfdfdffdfdf not exist' };
   }
};

export const getUser = async ({ username }) => {
   try {
      const { data } = await axios.get(`/api/user/${username}`);
      return data;
   } catch (error) {
      return { error: 'Password did not match' };
   }
};
export const registerUser = async (credential) => {
   try {
      const {
         data: { message },
         status,
      } = await axios.post('http://localhost:8080/api/register', credential);

      let { username, email } = credential;
      if (status === 201) {
         await axios.post('http://localhost:8080/api/register-mail', { username, userEmail: email, text: message });
      }
      return Promise.resolve();
   } catch (error) {
      return Promise.reject({ error });
   }
};
export const verifyUserForLogin = async ({ username, password }) => {
   try {
      if (username) {
         const { data } = await axios.post('http://localhost:8080/api/login', { username, password });
         return Promise.resolve({ data });
      }
   } catch (error) {
      return Promise.reject({ error });
   }
};
export const updateUser = async (params) => {
   try {
      const token = await localStorage.getItem('token');
      console.log(token);
      const { data } = await axios.put('http://localhost:8080/api/update-user', params, {
         headers: { authorization: `Bearer ${token}` },
      });
      return Promise.resolve(data);
   } catch (error) {
      return Promise.reject({ error: 'Update Profile fail' });
   }
};
export const generateOtp = async (username) => {
   try {
      const {
         data: { code },
         status,
      } = await axios.get('http://localhost:8080/api/generate-otp', { params: { username } });

      if (status === 201) {
         const {
            data: { email },
         } = await getUser(username);
         let text = `Your Password OTP is ${code}. Verify and recover your password`;
         await axios.post('/api/register-mail', { username, userEmail: email, text, subject: 'Password Recovery OTP' });
      }
      return Promise.resolve(code);
   } catch (error) {
      return Promise.reject({ error });
   }
};
export const verifyOtp = async ({ username, code }) => {
   try {
      const { data, status } = await axios.get('http://localhost:8080/api/verify-otp', { params: { username, code } });
      return Promise.resolve({ data, status });
   } catch (error) {
      return Promise.reject({ error });
   }
};
export const resetPassword = async ({ username, password }) => {
   try {
      const { data, status } = await axios.put('http://localhost:8080/api/reset-password', { username, password });
      return Promise.resolve({ data, status });
   } catch (error) {
      return Promise.reject({ error });
   }
};
