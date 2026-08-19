import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import RamsanLogo from "../assets/RamsanLogo.jpeg"

import {
    LoginUser,
    removeError,
    removeSuccess
} from "../reduxslice/userslice";

import Loader from "../components/Loader";
import Title from "../components/title";

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        success,
        error,
        loading
    } = useSelector((state) => state.user);


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    /* =====================================
       LOGIN SUBMIT
    ===================================== */

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!email || !password) {
            toast.error("Email and password are required");
            return;
        }

        dispatch(
            LoginUser({
                email,
                password
            })
        );
    };


    /* =====================================
       LOGIN SUCCESS
    ===================================== */

    useEffect(() => {

        if (success) {
            toast.success("Login successful!");
            navigate("/");
            dispatch(removeSuccess());
            setEmail("")
            setPassword("")
        }

    }, [success, dispatch, navigate]);


    /* =====================================
       LOGIN ERROR
    ===================================== */

    useEffect(() => {
         console.log("ERROR FROM REDUX:", error);
        if (error) {

            toast.error("Invalid email or password");

            dispatch(removeError());
        }

    }, [error, dispatch]);


    /* =====================================
       LOADING
    ===================================== */

    if (loading) {
        return <Loader />;
    }


    return (

        <>
         <Title title="E-commerce | Login" />


        <div className="login-page">

            {/* ================= LEFT SIDE ================= */}

            <div className="login-left">

                <div className="login-card">

                    {/* Logo */}

                    <div className="mb-3 d-flex justify-content-center">
                        <img src={RamsanLogo} className="" style={{height:"50px", width:"200px", objectFit:"contain"}}/>
                    </div>


                    {/* Welcome */}

                    <p className="welcome-text">
                        Welcome back !!!
                    </p>


                    {/* Heading */}

                    <h1 className="login-title">
                        Sign in
                    </h1>


                    {/* ================= FORM ================= */}

                    <form onSubmit={handleSubmit}>

                        {/* Email */}

                        <div className="form-group">

                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* Password */}

                        <div className="form-group">

                            <div className="password-label">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <Link
                                    to="/forgotpass"
                                    className="forgot-link"
                                >
                                    Forgot Password?
                                </Link>

                            </div>


                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* Sign In Button */}

                        <div className="d-flex justify-content-center">

                            <button
                                type="submit"
                                className="login-btn"
                                disabled={loading}
                            >
                                {loading ? "LOADING..." : "SIGN IN"}
                            </button>

                        </div>

                    </form>


                    {/* Register */}

                    <div className="register-text">

                        <span>
                            I don't have an account?
                        </span>

                        <Link
                            to="/register"
                            className="signup-link"
                        >
                            Sign up
                        </Link>

                    </div>

                </div>

            </div>


            {/* ================= RIGHT SIDE ================= */}

            <div className="login-right">

                <div className="image-container">

                    <img
                        src="https://static.vecteezy.com/system/resources/previews/026/424/488/non_2x/hand-drawn-man-with-shopping-cart-in-flat-style-vector.jpg"
                        alt="E-commerce"
                        className="login-image"
                    />

                </div>

            </div>

        </div>
      </>  
    );
}

export default Login;