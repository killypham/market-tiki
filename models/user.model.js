const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Utils = require('../utils');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  userName: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 3
  },
  address: String,
  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  }],
  userRole: {
    type: Number,
    default: 1
  },
  registerDate: {
    type: Date,
    default: Date.now
  }
})

// Set default username = email
UserSchema.pre('save', function (next) {
  this.userName = this.get('email')
  this.userName = this.userName.split('@')[0];
  next()
})

// Check exist user email
UserSchema.post('save', function (err, doc, next) {
  if (err.name === 'MongoError' && err.code === 11000) {
    // Recheck here. Maybe wrong message error when update `userName` have same prefix with `email` exist
    throw 'Email đã tồn tại'
  }
  else next()
})

class User {
  static async registerByEmail(userInfo) {
    // Validate user input
    await Utils.ValidateUser(userInfo);

    // Hash password
    const hashedPassword = Utils.HashPassword(userInfo.password);
    userInfo.password = hashedPassword;

    return UserModel(userInfo).save();
  }

  static async loginByEmail(userInfo) {
    // Validate user input
    await Utils.ValidateUser(userInfo);

    const userExist = await UserModel.findOne({ email: userInfo.email });
    if (userExist) {
      // Check valid password
      const validPassword = Utils.ValidatePassword(userInfo.password, userExist.password);
      if (!validPassword) throw "Tài khoản hoặc mật khẩu không đúng"
    }
    else {
      throw "Tài khoản hoặc mật khẩu không đúng"
    }

    // Create token
    return Utils.createToken({
      _id: userExist._id,
      email: userExist.email
    })
  }

  // Update user profile
  static updateUserProfile(userID, updateInfo) {
    const userExist = UserModel.findById(userID);
    if (!userExist) {
      throw "User not found"
    }

    // Update user info
    return UserModel.findByIdAndUpdate(userID, {
      email: updateInfo.email,
      userName: updateInfo.userName,
      address: updateInfo.address
    }, {
        new: true
      });
  }

  static async changePassword(userID, passwordInfo) {
    // Check valid input
    if(!passwordInfo.currentPassword) throw "Chưa nhập mật khẩu cũ";
    if(!passwordInfo.newPassword) throw "Chưa nhập mật khẩu mới";

    const userExist = await UserModel.findById(userID);
    
    // Check valid current password
    const validCurrent = Utils.ValidatePassword(passwordInfo.currentPassword, userExist.password);
    if(!validCurrent) throw "Mật khẩu cũ không đúng";

    // Hash new password
    const newValidPassword = Utils.HashPassword(passwordInfo.newPassword);

    return UserModel.findByIdAndUpdate(userID, {password: newValidPassword}, {new: true});
  }

  static getAllUser() {
    return UserModel.find();
  }

}

const UserModelName = 'User';
const UserModel = mongoose.model(UserModelName, UserSchema);

module.exports = User;