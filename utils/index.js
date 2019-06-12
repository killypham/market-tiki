const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Utils = {
  ValidateUser: function (info) {
    // Check exist input
    if(!info.email) throw "Chưa nhập email"
    if(!info.password) throw "Chưa nhập mật khẩu"
    
    const schema = Joi.object().keys({
      email: Joi.string().required().email().error(error => {
        if (error[0].type === 'string.email')
          return 'Email không hợp lệ'
        if (error[0].type === 'any.empty')
          return 'Chưa nhập email'
      }),
      password: Joi.string().required().min(6).error(error => {
        if (error[0].type === 'string.email')
          return 'Mật khẩu không hợp lệ'
        if (error[0].type === 'any.empty')
          return 'Chưa nhập mật khẩu'
        if (error[0].type === 'string.min')
          return 'Mật khẩu phải chưa ít nhất 6 kí tự'
      }),
      // userName: Joi.string().alphanum().min(2).max(30)
    })

    return Joi.validate(info, schema);
  },

  HashPassword: function (password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },

  ValidatePassword: function (password, existPassword) {
    return bcrypt.compareSync(password, existPassword);
  },

  createToken: function (info) {
    return jwt.sign(info, process.env.SECRET_TOKEN, { expiresIn: '1d' });
  }
}

const Auth = {
  verifyToken: function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
      return res.status(401).send("Access denied. Redirect to login");
    }

    try {
      const verified = jwt.verify(token, process.env.SECRET_TOKEN);
      console.log({verified: verified});
      
      req.user = verified;

      next();
    } catch (error) {
      res.status(400).send("Invalid token. Redirect to login");
    }
  }
}

module.exports = Utils;
module.exports.Auth = Auth;