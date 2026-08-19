import express from "express"
import { addProduct, adminDeleteReview, deleteProduct, getAllProducts,getSingleProduct, productReview, UpdateProduct, viewProductReview } from "../controller/controller.js"
import { rolebasedAcc, verifyUser } from "../helper/userauth.js"
import upload from "../helper/multer.js";

const router = express.Router()
//user
router.get("/products",getAllProducts);
router.get("/product/:id",verifyUser, getSingleProduct);
router.post("/product/review",verifyUser,productReview)
router.get("/product/reviews/:id",verifyUser,viewProductReview)

//admin
router.get("/admin/products",verifyUser,rolebasedAcc("admin"),getAllProducts);
router.post("/admin/addproduct",verifyUser,rolebasedAcc("admin"),upload.array("images", 5),addProduct);
router.put("/admin/updateproduct/:id",verifyUser,rolebasedAcc("admin"),upload.array("images", 5),UpdateProduct);
router.delete("/admin/deleteproduct/:id",verifyUser,rolebasedAcc("admin"),deleteProduct);
router.delete("/admin/deletereview",verifyUser,rolebasedAcc("admin"),adminDeleteReview);


export default router