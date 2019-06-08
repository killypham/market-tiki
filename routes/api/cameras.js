const express = require('express');
const router = express.Router();
const CameraModel = require('../../models/camera.model');
const bodyParser = require('body-parser');

// add new camera OK

router.post('/add-new-camera', function (req, res, next) {
  CameraModel.addNewCamera(req.body).then(newCamera => {
    res.status(200).json(newCamera);
  }).catch(err => {
    res.status(500).json({ newCamera: null, err: err });
  })
})

// get all cameras OK
router.get('/getlist', function (req, res, next) {
  console.log('1');
  CameraModel.getListCamera().then(allCameras => {
    res.status(200).json(allCameras);
  }).catch(err => {
    res.status(500).json({ cameras: null, err: err })
  })
})

// view details of CameraModel OK
router.get('/details-of-camera', function (req, res, next) {
  CameraModel.findCameraById(req.body.id).then(detailsOfCamera => {
    res.status(200).json(detailsOfCamera);
  }).catch(err => {
    res.status(500).json({ err: err });
  })
})


// find by brand OK
router.get('/find-by-brand', function (req, res, next) {
  CameraModel.findByBrand(req.body.cameraBrand).then(cameras => {
    res.status(200).json(cameras);
  }).catch(err => {
    res.status(500).json({ camera: null, err: err });
  })
})

// delete a camera OK
router.post('/delete-camera-by-id', function (req, res, next) {
  CameraModel.deleteCamera(req.body.id).then(() => {
    res.status(200).json("Camera has been deleted!");
  }).catch(err => {
    res.status(500).json({ message: "khong xoa duoc!", err: err });
  })
})

// update camera information OK
router.post('/update-camera-info', function (req, res, next) {
  CameraModel.updateCamera(req.body).then(updatedCamera => {
    res.status(200).json(updatedCamera);
  }).catch(err => {
    res.status(500).json({ updatedCamera: null, err: err });
  })
})

module.exports = router;
