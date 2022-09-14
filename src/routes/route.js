const express = require("express");
const router = express.Router();

router.get("/get-api", function(req, res){
    res.send("working is fine");
});

module.exports = router