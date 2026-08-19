import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send
} from "lucide-react";

import Nav from "../components/nav";
import Footer from "../components/footer";

function Contact() {

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

                    <div className="text-center">

                        <span
                            className="badge mb-3"
                            style={{
                                backgroundColor: "#5C8374",
                                padding: "8px 14px"
                            }}
                        >
                            Get In Touch
                        </span>

                        <h1
                            className="display-5 fw-bold"
                            style={{
                                color: "#2C3E50"
                            }}
                        >
                            Contact Us
                        </h1>

                        <p
                            className="text-muted mx-auto"
                            style={{
                                maxWidth: "600px"
                            }}
                        >
                            Have a question about your order or our products?
                            Send us a message and we'll be happy to help.
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= CONTACT SECTION ================= */}

            <section className="py-5">

                <div className="container">

                    <div className="row g-4">


                        {/* ================= CONTACT INFO ================= */}

                        <div className="col-lg-5">

                            <div
                                className="h-100 rounded-4 p-4 p-md-5"
                                style={{
                                    backgroundColor: "#E8F0ED"
                                }}
                            >

                                <h3
                                    className="fw-bold mb-4"
                                    style={{
                                        color: "#2C3E50"
                                    }}
                                >
                                    Let's Talk
                                </h3>

                                <p className="text-muted mb-5">
                                    We would love to hear from you.
                                    Feel free to reach out to us for
                                    any questions or support.
                                </p>


                                {/* EMAIL */}

                                <div className="d-flex align-items-start gap-3 mb-4">

                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "45px",
                                            height: "45px",
                                            backgroundColor: "#5C8374",
                                            color: "white",
                                            flexShrink: 0
                                        }}
                                    >
                                        <Mail size={20} />
                                    </div>

                                    <div>

                                        <h6 className="fw-bold mb-1">
                                            Email
                                        </h6>

                                        <p className="text-muted mb-0">
                                            support@ramsan.com
                                        </p>

                                    </div>

                                </div>


                                {/* PHONE */}

                                <div className="d-flex align-items-start gap-3 mb-4">

                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "45px",
                                            height: "45px",
                                            backgroundColor: "#5C8374",
                                            color: "white",
                                            flexShrink: 0
                                        }}
                                    >
                                        <Phone size={20} />
                                    </div>

                                    <div>

                                        <h6 className="fw-bold mb-1">
                                            Phone
                                        </h6>

                                        <p className="text-muted mb-0">
                                            +91 63834 61690
                                        </p>

                                    </div>

                                </div>


                                {/* LOCATION */}

                                <div className="d-flex align-items-start gap-3 mb-4">

                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "45px",
                                            height: "45px",
                                            backgroundColor: "#5C8374",
                                            color: "white",
                                            flexShrink: 0
                                        }}
                                    >
                                        <MapPin size={20} />
                                    </div>

                                    <div>

                                        <h6 className="fw-bold mb-1">
                                            Address
                                        </h6>

                                        <p className="text-muted mb-0">
                                            Tamil Nadu, India
                                        </p>

                                    </div>

                                </div>


                                {/* WORKING HOURS */}

                                <div className="d-flex align-items-start gap-3">

                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "45px",
                                            height: "45px",
                                            backgroundColor: "#5C8374",
                                            color: "white",
                                            flexShrink: 0
                                        }}
                                    >
                                        <Clock size={20} />
                                    </div>

                                    <div>

                                        <h6 className="fw-bold mb-1">
                                            Working Hours
                                        </h6>

                                        <p className="text-muted mb-0">
                                            Monday - Saturday
                                            <br />
                                            9:00 AM - 6:00 PM
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* ================= FORM ================= */}

                        <div className="col-lg-7">

                            <div className="card border-0 shadow-sm rounded-4">

                                <div className="card-body p-4 p-md-5">

                                    <h3
                                        className="fw-bold mb-4"
                                        style={{
                                            color: "#2C3E50"
                                        }}
                                    >
                                        Send Us a Message
                                    </h3>


                                    <form>


                                        {/* NAME */}

                                        <div className="mb-3">

                                            <label className="form-label fw-semibold">
                                                Your Name
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your name"
                                            />

                                        </div>


                                        {/* EMAIL */}

                                        <div className="mb-3">

                                            <label className="form-label fw-semibold">
                                                Email Address
                                            </label>

                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter your email"
                                            />

                                        </div>


                                        {/* SUBJECT */}

                                        <div className="mb-3">

                                            <label className="form-label fw-semibold">
                                                Subject
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="What is your message about?"
                                            />

                                        </div>


                                        {/* MESSAGE */}

                                        <div className="mb-4">

                                            <label className="form-label fw-semibold">
                                                Message
                                            </label>

                                            <textarea
                                                className="form-control"
                                                rows="5"
                                                placeholder="Write your message..."
                                            ></textarea>

                                        </div>


                                        {/* BUTTON */}

                                        <button
                                            type="submit"
                                            className="btn text-white d-flex align-items-center justify-content-center gap-2 w-100"
                                            style={{
                                                backgroundColor: "#5C8374",
                                                padding: "11px"
                                            }}
                                        >

                                            <Send size={18} />

                                            Send Message

                                        </button>

                                    </form>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= FAQ / SUPPORT ================= */}

            <section
                className="py-5"
                style={{
                    backgroundColor: "#F8F9FA"
                }}
            >

                <div className="container">

                    <div className="text-center">

                        <h3
                            className="fw-bold"
                            style={{
                                color: "#2C3E50"
                            }}
                        >
                            Need Help With Your Order?
                        </h3>

                        <p className="text-muted mb-0">
                            You can also check your orders from the
                            My Orders section of your account.
                        </p>

                    </div>

                </div>

            </section>


            <Footer />

        </>
    );
}

export default Contact;