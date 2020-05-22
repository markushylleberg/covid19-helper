const router = require('express').Router();
const validator = require('email-validator');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const UserCountry = require('../models/UserCountry');

const saltRounds = 10;

router.get('/user/auth', async (req, res) => {
  const isUserAuthenticated = req.session.userId ? req.session.userId : false;
  if (isUserAuthenticated) {
    const userData = await User.query()
      .select('id', 'first_name', 'last_name', 'email', 'country')
      .where('id', isUserAuthenticated);
    return res.status(200).send({ user: userData[0] });
  } else {
    return res.status(404).send({ status: isUserAuthenticated });
  }
});

router.get('/usercountries', async (req, res) => {
  const countries = await UserCountry.query().select();

  return res.send({ countries });
});

router.post('/user/login', async (req, res) => {
  const { email, password } = req.body;

  if ((email, password)) {
    const user = await User.query().select().where('email', email);

    if (user[0]) {
      bcrypt.compare(password, user[0].password, function (error, match) {
        if (match) {
          req.session.userId = user[0].id;
          return res.status(200).send({ message: 'You have logged in.' });
        } else {
          return res
            .status(400)
            .send({ message: 'Email or password is wrong.' });
        }
      });
    } else {
      return res.status(400).send({ message: 'Email is not in our system.' });
    }
  } else {
    return res
      .status(400)
      .send({ message: 'Please fill out email and password.' });
  }
});

router.get('/user/logout', (req, res) => {
  req.session.userId = false;
  return res.status(200).send({ message: 'You have been logged out' });
});

router.post('/user/signup', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    country,
  } = req.body;

  if ((firstName, lastName, email, password, passwordConfirm)) {
    if (password === passwordConfirm) {
      if (validator.validate(email)) {
        const existingEmail = await User.query()
          .select('email')
          .where('email', email);
        if (!existingEmail[0]) {
          bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
            if (error) {
              return res.status(500).send({ response: 'error' });
            }
            const newUser = await User.query().insert({
              first_name: firstName,
              last_name: lastName,
              email,
              password: hashedPassword,
              country,
            });
            return res.send({
              message: 'User has been created! You can now log in.',
              newUser,
            });
          });
          return res.send({ message: 'User has been created!' });
        } else {
          return res.send({ message: 'Email already exists in our system.' });
        }
      } else {
        return res.send({ message: 'Please enter a valid email.' });
      }
    } else {
      return res.send({ message: 'Passwords are not alike.' });
    }
  } else {
    return res.send({ message: 'Please fill out all the fields.' });
  }
});

const userAuth = (req, res, next) => {
  const isUserAuthenticated = req.session.userId ? req.session.userId : false;
  if (!isUserAuthenticated) {
    return res.status(404).send({ message: 'User is not logged in' });
  }
  next();
};

router.post('/accountsettings', userAuth, async (req, res) => {
  const { id, firstName, lastName, country } = req.body;

  if (firstName !== '') {
    const firstNameUpdate = await User.query()
      .findById(id)
      .patch({ first_name: firstName });
  }

  if (lastName !== '') {
    const lastNameUpdate = await User.query()
      .findById(id)
      .patch({ last_name: lastName });
  }

  if (country !== '') {
    const countryUpdate = await User.query().findById(id).patch({ country });
  }

  return res.send({ message: 'User info was updated.' });
});

router.post('/accountsettings/changepassword', userAuth, async (req, res) => {
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;
  if (currentPassword && newPassword && newPasswordConfirm) {
    if (newPassword === newPasswordConfirm) {
      const user = await User.query()
        .select('password')
        .findById(req.session.userId);

      bcrypt.compare(currentPassword, user.password, function (err, result) {
        if (result) {
          bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
            const updatePass = await User.query()
              .findById(req.session.userId)
              .patch({ password: hash });
            return res.send({ message: 'Password has been updated!' });
          });
        } else {
          return res.send({ message: 'Passwords does not match.' });
        }
      });
    } else {
      return res.send({ message: 'New passwords does not match.' });
    }
  } else {
    return res.send({ message: 'Please fill out all the fields.' });
  }
});

router.post('/accountsettings/deleteaccount', userAuth, async (req, res) => {
  const { deleteMessage } = req.body;
  if (deleteMessage === 'DELETE') {
    const userDelete = await User.query().deleteById(req.session.userId);
    req.session.userId = false;
    return res.status(200).send({ message: deleteMessage });
  } else {
    return res.send({ message: 'Make sure DELETE is spelled correctly!' });
  }
});

router.post('/newpasswordrequest', async (req, res) => {
  const { email } = req.body;

  const emailExists = await User.query().select().where('email', email);

  async function sendNewPasswordMail() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'staffplannerdk@gmail.com',
        pass: 'Mackh123',
      },
    });
    const info = await transporter.sendMail({
      from: '"COVID-19 Helper - New password" <info@covid19-helper.com>',
      to: email,
      subject: 'New Password Request',
      text: "Here's your new password!",
      html: `<h3>Hello!</h3>
                   <p>So you've forgotton your password?</p>
                   <p><b>No worries!</b> Click the link below to create a new password for COVID-19 Helper</p>
              `,
    });
  }

  if (emailExists[0]) {
    sendNewPasswordMail().catch(console.error);
  }

  return res.status(200).send({
    message: 'Mail has been sent if mail exists in our system.',
  });
});

module.exports = router;
