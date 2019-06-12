const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Utils = {
  ValidateUser: function (info) {
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
    return jwt.sign(info, process.env.SECRET_TOKEN, {expiresIn: '1d'});
  }
}

module.exports = Utils;