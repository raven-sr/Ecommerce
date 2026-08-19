import express from "express"
import { logInUser, logOut, registerUser, forgotPassword, resetPassword, getAllUsers, getSingleUser, updateUser, deleteUser, userAddress, GetMyData } from "../controller/usercontroller.js"
import { rolebasedAcc, verifyUser } from "../helper/userauth.js";
import upload from "../helper/multer.js";

const router = express.Router()

//user
router.post("/register",upload.single("avatar"),registerUser);
router.post("/login",logInUser);
router.get("/logout",logOut)
router.post("/password/forgot",forgotPassword)
router.post("/password/reset/:token",resetPassword)
router.patch("/create/address", verifyUser, userAddress)
router.get("/get/mydata", verifyUser, GetMyData)

//admin
router.get("/admin/users",verifyUser,rolebasedAcc("admin"),getAllUsers);
router.get("/admin/User/:id",verifyUser,rolebasedAcc("admin"),getSingleUser);
router.put("/admin/update/:id",verifyUser,rolebasedAcc("admin"),updateUser);
router.delete("/admin/delete/:id",verifyUser,rolebasedAcc("admin"),deleteUser);

export default router