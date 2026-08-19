

import { Minus, Plus, Trash2 } from "lucide-react";

import Nav from "../components/nav";
import Footer from "../components/footer";
import RelatedProduct from "../components/relatedproduct";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    deleteCart,
    GetCart,
    priceCalculation,
    updateCart
} from "../reduxslice/cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Cart() {

    const { cart } = useSelector((state) => state.cart);
    const navigate = useNavigate()

    const dispatch = useDispatch();

    // ==============================
    // GET CART
    // ==============================

    useEffect(() => {
        dispatch(GetCart());
    }, [dispatch]);

    const handelPrice= ()=>{

        dispatch(priceCalculation(cart?.totalPrice));

        navigate("/order")

    }


    


    // ==============================
    // INCREASE QUANTITY
    // ==============================

    const incorder = (item) => {

        const newQuantity = item.quantity + 1;

        // Don't exceed product stock
        if (newQuantity <= item.product.stock) {

            update(
                item._id,
                newQuantity
            );

        }

    };


    // ==============================
    // DECREASE QUANTITY
    // ==============================

    const decorder = (item) => {

        const newQuantity = item.quantity - 1;

        // Minimum quantity is 1
        if (newQuantity >= 1) {

            update(
                item._id,
                newQuantity
            );

        }

    };

    // ==============================
    // UPDATE CART QUANTITY
    // ==============================

    const update =  (id, quantity) => {

        try {

             dispatch(
                updateCart({
                    id,
                    quantity
                })
            )

        } catch (error) {

            toast.error(
                error?.message || "Failed to update quantity"
            );

        }
    };


    // ==============================
    // DELETE CART ITEM
    // ==============================

    const DeleteCart =  (id) => {

        try {

             dispatch(
                deleteCart(id)
            )

            toast.success("Item deleted");

        } catch (error) {

            toast.error(
                error?.message || "Failed to delete item"
            );

        }

    };


    return (
        <>

            <Nav />


            {/* ==============================
                CART
            ============================== */}

            <div className="py-4">

                <div className="container">

                    <h3 className="mb-4">
                        Shopping Cart
                    </h3>


                    <div className="row g-4">


                        {/* ==============================
                            LEFT - CART ITEMS
                        ============================== */}

                        <div className="col-lg-8">

                            <div className="card border-0">

                                <div className="card-body">


                                    {cart?.items?.length > 0 ? (

                                        cart.items.map((item) => (

                                            <div
                                                key={item._id}
                                                className="row align-items-center border-bottom py-3"
                                            >


                                                {/* ==============================
                                                    IMAGE
                                                ============================== */}

                                                <div className="col-3 col-md-2">

                                                    <img
                                                        src={
                                                            item.product.image?.[0]?.url
                                                        }
                                                        alt={
                                                            item.product.name
                                                        }
                                                        className="img-fluid"
                                                        style={{
                                                            height: "100px",
                                                            width: "100px",
                                                            objectFit: "contain"
                                                        }}
                                                    />

                                                </div>


                                                {/* ==============================
                                                    PRODUCT DETAILS
                                                ============================== */}

                                                <div className="col-9 col-md-5">

                                                    <h6 className="mb-2">

                                                        {item.product.name}

                                                    </h6>


                                                    <p className="text-success small mb-2">

                                                        In Stock

                                                    </p>


                                                    <button
                                                        className="btn btn-link text-danger p-0 d-flex align-items-center gap-1"
                                                        style={{
                                                            textDecoration: "none"
                                                        }}
                                                        onClick={() =>
                                                            DeleteCart(item._id)
                                                        }
                                                    >

                                                        <Trash2 size={15} />

                                                        Delete

                                                    </button>

                                                </div>


                                                {/* ==============================
                                                    QUANTITY
                                                ============================== */}

                                                <div className="col-6 col-md-3 mt-3 mt-md-0">

                                                    <div
                                                        className="input-group"
                                                        style={{
                                                            width: "120px"
                                                        }}
                                                    >


                                                        {/* MINUS */}

                                                        <button
                                                            className="btn btn-outline-secondary"
                                                            onClick={() =>
                                                                decorder(item)
                                                            }
                                                            disabled={
                                                                item.quantity <= 1
                                                            }
                                                        >

                                                            <Minus size={14} />

                                                        </button>


                                                        {/* QUANTITY */}

                                                        <span className="form-control text-center d-flex justify-content-center align-items-center">

                                                            {item.quantity}

                                                        </span>


                                                        {/* PLUS */}

                                                        <button
                                                            className="btn btn-outline-secondary"
                                                            onClick={() =>
                                                                incorder(item)
                                                            }
                                                            disabled={
                                                                item.quantity >=
                                                                item.product.stock
                                                            }
                                                        >

                                                            <Plus size={14} />

                                                        </button>

                                                    </div>


                                                    {/* STOCK INFO */}

                                                    <small className="text-muted">

                                                        Stock: {item.product.stock}

                                                    </small>

                                                </div>


                                                {/* ==============================
                                                    PRICE
                                                ============================== */}

                                                <div className="col-6 col-md-2 text-end mt-3 mt-md-0">

                                                    <strong>

                                                        ₹
                                                        {(
                                                            (
                                                                item.product.discountPrice ||
                                                                item.product.price
                                                            ) *
                                                            item.quantity
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}

                                                    </strong>

                                                </div>


                                            </div>

                                        ))

                                    ) : (

                                        <div className="text-center py-5">

                                            <h5>
                                                Your cart is empty
                                            </h5>

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>



                        {/* ==============================
                            RIGHT - ORDER SUMMARY
                        ============================== */}

                        <div className="col-lg-4">

                            <div className="card border-0 shadow-sm">

                                <div className="card-body">


                                    <h5 className="mb-4">

                                        Order Summary

                                    </h5>


                                    {/* TOTAL ITEMS */}

                                    <div className="d-flex justify-content-between mb-3">

                                        <span>
                                            Items
                                        </span>

                                        <span>
                                            {cart?.totalItems || 0}
                                        </span>

                                    </div>


                                    {/* DELIVERY */}

                                    <div className="d-flex justify-content-between mb-3">

                                        <span>
                                            Delivery
                                        </span>

                                        <span className="text-success">
                                            FREE
                                        </span>

                                    </div>


                                    <hr />


                                    {/* TOTAL PRICE */}

                                    <div className="d-flex justify-content-between mb-4">

                                        <strong>
                                            Total
                                        </strong>

                                        <strong className="fs-5">

                                            ₹
                                            {(
                                                cart?.totalPrice || 0
                                            ).toLocaleString("en-IN")}

                                        </strong>

                                    </div>


                                    {/* BUY BUTTON */}

                                    <button className="btn btn-warning w-100" onClick={ handelPrice}>

                                        Proceed to Buy

                                    </button>


                                </div>

                            </div>

                        </div>


                    </div>

                </div>

            </div>



            {/* ==============================
                RELATED PRODUCTS
            ============================== */}

            <div className="container pt-4">

                <h4 className="fw-bold">

                    Explore these products . . .

                </h4>

                <RelatedProduct />

            </div>


            <Footer />

        </>
    );
}

export default Cart;

