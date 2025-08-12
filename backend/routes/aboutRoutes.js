const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');
router.post('/', aboutController.createAbout);
router.get('/', aboutController.getAbout);
router.put('/', aboutController.updateAbout);

module.exports = router;
