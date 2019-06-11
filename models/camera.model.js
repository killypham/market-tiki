const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  resolution: Number,
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

    const { brand, name, sensor, remainQuantity, id } = updatedCamera;

    if (!brand) { return Promise.reject("missing brand!"); }
    else if (!name) { return Promise.reject("missing name!"); }
    else if (!sensor) { return Promise.reject("missing sensor"); }
    else if (!remainQuantity) { return Promise.reject("missing remain quantity!"); }

    return CameraModel.findById(id).then(function () {
      return CameraModel.findByIdAndUpdate(id, updatedCamera, { new: true });
    }).catch(err => {
      return Promise.reject({ msg: "Camera ID is invalid", err: err });
    });
  }
  // end ADMIN

  // USERS
  static async getListCamera() {
    return await CameraModel.find();
  }

  static async findCameraById(id) {
    if (!id) return Promise.reject("ID khong duoc trong!");
    else return await CameraModel.findById(id);
  }

  static async findByBrand(cameraBrand) {
    if (!cameraBrand) return Promise.reject("Brand khong duoc trong!");
    else return await CameraModel.find({ brand: { $regex: new RegExp(cameraBrand, 'i' )} });
  }
  // end USERS
}

module.exports = CameraClass;
