// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { toast } from "react-hot-toast";

// import Title from "../components/title";

// function ForgotPass() {

//     const [email, setEmail] = useState("");

//     const submitHandler = (e) => {
//         e.preventDefault();

//         if (!email) {
//             toast.error("Please enter your email");
//             return;
//         }

//         // Here you will dispatch your forgotPassword action
//         console.log("Email:", email);
//     };

//     return (
//         <>
//             <Title title="E-commerce | Forgot-Password" />

//             <div className="forgot-page min-vh-100 d-flex align-items-center justify-content-center">

//                 {/* Purple glow */}
//                 <div className="forgot-glow"></div>

//                 <div className="forgot-card">

//                     <div className="row g-0 h-100">

//                         {/* ================= LEFT SIDE ================= */}
//                         <div className="col-md-6 d-flex align-items-center">

//                             <div className="forgot-form">

//                                 <h2 className="forgot-title">
//                                     Forgot Password
//                                 </h2>

//                                 <p className="forgot-description">
//                                     Enter your e-mail address and<br />
//                                     we'll give you reset instruction.
//                                 </p>

//                                 <form onSubmit={submitHandler}>

//                                     <div className="input-wrapper">

//                                         <i className="bi bi-envelope"></i>

//                                         <input
//                                             type="email"
//                                             className="form-control forgot-input"
//                                             placeholder="Enter E-mail Address"
//                                             value={email}
//                                             onChange={(e) =>
//                                                 setEmail(e.target.value)
//                                             }
//                                         />

//                                     </div>

//                                     <button
//                                         type="submit"
//                                         className="btn forgot-btn w-100"
//                                     >
//                                         Send New Password
//                                     </button>

//                                 </form>

//                                 <Link
//                                     to="/login"
//                                     className="back-login"
//                                 >
//                                     Back to Login
//                                 </Link>

//                             </div>

//                         </div>


//                         {/* ================= RIGHT SIDE ================= */}
//                         <div className="col-md-6 forgot-illustration">

//                             {/* Question mark */}
//                             <span className="question-mark">
//                                 ?
//                             </span>

//                             {/* Grid lines */}
//                             <div className="grid-line vertical-line-1"></div>
//                             <div className="grid-line vertical-line-2"></div>

//                             <div className="grid-line horizontal-line-1"></div>
//                             <div className="grid-line horizontal-line-2"></div>


//                             {/* Envelope */}
//                             <div className="envelope-box">

//                                 <i className="bi bi-envelope"></i>

//                             </div>


//                             {/* Paper plane */}
//                             <i className="bi bi-send-fill paper-plane"></i>

//                         </div>

//                     </div>

//                 </div>

//             </div>
//         </>
//     );
// }

// export default ForgotPass;

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import Title from "../components/title";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { forgotPass, removeError, removeSuccess } from "../reduxslice/userslice";



function ForgotPass() {

    const dispatch = useDispatch();
   
    const { success, error, loading } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter your email");
            return;
        }

        
        dispatch(forgotPass(email));


       
    };
        useEffect(() => {
    
            if (success) {
    
                toast.success("Forgot password mail sent");
        
                dispatch(removeSuccess());
            }
    
        }, [success, dispatch]);

            useEffect(() => {
        
                if (error) {
        
                    toast.error(error);
        
                    dispatch(removeError());
                }
        
            }, [error, dispatch]);

            
    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Title title="E-commerce | Forgot-Password" />

            <div className="forgot-page">

                {/* Purple glow */}
                <div className="forgot-glow"></div>

                {/* Main Card */}
                <div className="forgot-card">

                    <div className="container-fluid h-100 p-0">

                        <div className="row g-0 h-100">

                            {/* ================= LEFT SIDE ================= */}

                            <div className="col-md-6 d-flex align-items-center">

                                <div className="forgot-left w-100">

                                    <h1 className="forgot-title">
                                        Forgot Password
                                    </h1>

                                    <p className="forgot-description">
                                        Enter your e-mail address and<br />
                                        we'll give you reset instruction.
                                    </p>

                                    <form onSubmit={submitHandler}>

                                        {/* Email */}
                                        <div className="forgot-input">

                                            <i className="bi bi-envelope"></i>

                                            <input
                                                type="email"
                                                placeholder="Enter E-mail Address"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />

                                        </div>

                                        {/* Button */}
                                        <button
                                            type="submit"
                                            className="forgot-button"
                                        >
                                            Send New Password
                                        </button>

                                    </form>

                                    <Link
                                        to="/login"
                                        className="back-login"
                                    >
                                        <span>Back to Login</span>
                                    </Link>

                                </div>

                            </div>


                            {/* ================= RIGHT SIDE ================= */}

                            <div className="col-md-6 forgot-image-col">

                                <img
                                    src="https://img.freepik.com/premium-vector/forgot-password-login-unlock-screen-concept_106954-1440.jpg"
                                    alt="Forgot Password"
                                    className="forgot-image"
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default ForgotPass;