const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController")
const internController = require('../controllers/internController')


router.get("/functionup/colleges",collegeController.getCollege)
router.post("/functionup/interns",internController.createInterModel)




module.exports = router ;
