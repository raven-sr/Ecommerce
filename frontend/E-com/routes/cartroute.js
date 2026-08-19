import express from "express"
import { calculateOrderPrice, createCart, deleteCart, getCart, updateCart } from "../controller/cartController.js"
import { verifyUser } from "../helper/userauth.js"
const router = express.Router()


router.post("/add/cart", verifyUser, createCart)
router.get("/get/cart", verifyUser, getCart)
router.put("/update/cart/:id", verifyUser, updateCart)
router.delete("/delete/cart/:id", verifyUser, deleteCart)
router.post("/post/prices",verifyUser,calculateOrderPrice)
export default router