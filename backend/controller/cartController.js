import errorHandler from "../helper/helper.js"
import Cart from "../models/cartdb.js"

export const createCart = async (req, res, next) => {
    try {
        const { product, quantity } = req.body;

        // Find cart of logged-in user
        let cart = await Cart.findOne({
            user: req.user._id
        });

        // ==============================
        // CART DOES NOT EXIST
        // ==============================
        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: [
                    {
                        product,
                        quantity
                    }
                ]
            });
            
        }

        // ==============================
        // CART ALREADY EXISTS
        // ==============================
        else {
            const existingItem = cart.items.find(
                (item) =>
                    item.product.toString() === product.toString()
            );

            // Product already exists in cart
            if (existingItem) {
                existingItem.quantity += quantity;
            }

            // Product doesn't exist in cart
            else {
                cart.items.push({
                    product,
                    quantity
                });
            }
        }

        cart.totalProducts = cart.items.length || 0

        // Populate product details
        await cart.populate("items.product");


        cart.totalItems = cart.items.reduce(
            (total, item) => total + item.quantity,
            0
        );

   
        cart.totalPrice = cart.items.reduce(
            (total, item) => {
                const price =
                    item.product.discountPrice ||
                    item.product.price;

                return total + price * item.quantity;
            },
            0
        );

        // Save updated cart
        await cart.save();

        return res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        next(error);
    }
};

export const getCart = async (req, res, next) => {

    const cart = await Cart.findOne({
        user: req.user._id
    }).populate("items.product");

    if (!cart) {
        return next(new errorHandler("Cart is Empty", 404));
    }

    // Remove cart items whose product no longer exists
    cart.items = cart.items.filter(
        item => item.product !== null
    );

    // Recalculate cart totals
    let totalItems = 0;
    let totalPrice = 0;
    let totalProducts = 0;

    cart.items.forEach(item => {

        const price =
            item.product.discountPrice ||
            item.product.price;

        totalItems += item.quantity;
        totalPrice += price * item.quantity;
        totalProducts += 1;
    });

    cart.totalItems = totalItems;
    cart.totalPrice = totalPrice;
    cart.totalProducts = totalProducts;

    // Save updated cart
    await cart.save();

    return res.status(200).json({
        success: true,
        cart
    });
};

//Delete cart 


export const deleteCart = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find user's cart and remove the item
        const cart = await Cart.findOneAndUpdate(
            {
                user: req.user._id,
                "items._id": id
            },
            {
                $pull: {
                    items: { _id: id }
                }
            },
            {
                new: true
            }
        );

        if (!cart) {
            return next(
                new errorHandler("Cart item not found", 404)
            );
        }

        // Total number of different products
        cart.totalProducts = cart.items.length;

        // Total quantity
        cart.totalItems = cart.items.reduce(
            (total, item) => total + item.quantity,
            0
        );

        // Populate only after the delete
        await cart.populate("items.product");

        // Calculate total price
        cart.totalPrice = cart.items.reduce(
            (total, item) => {
                const price =
                    item.product.discountPrice ||
                    item.product.price;

                return total + price * item.quantity;
            },
            0
        );

        await cart.save();

        return res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        next(error);
    }
};



export const updateCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        // Validate quantity
        if (!quantity || quantity < 1) {
            return next(
                new errorHandler("Quantity must be at least 1", 400)
            );
        }

        // Find logged-in user's cart
        const cart = await Cart.findOne({
            user: req.user._id,
            "items._id": id
        }).populate("items.product");

        if (!cart) {
            return next(
                new errorHandler("Cart item not found", 404)
            );
        }

        // Find the particular cart item
        const cartItem = cart.items.id(id);

        if (!cartItem) {
            return next(
                new errorHandler("Cart item not found", 404)
            );
        }

        // Update quantity
        cartItem.quantity = quantity;

        // ==============================
        // CALCULATE TOTAL ITEMS
        // ==============================

        cart.totalItems = cart.items.reduce(
            (total, item) => total + item.quantity,
            0
        );

        // ==============================
        // CALCULATE TOTAL PRICE
        // ==============================

        cart.totalPrice = cart.items.reduce(
            (total, item) => {
                const price =
                    item.product.discountPrice ||
                    item.product.price;

                return total + price * item.quantity;
            },
            0
        );

        // Save cart
        await cart.save();

        return res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        next(error);
    }
};

export const calculateOrderPrice = async (req, res, next) => {
    try {

        const { itemsPrice } = req.body;

        if (itemsPrice === undefined || itemsPrice === null) {
            return next(
                new errorHandler("Items price is required", 400)
            );
        }

        const price = Number(itemsPrice);

        if (isNaN(price) || price < 0) {
            return next(
                new errorHandler("Invalid items price", 400)
            );
        }

        

        // -------------------------
        // TAX
        // -------------------------

        const taxRate = 18;

        const taxPrice = (price * taxRate) / 100;


        // -------------------------
        // SHIPPING
        // -------------------------

        let shippingPrice;

        if (price >= 2000) {
            shippingPrice = 0;
        }
        else if (price >= 1000) {
            shippingPrice = 60;
        }
        else {
            shippingPrice = 100;
        }


        // -------------------------
        // TOTAL
        // -------------------------

        const totalPrice =
            price +
            taxPrice +
            shippingPrice;


        return res.status(200).json({
            success: true,

            price: {
                itemsPrice: price,
                taxPrice,
                shippingPrice,
                totalPrice
            }
        });

    } catch (err) {

        return next(err);

    }
};



