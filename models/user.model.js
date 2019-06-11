const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

UserSchema.pre('save', function (next) {
  this.userName = this.get('email')
  next()
})

UserSchema.post('save', function (err, doc, next) {
  if (err.name === 'MongoError' && err.code === 11000) {
    throw 'Email đã tồn tại'
  }
  else next()
})

class User {
  static async RegisterUser(userInfo) {
    const { error } = await Utils.ValidateUser(userInfo);
    if (error) throw error;

    return UserModel(userInfo).save();
  }

  static GetAllUser() {
    return UserModel.find();
  }

  static async FindUserByEmail(email) {
    if (email) {
      return UserModel.findOne({ email });
    } else {
      throw "Mising email"
    }
  }
}

class Utils {
  static async ValidateUser(info) {
    if (!info) throw "Không có thông tin đăng ký"
    if (!info.email) throw "Chưa nhập email"
    if (!info.password) throw "Chưa nhập mật khẩu"

    const userExist = await UserModel.findOne({ email: info.email });
    if (userExist)
      return { error: "Email đã tồn tại" }

    if (info.password.length < 6)
      return { error: "Mật khẩu phải nhiều hơn 6 kí tự" }

    return { error: null }
  }
}

const UserModelName = 'User';
const UserModel = mongoose.model(UserModelName, UserSchema);

module.exports = User;