const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const vendorController = require('../controllers/vendorController');

router.post('/register', vendorController.registerVendor);
router.post('/login', vendorController.loginVendor);

module.exports = router;
