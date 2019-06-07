const express = require('express');
const router = express.Router();
const CameraModel = require('../camera.model');
const bodyParser = require('body-parser');

// get Homepage
router.get('/', function (req, res, next) {
  res.send("something here");
});


// get all cameras
router.get('/getlist', function (req, res, next) {
  console.log('1');
  Camera.getListCamera().then(cameras => {
    res.status(200).JSON(cameras);
  }).catch(err => {
    res.status(500).JSON({ cameras: null, err: err })
  })
})

// view details of camera
router.get('/details-of-camera', function (req, res, next) {
  Camera.findByID(req.body.id).then(detailsOfCamera => {
    res.status(200).JSON(detailsOfCamera);
  }).catch(err => {
    res.status(500).json({ err: err });
  })
})

// find by brand
router.get('/find-by-brand', function (req, res, next) {
  Camera.findByBrand(req.body.brand).then(cameras => {
    res.status(200).json(cameras);
  }).catch(err => {
    res.status(500).json({ camera: null, err: err });
  })
})

// add new camera

router.post('/add-new-camera', function (req, res, next) {
  // console.log('1');
  Camera.addNewCamera(req.body).then(newCamera => {
    res.status(200).json(newCamera);
  }).catch(err => {
    res.status(500).json({ newCamera: null, err: err });
  })
})

// delete a camera
router.post('/delete-camera-by-id', function (req, res, next) {
  Camera.deleteCamera(req.body.id).then( () => {
    res.status(200).json("Camera has been deleted!");
  }).catch(err => {
    res.status(500).json({ message: "khong xoa duoc!", err: err });
  })
})

// update camera information
router.post('/update-camera-info', function (req, res, next) {
  Camera.updateCamera(req.body).then(updatedCamera => {
    res.status(200).json(updatedCamera);
  }).catch(err => {
    res.status(500).json({ updatedCamera: null, err: err });
  })
})

module.exports = router;
