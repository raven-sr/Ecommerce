import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrder } from "../reduxslice/orderSlice";
import { Link } from "react-router-dom";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { Trash, Trash2 } from "lucide-react";

function MyOrder() {

    const { orders, loading } = useSelector((state) => state.order);

    const dispatch = useDispatch();

    const handelDelete =async (id)=>{

        await dispatch(deleteOrder(id));
        dispatch(getOrder());
    }

    useEffect(() => {
        dispatch(getOrder());
    }, [dispatch]);


    if (loading) {
        return (
            <div className="container py-5 text-center">
                <h5>Loading your orders...</h5>
            </div>
        );
    }


    return (

        <>
         <Nav/>
        
        <div
            className="container py-5"
            style={{ maxWidth: "1100px" }}
        >


            {/* PAGE HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2 className="fw-bold mb-1">
                        My Orders
                    </h2>

                    <p className="text-muted mb-0">
                        View and track your orders
                    </p>
                </div>

                <span className="badge bg-success fs-6">
                    {orders?.length || 0} Orders
                </span>

            </div>


            {/* NO ORDERS */}

            {!orders || orders.length === 0 ? (

                <div className="text-center py-5">

                    <h4>No orders found</h4>

                    <p className="text-muted">
                        You haven't placed any orders yet.
                    </p>

                    <Link
                        to="/"
                        className="btn btn-success"
                    >
                        Continue Shopping
                    </Link>

                </div>

            ) : (

                /* ORDERS */

                orders.map((order) => (

                    <div
                        key={order._id}
                        className="card border-0 shadow-sm mb-4"
                    >

                        <div className="card-body p-4">


                            {/* ORDER HEADER */}

                            <div className="row align-items-center mb-4">

                                <div className="col-md-6">

                                    <p className="text-muted mb-1">
                                        Order ID
                                    </p>

                                    <h6 className="fw-bold mb-1">
                                        #{order._id}
                                    </h6>

                                    <small className="text-muted">
                                        Ordered on{" "}
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                    </small>

                                </div>


                                <div className="col-md-6 text-md-end mt-3 mt-md-0 ">

                                    <div className="d-flex gap-2 align-items-center justify-content-end">
                                        <span
                                        className={`badge ${
                                            order.orderStatus === "Delivered"
                                                ? "bg-success"
                                                : order.orderStatus === "Cancelled"
                                                ? "bg-danger"
                                                : "bg-warning text-dark"
                                        }`}
                                        style={{
                                            fontSize: "14px",
                                            padding: "8px 14px"
                                        }}
                                    >
                                        {order.orderStatus}
                                    </span>

                                    <button className="btn btn-danger btn-sm d-flex align-items-center gap-1" onClick={()=>{handelDelete(order._id)}}><Trash2 size={18}/> Cancel </button>
                                    </div>

                                </div>

                            </div>


                            <hr />


                            {/* ORDER ITEMS */}

                            <h5 className="fw-bold mb-3">
                                Ordered Items
                            </h5>

                            {order.orderItems?.map((item) => (

                                <div
                                    key={item._id}
                                    className="d-flex align-items-center border-bottom py-3"
                                >

                                    {/* IMAGE */}

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            width: "90px",
                                            height: "90px",
                                            objectFit: "contain"
                                        }}
                                        className="rounded border"
                                    />


                                    {/* PRODUCT DETAILS */}

                                    <div className="ms-3 flex-grow-1">

                                        <h6 className="fw-bold mb-1">
                                            {item.name}
                                        </h6>

                                        <p className="text-muted mb-1">
                                            Quantity: {item.quantity}
                                        </p>

                                        <p className="mb-0">
                                            ₹{item.price.toLocaleString("en-IN")}
                                            {" "} × {item.quantity}
                                        </p>

                                    </div>


                                    {/* ITEM TOTAL */}

                                    <div className="text-end">

                                        <strong>
                                            ₹{(
                                                item.price *
                                                item.quantity
                                            ).toLocaleString("en-IN")}
                                        </strong>

                                    </div>

                                </div>

                            ))}


                            {/* BOTTOM SECTION */}

                            <div className="row mt-4">


                                {/* SHIPPING INFO */}

                                <div className="col-md-7">

                                    <h5 className="fw-bold mb-3">
                                        Delivery Address
                                    </h5>

                                    <div className="text-muted">

                                        <p className="mb-1">
                                            {order.shippingInfo?.address}
                                        </p>

                                        <p className="mb-1">
                                            {order.shippingInfo?.city},{" "}
                                            {order.shippingInfo?.state}
                                        </p>

                                        <p className="mb-1">
                                            {order.shippingInfo?.country} -{" "}
                                            {order.shippingInfo?.pinCode}
                                        </p>

                                        <p className="mb-0">
                                            Phone:{" "}
                                            {order.shippingInfo?.phoneNo}
                                        </p>

                                    </div>


                                    <div className="mt-4">

                                        <p className="mb-1">
                                            <strong>
                                                Payment:
                                            </strong>{" "}
                                            {order.paymentInfo?.status}
                                        </p>

                                        <p className="mb-0">
                                            <strong>
                                                Payment Date:
                                            </strong>{" "}
                                            {order.paidAt
                                                ? new Date(
                                                      order.paidAt
                                                  ).toLocaleDateString(
                                                      "en-IN"
                                                  )
                                                : "Not Paid"}
                                        </p>

                                    </div>

                                </div>


                                {/* PRICE DETAILS */}

                                <div className="col-md-5 mt-4 mt-md-0">

                                    <h5 className="fw-bold mb-3">
                                        Price Details
                                    </h5>


                                    <div className="d-flex justify-content-between mb-2">

                                        <span>
                                            Items
                                        </span>

                                        <span>
                                            ₹{order.itemsPrice?.toLocaleString("en-IN")}
                                        </span>

                                    </div>


                                    <div className="d-flex justify-content-between mb-2">

                                        <span>
                                            Tax
                                        </span>

                                        <span>
                                            ₹{order.taxPrice?.toLocaleString("en-IN")}
                                        </span>

                                    </div>


                                    <div className="d-flex justify-content-between mb-3">

                                        <span>
                                            Shipping
                                        </span>

                                        <span>
                                            {order.shippingPrice === 0
                                                ? "FREE"
                                                : `₹${order.shippingPrice?.toLocaleString("en-IN")}`
                                            }
                                        </span>

                                    </div>


                                    <hr />


                                    <div className="d-flex justify-content-between">

                                        <strong className="fs-5">
                                            Total
                                        </strong>

                                        <strong
                                            className="fs-5"
                                            style={{
                                                color: "#5C8374"
                                            }}
                                        >
                                            ₹{order.totalPrice?.toLocaleString("en-IN")}
                                        </strong>

                                    </div>

                                </div>

                            </div>


                            {/* VIEW ORDER BUTTON */}

                            <div className="text-end mt-4">

                                <Link
                                    to={`/singleorder/${order._id}`}
                                    className="btn btn-outline-success"
                                >
                                    View Order
                                </Link>

                            </div>

                        </div>

                    </div>

                ))

            )}

        </div>

        <Footer/>

        </>
    );
}

export default MyOrder;