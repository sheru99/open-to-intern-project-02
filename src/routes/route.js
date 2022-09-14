const express = require("express");
const router = express.Router();



const collageController = require('../controllers/collegeController')
const internController = require('../controllers/internController')


router.post("/functionup/colleges",collageController.collageModel)
router.post("/functionup/interns",internController.createInterModel)




module.exports = router ;
