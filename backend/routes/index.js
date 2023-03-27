var express = require('express');
var router = express.Router();
var multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage });


const indexController = require("../controllers/index");
// const validate = require('../midlleware/validate');


/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index",{ title:"Express" });
});
//
router.post('/userLogin', indexController.userLoginController);
  
router.post('/userLogout',indexController.userLogoutController);

router.post('/userRegister', indexController.userRegisterController);

router.post('/forgotPassword', indexController.forgotPasswordController);

router.post('/userDelete', indexController.UserDeleteController);

router.get('/userprofile', indexController.userprofileController);

router.get('/getUserDetails',indexController.getUserDetailscontroller);

router.post('/getUserDetailsbyemail', indexController.getUserDetailsbyemailcontroller);

router.post('/userUpdate', indexController.userUpdatController);

router.post('/newuserUpdate', indexController.newuserUpdatController);

router.post('/profileUpload',upload.single("profile_pic"), indexController.profileUpload);


module.exports = router;

