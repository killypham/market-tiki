const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
  username: {
    type: String,
    require: [true, 'Tên người dùng trống!']
  },
  email: {
    type: String,
    require: [true, 'Email trống!']
  },
  password: {
    type: String,
    require: [true, 'Password trống!'],
    minlength: [6, 'Mật khẩu có ít nhất 6 kí tự']
  },
  address: String,
  cartID: String,
  userRole: String,
  registerDate: Date
})


const UserModel = mongoose.model('User', userSchema);

class UserClass {
  static async findUserByUserName(usernameInput) {
    if (!usernameInput) return Promise.reject("Tên người dùng không được trống!");

    return await UserModel.findOne({ username: { $regex: new RegExp(usernameInput, 'i') } });
  }

  static async registerUser(newUser) {
    const { username, email, password } = newUser;

    if (!username || !email || !password)
      return Promise.reject("Người dùng không hợp lệ!");

    return UserModel(newUser).save();
  }

  static async editUserProfile(editedUserProfile) {
    const { email, password, id } = editedUserProfile;

    if (!email || !password || !id) return Promise.reject("Invalid information to update");

    return UserModel.findById(id).then(() => {
      return UserModel.findByIdAndUpdate(id, editedUserProfile, { new: true });
    }).catch(err => {
      return Promise.reject("Người dùng không tồn tại");
    });
  }

  static async deleteUser(id) {
    if (!id) return Promise.reject("Người dùng không tồn tại");

    return await UserModel.findByIdAndRemove(id);
  }
}

module.exports = UserClass;
