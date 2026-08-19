import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CreateAddress, MyData } from "../reduxslice/userslice"
import Title from "../components/title"
import Nav from "../components/nav"
import Footer from "../components/footer"
import { Form } from "lucide-react"
import { Postorder } from "../reduxslice/orderSlice"

function Order (){

    const {user} = useSelector((state) => state.user)
    const {cart,taxPrice,shippingPrice,totalPrice} = useSelector((state) => state.cart)
     const [status, setPaymentMethod] = useState("COD");
     const [pop, setPop] = useState(false)
     const [address, setAddress] = useState("");
     const [state, setState] = useState("");
     const [pinCode, setPinCode] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const dispatch  = useDispatch()
    const  [TotalPrice, setTotalPrice] = useState("")
    const [TaxPrice, setTaxPrice] = useState("")
    const [ShippingPrice, setShippingPrice] = useState("")
 
    

    useEffect(() => {
        dispatch(MyData())
    }, [dispatch])
 

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(CreateAddress({address,state,pinCode,phoneNo,city,country}))
        alert("Details Updated")
        setPop(false)

    }
    const orderItems = cart.items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        image: item.product.image?.[0]?.url,
        price: item.product.discountPrice || item.product.price,
        product: item.product._id
     }));

const shippingInfo = {
    address: address || user?.address,
    state: state || user?.state,
    pinCode: pinCode || user?.pinCode,
    phoneNo: phoneNo || user?.phoneNo,
    city: city || user?.city,
    country: country || user?.country
};

    const paymentInfo ={status}



        const placeOrder = () => {
    dispatch(Postorder({taxPrice,shippingPrice,itemsPrice: cart?.totalPrice,shippingInfo,orderItems,paymentInfo}));
    alert("Order Placed successfully")
    }


    return (
        <>
            <Title title="Checkout | Ramsan" />

            <Nav />

            <div className="container my-5">

                <h2 className="mb-4">
                    Checkout
                </h2>

                <div className="row g-4">

                    {/* LEFT SIDE */}
                    <div className="col-lg-7">

                        {/* DELIVERY ADDRESS */}
                       {user.address ? (
                        <div className="shadow-sm p-4 rounded bg-warning-subtle border mb-5">

                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <h6 className="mb-1 fw-bold">
                                        Delivery Address
                                    </h6>
                                    <small className="text-muted">
                                        Your current delivery address
                                    </small>
                                </div>

                                <button className="btn btn-sm btn-primary px-3" onClick={() => setPop(true)}>
                                    Change Address
                                </button>
                            </div>

                            <hr />

                            <div className="d-flex flex-column gap-2">

                                <div>
                                    <i className="bi bi-geo-alt-fill me-2"></i>
                                    <span className="fw-semibold">
                                        {user?.address}
                                    </span>
                                </div>

                                <div className="text-muted">
                                    {user?.city}, {user?.pinCode}
                                </div>

                                <div className="text-muted">
                                    {user?.state}, {user?.country}
                                </div>

                                <div className="mt-2">
                                    <span className="fw-semibold">
                                        Phone:
                                    </span>{" "}
                                    {user?.phoneNo}
                                </div>

                            </div>

                        </div>
                    ): (
                    <form className="card-body shadow-sm rounded p-3 mb-5" onSubmit={handleSubmit}>

                            {/* NAME */}
                            <div className="mb-3">
                                <label className="form-label">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={user?.name || ""}
                                    readOnly
                                />
                            </div>


                            {/* ADDRESS */}
                            <div className="mb-3">
                                <label className="form-label">
                                    Address
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>


                            <div className="row">

                                {/* COUNTRY */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Country
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    />
                                </div>


                                {/* STATE */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        State
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter state"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    />
                                </div>


                                {/* CITY */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>


                                {/* PIN CODE */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        PIN Code
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter PIN code"
                                        value={pinCode}
                                        onChange={(e) => setPinCode(e.target.value)}
                                    />
                                </div>


                                {/* PHONE NUMBER */}
                                <div className="col-md-12 mb-3">
                                    <label className="form-label">
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Enter phone number"
                                        value={phoneNo}
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                    />
                                </div>

                            </div>

                            <button type="submit">Submit</button>

                        </form>)}


                        {pop && (
                <form className="card-body shadow-sm rounded p-3 mb-5" onSubmit={handleSubmit}>

                            {/* NAME */}
                            <div className="mb-3">
                                <label className="form-label">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={user?.name || ""}
                                    readOnly
                                />
                            </div>


                            {/* ADDRESS */}
                            <div className="mb-3">
                                <label className="form-label">
                                    Address
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>


                            <div className="row">

                                {/* COUNTRY */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        Country
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    />
                                </div>


                                {/* STATE */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        State
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter state"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    />
                                </div>


                                {/* CITY */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>


                                {/* PIN CODE */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        PIN Code
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter PIN code"
                                        value={pinCode}
                                        onChange={(e) => setPinCode(e.target.value)}
                                    />
                                </div>


                                {/* PHONE NUMBER */}
                                <div className="col-md-12 mb-3">
                                    <label className="form-label">
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Enter phone number"
                                        value={phoneNo}
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                    />
                                </div>

                            </div>

                            <div className="d-flex justify-content-center">
                                <button className="btn btn-sm btn-primary px-3" type="submit">
                                    Submit
                                </button>

                            </div>
                        </form>)}

                        {/* PAYMENT METHOD */}
                        <div className="card shadow-sm">

                            <div className="card-header bg-white">
                                <h5 className="mb-0">
                                    Payment Method
                                </h5>
                            </div>

                            <div className="card-body">

                                {/* COD */}
                                <div className="form-check border rounded p-3 mb-3">

                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="payment"
                                        id="cod"
                                        value="COD"
                                        checked={status === "COD"}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                    />

                                    <label
                                        className="form-check-label ms-2"
                                        htmlFor="cod"
                                    >
                                        <strong>
                                            Cash on Delivery
                                        </strong>

                                        <div className="text-muted small">
                                            Pay when your order is delivered
                                        </div>
                                    </label>

                                </div>


                                {/* ONLINE PAYMENT */}
                                <div className="form-check border rounded p-3">

                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="payment"
                                        id="online"
                                        value="ONLINE"
                                        checked={status === "ONLINE"}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                    />

                                    <label
                                        className="form-check-label ms-2"
                                        htmlFor="online"
                                    >
                                        <strong>
                                            Online Payment
                                        </strong>

                                        <div className="text-muted small">
                                            Pay securely using UPI / Card
                                        </div>
                                    </label>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* RIGHT SIDE */}
                    <div className="col-lg-5">

                        <div className="card shadow-sm">

                            <div className="card-header bg-white">
                                <h5 className="mb-0">
                                    Order Summary
                                </h5>
                            </div>

                            <div className="card-body">



                                {/* PRICE DETAILS */}
                                <div className="d-flex justify-content-between mb-2">
                                    <span>
                                        Subtotal
                                    </span>

                                    <span>
                                        ₹{cart.totalPrice}
                                    </span>
                                </div>

                                 <div className="d-flex justify-content-between mb-2">
                                    <span>
                                        Shhipping Price
                                    </span>

                                    <span>
                                        ₹{shippingPrice}
                                    </span>
                                </div>




                                <div className="d-flex justify-content-between mb-2">
                                    <span>
                                       Tax Price
                                    </span>

                                    <span>
                                       ₹{taxPrice}
                                    </span>
                                </div>


                                <hr />


                                <div className="d-flex justify-content-between">

                                    <strong className="fs-5">
                                        Total
                                    </strong>

                                    <strong className="fs-5 text-primary">
                                        ₹{totalPrice}
                                    </strong>

                                </div>


                                {/* PLACE ORDER */}
                                <button
                                    className="btn btn-primary w-100 mt-4" onClick={placeOrder}
                                >
                                    Place Order
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />


            
        

            </>
    );
}
export default Order