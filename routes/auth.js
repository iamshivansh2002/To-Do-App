const router=require("express").Router();
const validate=require("../middleware/auth");



const {signup,login, changePassword, forgotPass, resetPass} = require("../controllers/auth");



router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/changePassword").post(validate,changePassword)
router.route("/forgetPassword").post(forgotPass)
router.route("/resetPassword").post(resetPass)




module.exports=router;
