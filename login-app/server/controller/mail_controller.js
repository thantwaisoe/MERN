const nodemailer = require('nodemailer');
const mailgen = require('mailgen');
const ENV = require('../config');
const Mailgen = require('mailgen');

let nodeConfig = {
   host: 'smtp.ethereal.email',
   port: 587,
   secure: false, // true for 465, false for other ports
   auth: {
      user: ENV.EMAIL, // generated ethereal user
      pass: ENV.PASSWORD, // generated ethereal password
   },
};
let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
   theme: 'default',
   product: {
      name: 'Mailgen',
      link: 'https://nailgen.js/',
   },
});
const registerMail = async (req, res) => {
   const { username, userEmail, text, subject } = req.body;

   //body of email
   let email = {
      body: {
         name: username,
         intro: text || 'Welcome from MERN',
         outro: 'Need help, or any questions?',
      },
   };
   let emailBody = MailGenerator.generate(email);
   let message = {
      from: ENV.EMAIL,
      to: userEmail,
      subject: subject || 'Signup Success',
      html: emailBody,
   };

   transporter
      .sendMail(message)
      .then(() => res.status(200).send({ message: 'You should receive an email from us' }))
      .catch((err) => res.status(500).send({ err }));
};

module.exports = {registerMail}