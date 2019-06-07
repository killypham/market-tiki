const mongoose = require('mongoose');
const schema = mongoose.Schema;

const cameraSchema = new Schema({
  brand: {
    type: String,
    required: [true, 'Nhập tên hãng']
  },
  name: {
    type: String,
    required: [true, 'Nhập tên camera']
  },
  sensor: {
    type: String,
    required: [true, 'Nhập thông tin sensor']
  },
  resolution: double,
  price: Number,
  soldQuantity: Number,
  remainQuantity: {
    type: Number,
    required: [true, 'Nhập số lượng còn trong kho']
  },
  description: String
});
const ModelName = 'Camera';
const CameraModel = mongoose.model(ModelName, cameraSchema);

module.exports = CameraModel;

class CameraClass {

  // ADMIN
  static async addNewCamera(newCamera) {

    const { brand, name, sensor, remainQuantity } = newCamera;

    if (!brand) { return Promise.reject("missing brand!"); }
    else if (!name) { return Promise.reject("missing name!"); }
    else if (!sensor) { return Promise.reject("missing sensor"); }
    else if (!remainQuantity) { return Promise.reject("missing remain quantity!"); }

    return CameraModel(newCamera).save();
  }

  static async deleteCamera(id) {
    return CameraModel.findByIdAndDelete(id);
  }

  static async updateCamera(updatedCamera) {

    const { brand, name, sensor, remainQuantity } = updatedCamera;

    if (!brand) { return Promise.reject("missing brand!"); }
    else if (!name) { return Promise.reject("missing name!"); }
    else if (!sensor) { return Promise.reject("missing sensor"); }
    else if (!remainQuantity) { return Promise.reject("missing remain quantity!"); }

    return this.findById(updatedCamera.id).then(function () {
      return CameraModel.findByIdAndUpdate(updatedCamera.id, updatedCamera, { new: true });
    }).catch(err => {
      return Promise.reject({ msg: "Book ID is invalid", err: err });
    });
  }
  // end ADMIN

  // USERS
  static async getListCamera() {
    return await CameraModel.find();
  }

  static async findById(id) {
    if (!id) return Promise.reject("ID khong duoc trong!");
    else return await CameraModel.findById(id);
  }

  static async findByBrand(brand) {
    if (!brand) return Promise.reject("Brand khong duoc trong!");
    else return await CameraModel.find({ brand: { $regex: new RegExp(brand), $option: 'i' } });
  }
  // end USERS
}

// module.exports = CameraClass;
