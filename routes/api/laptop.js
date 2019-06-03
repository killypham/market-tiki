const router = require('express').Router()
const Laptop = require('../../models/laptop-model');

// Get all laptop in list
router.get('/', (req, res, next) => {
    laptop.getListLaptop().then(laptop => {
      res.status(200).json(laptop);
    }).catch(err => {
      res.status(500).json({laptop: null, err: err});
    })
})

// View laptop detail
router.get('/detail', (req, res) => {
    Laptop.findByLaptop(req.query.q).then(laptopDetail => {
      res.status(200).json(laptopDetail);
    }).catch(err => {
      res.status(500).json(err);
    })
})

// Find Laptop by 
/// brand
router.get('/searchByBrand', (req, res) => {
    Laptop.findByBrand(req.query.q).then(laptop => {
      res.status(200).json(laptop);
    }).catch(err => {
      res.status(500).json({laptop: null, err: err});
    })
})

/// name
router.get('/searchByName', (req, res) => {
    Laptop.findByName(req.query.q).then(laptop => {
      res.status(200).json(laptop);
    }).catch(err => {
      res.status(500).json({laptop: null, err: err});
    })
})

/// chip
router.get('/searchByChip', (req, res) => {
    Laptop.findByChip(req.query.q).then(laptop => {
      res.status(200).json(laptop);
    }).catch(err => {
      res.status(500).json({laptop: null, err: err});
    })
})

/// graphicChipset
router.get('/searchByGrahphicChipset', (req, res) => {
    Laptop.findByGrahphicChipset(req.query.q).then(laptop => {
      res.status(200).json(laptop);
    }).catch(err => {
      res.status(500).json({laptop: null, err: err});
    })
})

/// operatingSystem
router.get('/searchByOperatingSystem', (req, res) => {
    Laptop.findByOperatingSystem(req.query.q).then(laptop => {
      res.status(200).json(laptop);
    }).catch(err => {
      res.status(500).json({laptop: null, err: err});
    })
})

// Add new Laptop
router.post('/', (req, res, next) => {
    Laptop.addLaptop(req.body).then(laptop => {
      res.status(200).json(laptop);
    }).catch(err => {
      res.status(500).json({laptop: null, err: err})
    })
})

// Update Laptop
router.post('/update', (req, res) => {
    Laptop.updateLaptop(req.body).then(updatedLaptop => {
      res.status(200).json(updatedLaptop);
    }).catch(err => {
      res.status(500).json({updatedLaptop: null, err: err});
    })
})

// Delete Laptop (By ID)
router.post('/delete/:LaptopId', (req, res) => {
    Laptop.deleteLaptopById(req.params.laptopId).then(() => {
      res.status(200).json("Laptop was deleted");
    }).catch(err => {
      res.status(500).json({msg: "Cannot delete", err: err});
    })
})

module.exports = router;