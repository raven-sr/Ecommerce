import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getSingleOrder } from "../reduxslice/orderSlice";
import { Package, MapPin, Phone, CreditCard, ArrowLeft } from "lucide-react";
import Nav from "../components/nav";
import Footer from "../components/footer";

function SingleOrder() {

    const { id } = useParams();

    const dispatch = useDispatch();

    const {
        order,
        loading,
        error
    } = useSelector((state) => state.order);


    useEffect(() => {

        if (id) {
            dispatch(getSingleOrder(id));
        }

    }, [dispatch, id]);


    if (loading) {
        return (
            <>
                <Nav />

                <div className="container py-5 text-center">
                    <h5>Loading order...</h5>
                </div>

                <Footer />
            </>
        );
    }


    if (error) {
        return (
            <>
                <Nav />

                <div className="container py-5 text-center">

                    <h4 className="text-danger">
                        {error}
                    </h4>

                    <Link
                        to="/myorder"
                        className="btn btn-success mt-3"
                    >
                        Back to My Orders
                    </Link>

                </div>

                <Footer />
            </>
        );
    }


    if (!order) {
        return null;
    }


    return (
        <>
            <Nav />

            <div
                className="container py-5"
                style={{ maxWidth: "1100px" }}
            >

                {/* BACK BUTTON */}

                <Link
                    to="/myorder"
                    className="text-decoration-none text-dark d-inline-flex align-items-center gap-2 mb-4"
                >
                    <ArrowLeft size={18} />
                    Back to My Orders
                </Link>


                {/* ORDER HEADER */}

                <div className="card border-0 shadow-sm mb-4">

                    <div className="card-body p-4">

                        <div className="row align-items-center">

                            <div className="col-md-7">

                                <p className="text-muted mb-1">
                                    Order ID
                                </p>

                                <h5 className="fw-bold mb-2">
                                    #{order._id}
                                </h5>

                                <p className="text-muted mb-0">
                                    Ordered on{" "}
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric"
                                    })}
                                </p>

                            </div>


                            <div className="col-md-5 text-md-end mt-3 mt-md-0">

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
                                        padding: "9px 16px"
                                    }}
                                >
                                    {order.orderStatus}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ORDER ITEMS */}

                <div className="card border-0 shadow-sm mb-4">

                    <div className="card-body p-4">

                        <div className="d-flex align-items-center gap-2 mb-4">

                            <Package size={22} />

                            <h5 className="fw-bold mb-0">
                                Ordered Items
                            </h5>

                        </div>


                        {order.orderItems?.map((item) => (

                            <div
                                key={item._id}
                                className="d-flex align-items-center border-bottom py-3"
                            >

                                {/* IMAGE */}

                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="rounded border"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "contain"
                                    }}
                                />


                                {/* PRODUCT */}

                                <div className="ms-3 flex-grow-1">

                                    <h6 className="fw-bold mb-2">
                                        {item.name}
                                    </h6>

                                    <p className="text-muted mb-1">
                                        Quantity: {item.quantity}
                                    </p>

                                    <p className="mb-0">
                                        ₹{item.price?.toLocaleString("en-IN")}
                                        {" "} × {item.quantity}
                                    </p>

                                </div>


                                {/* TOTAL */}

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

                    </div>

                </div>


                {/* DELIVERY + PAYMENT */}

                <div className="row g-4 mb-4">


                    {/* DELIVERY */}

                    <div className="col-md-7">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex align-items-center gap-2 mb-4">

                                    <MapPin size={22} />

                                    <h5 className="fw-bold mb-0">
                                        Delivery Address
                                    </h5>

                                </div>


                                <p className="mb-2">
                                    <strong>
                                        Address:
                                    </strong>
                                    <br />

                                    {order.shippingInfo?.address}
                                </p>


                                <p className="mb-2">

                                    <strong>
                                        Location:
                                    </strong>
                                    <br />

                                    {order.shippingInfo?.city},{" "}
                                    {order.shippingInfo?.state}
                                    <br />

                                    {order.shippingInfo?.country}
                                    {" - "}
                                    {order.shippingInfo?.pinCode}

                                </p>


                                <p className="mb-0">

                                    <strong>
                                        Phone:
                                    </strong>{" "}

                                    {order.shippingInfo?.phoneNo}

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* PAYMENT */}

                    <div className="col-md-5">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <div className="d-flex align-items-center gap-2 mb-4">

                                    <CreditCard size={22} />

                                    <h5 className="fw-bold mb-0">
                                        Payment
                                    </h5>

                                </div>


                                <div className="d-flex justify-content-between mb-3">

                                    <span>
                                        Method
                                    </span>

                                    <strong>
                                        {order.paymentInfo?.status}
                                    </strong>

                                </div>


                                <div className="d-flex justify-content-between">

                                    <span>
                                        Payment Date
                                    </span>

                                    <span>

                                        {order.paidAt
                                            ? new Date(
                                                order.paidAt
                                            ).toLocaleDateString("en-IN")
                                            : "Not Paid"
                                        }

                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* PRICE SUMMARY */}

                <div className="card border-0 shadow-sm">

                    <div className="card-body p-4">

                        <h5 className="fw-bold mb-4">
                            Price Summary
                        </h5>


                        <div className="d-flex justify-content-between mb-3">

                            <span>
                                Items Price
                            </span>

                            <span>
                                ₹{order.itemsPrice?.toLocaleString("en-IN")}
                            </span>

                        </div>


                        <div className="d-flex justify-content-between mb-3">

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


                        <div className="d-flex justify-content-between align-items-center">

                            <h5 className="fw-bold mb-0">
                                Total
                            </h5>

                            <h5
                                className="fw-bold mb-0"
                                style={{
                                    color: "#5C8374"
                                }}
                            >
                                ₹{order.totalPrice?.toLocaleString("en-IN")}
                            </h5>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />
        </>
    );
}

export default SingleOrder;