import {
    ShoppingBag,
    ShieldCheck,
    Truck,
    Headphones,
    Heart
} from "lucide-react";
import Nav from "../components/nav";
import Footer from "../components/footer";

function About() {

    return (
        <>
            <Nav />

            {/* ================= HERO ================= */}

            <section
                className="py-5"
                style={{
                    backgroundColor: "#F8F9FA"
                }}
            >
                <div className="container">

                    <div className="row align-items-center g-5">

                        {/* LEFT */}

                        <div className="col-lg-6 text-center text-lg-start">

                            <span
                                className="badge mb-3"
                                style={{
                                    backgroundColor: "#5C8374",
                                    fontSize: "13px",
                                    padding: "8px 14px"
                                }}
                            >
                                Welcome to Ramsan
                            </span>

                            <h1
                                className="display-5 fw-bold mb-3"
                                style={{
                                    color: "#2C3E50"
                                }}
                            >
                                Shopping Made
                                <span style={{ color: "#5C8374" }}>
                                    {" "}Simple & Better
                                </span>
                            </h1>

                            <p
                                className="lead text-muted"
                                style={{
                                    maxWidth: "550px"
                                }}
                            >
                                Ramsan is an e-commerce platform designed
                                to make your online shopping experience
                                simple, convenient and reliable.
                            </p>

                            <p className="text-muted">
                                From browsing products to placing your order,
                                we focus on providing a smooth and enjoyable
                                shopping experience for every customer.
                            </p>

                        </div>


                        {/* RIGHT */}

                        <div className="col-lg-6">

                            <div
                                className="p-4 p-md-5 rounded-4 text-center"
                                style={{
                                    backgroundColor: "#E8F0ED"
                                }}
                            >

                                <ShoppingBag
                                    size={100}
                                    strokeWidth={1.2}
                                    style={{
                                        color: "#5C8374"
                                    }}
                                />

                                <h3
                                    className="fw-bold mt-4"
                                    style={{
                                        color: "#2C3E50"
                                    }}
                                >
                                    Your Shopping Partner
                                </h3>

                                <p className="text-muted mb-0">
                                    Quality products, simple ordering
                                    and reliable service.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>
            </section>


            {/* ================= ABOUT US ================= */}

            <section className="py-5">

                <div className="container">

                    <div className="text-center mb-5">

                        <h2
                            className="fw-bold"
                            style={{ color: "#2C3E50" }}
                        >
                            Why Choose Ramsan?
                        </h2>

                        <p className="text-muted">
                            We focus on making every part of your
                            shopping experience better.
                        </p>

                    </div>


                    <div className="row g-4">

                        {/* CARD 1 */}

                        <div className="col-12 col-md-6 col-lg-3">

                            <div className="card border-0 shadow-sm h-100 text-center p-4">

                                <ShieldCheck
                                    size={42}
                                    className="mx-auto"
                                    style={{
                                        color: "#5C8374"
                                    }}
                                />

                                <h5 className="fw-bold mt-3">
                                    Secure Shopping
                                </h5>

                                <p className="text-muted mb-0">
                                    Your information and orders
                                    are handled securely.
                                </p>

                            </div>

                        </div>


                        {/* CARD 2 */}

                        <div className="col-12 col-md-6 col-lg-3">

                            <div className="card border-0 shadow-sm h-100 text-center p-4">

                                <Truck
                                    size={42}
                                    className="mx-auto"
                                    style={{
                                        color: "#5C8374"
                                    }}
                                />

                                <h5 className="fw-bold mt-3">
                                    Fast Delivery
                                </h5>

                                <p className="text-muted mb-0">
                                    We aim to get your orders
                                    delivered quickly and safely.
                                </p>

                            </div>

                        </div>


                        {/* CARD 3 */}

                        <div className="col-12 col-md-6 col-lg-3">

                            <div className="card border-0 shadow-sm h-100 text-center p-4">

                                <Headphones
                                    size={42}
                                    className="mx-auto"
                                    style={{
                                        color: "#5C8374"
                                    }}
                                />

                                <h5 className="fw-bold mt-3">
                                    Customer Support
                                </h5>

                                <p className="text-muted mb-0">
                                    We are here to help whenever
                                    you need assistance.
                                </p>

                            </div>

                        </div>


                        {/* CARD 4 */}

                        <div className="col-12 col-md-6 col-lg-3">

                            <div className="card border-0 shadow-sm h-100 text-center p-4">

                                <Heart
                                    size={42}
                                    className="mx-auto"
                                    style={{
                                        color: "#5C8374"
                                    }}
                                />

                                <h5 className="fw-bold mt-3">
                                    Customer First
                                </h5>

                                <p className="text-muted mb-0">
                                    Your satisfaction is at the
                                    heart of what we do.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= MISSION ================= */}

            <section
                className="py-5"
                style={{
                    backgroundColor: "#F8F9FA"
                }}
            >

                <div className="container">

                    <div className="row justify-content-center">

                        <div className="col-lg-8 text-center">

                            <h2
                                className="fw-bold mb-3"
                                style={{ color: "#2C3E50" }}
                            >
                                Our Mission
                            </h2>

                            <p className="lead text-muted">
                                Our mission is to create a simple,
                                trustworthy and user-friendly online
                                shopping platform where customers can
                                discover products and place orders with ease.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            <Footer />

        </>
    );
}

export default About;