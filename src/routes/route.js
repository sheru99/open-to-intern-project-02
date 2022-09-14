const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController")
const internController = require('../controllers/internController')


router.get("/functionup/collegeDetails",collegeController.getCollege)
router.post("/functionup/interns",internController.createInternModel)




module.exports = router ;
