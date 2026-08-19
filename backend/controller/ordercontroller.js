import errorHandler from "../helper/helper.js";
import Order from "../models/orderdb.js"
import Product from "../models/productdb.js"


export const createOrder = async (req,res,next)=>{
    
    try{    

    const {itemsPrice,taxPrice,shippingPrice} = req.body;
        
    req.body.user = req.user._id; 
    req.body.paidAt= Date.now();
    req.body.totalPrice = itemsPrice + taxPrice + shippingPrice;

    const order= await Order.create(req.body);

    return res.status(201).json({
        success:true,
        message:"Order created",
        order
    })}catch(err){
        
        return next(err);
    }

 }


//getSingleOrder

export const getSingleOrder = async (req,res,next)=>{

    const id = req.params.id;

    const order = await Order.findById(id);

    if(!order){

        return next(new errorHandler("Order not found",404));
    }

    return res.status(200).json({
        success:true,
        order,

    })

}

//getAllOrdersByUser

export const getAllOrdersByUser = async (req,res,next)=>{

    const orders = await Order.find({user:req.user._id}).populate("user","name email");

 if(!orders){

        return next(new errorHandler("Order not found",404));
    }

     return res.status(200).json({
        success:true,
        orders,

    })


}

//getAllOrdersByAdmin
export const getAllOrdersByAdmin = async (req,res,next)=>{

     const orders = await Order.find().populate("user","name email");

 if(!orders){

        return next(new errorHandler("Order not found",404));
    }
    let totalAmount=0;

    orders.forEach((order)=>{totalAmount += order.totalPrice});

     return res.status(200).json({
        success:true,
        orders,
        totalAmount

    })

}

//deleteOrderByAdmin

export const deleteOrderByAdmin = async(req,res,next)=>{

    const deleteOrder = await Order.findById(req.params.id)

     if(!deleteOrder){

        return next(new errorHandler("Order not found",404));
    }

    if(deleteOrder.orderStatus!="Delivered"){

         return next(new errorHandler("This Order is under processing and cannot be Deleted",404))
    }

    await Order.deleteOne({_id:req.params.id})

    return res.status(200).json({
        success:true,
        message:"Order Deleted Successfully"
      

    })

}

//deleteOrderByUser

export const deleteOrderByUser = async (req,res,next)=>{
 
    const order = await Order.findOne({user:req.user._id,
        _id:req.params.id})

     if(!order){

        return next(new errorHandler("Order not found",404));
    }

    
    if (order.orderStatus === "Delivered") {
        return next(
            new errorHandler("This order is already delivered and cannot be deleted", 400)
        );
    }

    await order.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Order deleted successfully"
    });




}

// Admin Update Order Status
export const updateOrderStatus = async (req, res, next) => {
      
    console.log("===== UPDATE ORDER CONTROLLER =====");
    const id = req.params.id;

    // Find the order
    const order = await Order.findById(id);

    if (!order) {
        return next(new errorHandler("Order not found", 404));
    }

    // Prevent updating the same order twice
    if (order.orderStatus === "Delivered") {
        return next(new errorHandler("This order has already been delivered", 400));
    }

    // Update stock for every product in the order
    await Promise.all(
        order.orderItems.map((item) =>
            updateQuantity(item.product, item.quantity)
        )
    );

    // Update order status
    order.orderStatus = req.body.status;

    // Save delivery time
    if (order.orderStatus === "Delivered") {
        order.deliveredAt = Date.now();
    }

    // Save updated order
    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        order
    });
};


// Update Product Stock
async function updateQuantity(id, quantity) {

    const product = await Product.findById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    // Reduce stock
    product.stock -= quantity;

    // Save updated stock
    await product.save({ validateBeforeSave: false });
}