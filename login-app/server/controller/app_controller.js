const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generators');
const ENV = require('../config');
const UserModal = require('../model/User.model');

/*   middleware function to check user exist before login route  */
const verifyUser = async (req, res, next) => {
   try {
      const getParamMethod = req.method === 'GET' ? req.query : req.body; // to get params check it request method is get or post
      const { username } = getParamMethod;
      const existUser = await UserModal.findOne({ username });
      if (!existUser) return res.status(400).send({ error: 'Username does not exist' });
      next();
   } catch (error) {
      return res.status(400).send({ error: 'Authentication error' });
   }
};

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
const register = async (req, res) => {
   try {
      const { username, password, profile, email } = req.body;
      //check username is exist or not
      const existUsername = new Promise((resolve, reject) => {
         UserModal.findOne({ username }, (err, user) => {
            if (err) reject(new Error(err)); // if err is return
            if (user) reject({ error: 'Please use unique email' }); // if user is present in database

            resolve(); // if none of above
         });
      });

      //check email is exist or not
      const existEmail = new Promise((resolve, reject) => {
         UserModal.findOne({ email }, (err, email) => {
            if (err) reject(new Error(err)); // if err is return
            if (email) reject({ error: 'Please use unique email' }); // if user is present in database

            resolve(); // if none of above
         });
      });
      Promise.all([existUsername, existEmail])
         .then(() => {
            if (password) {
               bcrypt
                  .hash(password, 10)
                  .then((hashedPassword) => {
                     const newUser = new UserModal({
                        username,
                        password: hashedPassword,
                        profile: profile || '',
                        email,
                     });
                     newUser
                        .save()
                        .then(() => res.status(201).send({ message: 'User register Successful' }))
                        .catch((error) => res.status(500).send({ error }));
                  })
                  .catch(() =>
                     res.status(500).send({
                        error: 'Enable to hashed password',
                     })
                  );
            }
         })
         .catch((error) =>
            res.status(500).send({
               error: error,
            })
         );
   } catch (error) {
      return res.status(500).send(error);
   }
};
/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
const login = async (req, res) => {
   const { username, password } = req.body;

   try {
      const user = await UserModal.findOne({ username });
      //check password
      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) throw new Error('Wrong Password');
      const jwtToken = jwt.sign(
         {
            userId: user._id, // _id from mongodb row id
            username: user.username,
         },
         ENV.JWT_SECRET, // secret key
         { expiresIn: '24h' } // expired time
      );
      //respond to client
      res.status(200).send({
         message: 'Login Successful',
         username: user.username,
         token: jwtToken,
      });
   } catch (error) {
      return res.status(400).send({ error: error.message });
   }
};

/** GET: http://localhost:8080/api/user/example123 */
async function getUser(req,res){
    
   const { username } = req.params;

   try {
       
       if(!username) return res.status(501).send({ error: "Invalid Username"});

       UserModal.findOne({ username }, function(err, user){
           if(err) return res.status(500).send({ err });
           if(!user) return res.status(501).send({ error : "Couldn't Find the User"});

           /** remove password from user */
           // mongoose return unnecessary data with object so convert it into json
           const { password, ...rest } = Object.assign({}, user.toJSON());

           return res.status(201).send(rest);
       })

   } catch (error) {
       return res.status(404).send({ error : "Cannot Find User Data"});
   }

}

/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "id" : "<userid>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
const updateUser = async (req, res) => {
   try {
      // const id = req.query.id
      const { userId } = req.user;
      if (userId) {
         const body = req.body;
         UserModal.updateOne({ _id: userId }, body, (err, data) => {
            if (err) throw err;
            return res.status(201).send({ message: 'Updated Users data' });
         });
      } else {
         return res.status(401).send({ error: 'User Not Found' });
      }
   } catch (error) {
      return res.status(401).send({ error });
   }
};
/** GET: http://localhost:8080/api/generateOTP */
const generateOtp = async (req, res) => {
   try {
      req.app.locals.OTP = otpGenerator.generate(6, {
         alphabets: false,
         upperCase: false,
         specialChar: false,
      });
      return res.send({ code: req.app.locals.OTP }).status(201);
   } catch (error) {
      return res.send({error}).status(500)
   }
   
};
/** GET: http://localhost:8080/api/verifyOTP */
const verifyOtp = async (req, res) => {
   const { code } = req.query;
   if (parseInt(req.app.locals.OTP) === parseInt(code)) {
      req.app.locals.OTP = null;
      req.app.locals.resetSession = true;
      return res.status(201).send({ message: 'OTP is verified' });
   }
   return res.status(400).send({ error: 'Invalid OTP code' });
};
/** GET: http://localhost:8080/api/createResetSession */
const createResetSession = async (req, res) => {
   if (req.app.locals.resetSession) {
      return res.status(201).send({ flag: req.app.locals.resetSession });
   }
   return res.status(440).send({ error: 'Session expired' });
};
/** PUT: http://localhost:8080/api/resetPassword */
const resetPassword = async (req, res) => {
   try {
      if(!req.app.locals.resetSession) return res.status(440).send({ error: 'Session expired' });
      const { username, password } = req.body;
      try {
         UserModal.findOne({ username })
            .then((user) => {
               bcrypt
                  .hash(password, 10)
                  .then((hashedPassword) => {
                     UserModal.updateOne(
                        { username: user.username },
                        { password: hashedPassword },
                        (err, result) => {
                           if (err) throw err;
                           return res.status(201).send({ message: 'Updated Password' });
                        }
                     );
                  })
                  .catch((e) => res.status(500).send({ error: 'Enable to hash password' }));
            })
            .catch((err) => res.status(400).send({ error: 'Enable to find user' }));
      } catch (error) {
         return res.status(500).send({ error });
      }
   } catch (error) {
      return res.status(401).send({ error });
   }
};
module.exports = {
   verifyUser,
   register,
   login,
   getUser,
   updateUser,
   generateOtp,
   verifyOtp,
   createResetSession,
   resetPassword,
};
