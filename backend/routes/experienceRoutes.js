const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');


router.get('/', experienceController.getExperiences);


router.get('/:id', experienceController.getExperienceById);


router.post('/', experienceController.createExperience);

router.put('/:id', experienceController.updateExperience);


router.delete('/:id', experienceController.deleteExperience);

module.exports = router;
