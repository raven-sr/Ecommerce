import express from "express";
import { createOrder, getSingleOrder ,getAllOrdersByUser, deleteOrderByUser, getAllOrdersByAdmin, deleteOrderByAdmin, updateOrderStatus} from "../controller/ordercontroller.js";
import { rolebasedAcc, verifyUser } from "../helper/userauth.js";

const router = express.Router();

//user
router.post("/user/order",verifyUser ,createOrder);
router.get("/user/order/:id",verifyUser ,getSingleOrder);
router.get("/user/orders",verifyUser ,getAllOrdersByUser);
router.delete("/user/delete/:id",verifyUser ,deleteOrderByUser);

//admin
router.get("/admin/orders",verifyUser,rolebasedAcc("admin") ,getAllOrdersByAdmin);
router.delete("/admin/delete/:id",verifyUser,rolebasedAcc("admin") ,deleteOrderByAdmin);
router.put("/admin/updateorder/:id",verifyUser,rolebasedAcc("admin") ,updateOrderStatus);
export default router;