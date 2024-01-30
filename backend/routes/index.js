

const express = require('express');

const router = express.Router();
const user = require("../routes/user")



router.use('/user',user);
/**exports.health = function(req,res){
    res.send("All Good !");
};**/
module.exports = router;