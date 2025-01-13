const userController=require("../../controllers/userController");
const {inputValidation,tokenValidation,isAdminValidation}=require("../../middlewares/UserMiddleware")
const express=require("express");
const router=express.Router();


router.post("/signup",inputValidation,userController.signUp);
router.post("/signIn",inputValidation,userController.signIn);
router.post("/isAuth",tokenValidation,userController.isAuthenticated);
router.post("/isAdmin",isAdminValidation,userController.isAdmin)
module.exports=router;