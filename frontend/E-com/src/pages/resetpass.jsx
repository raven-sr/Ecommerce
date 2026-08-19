import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import Title from "../components/title";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { removeError, removeSuccess, resetPass } from "../reduxslice/userslice";



function ResetPass() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {token}= useParams()
   
    const { success, error, loading } = useSelector((state) => state.user);

    const [Password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const value = {
        Password, confirmPassword
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(Password != confirmPassword){
            toast.error("Password doesn't match")
            return
        }
        dispatch(resetPass({token, value}))
    };
        useEffect(() => {
    
            if (success){
                toast.success("Password Changed Successfully");
                navigate("/login");
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
                <div className="forgot-card rounded">

                    <div className="container-fluid h-100 p-0">

                        <div className="row g-0 h-100">

                            {/* ================= LEFT SIDE ================= */}

                            <div className="col-md-6 d-flex align-items-center">

                                <div className="forgot-left w-100">

                                    <h1 className="forgot-title">
                                        Reset Password
                                    </h1>

                                   <p className="forgot-description">
                                        Enter your new password below<br />
                                        Please ensure both password's matches.
                                    </p>

                                    <form onSubmit={submitHandler}>

                                        {/* Email */}
                                        <div className="forgot-input">

                                            <i className="bi bi-envelope"></i>

                                            <input
                                                type="password"
                                                placeholder="Enter Password"
                                                value={Password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                            />

                                        </div>
                                               <div className="forgot-input">

                                            <i className="bi bi-envelope"></i>

                                            <input
                                                type="password"
                                                placeholder="Re-Enter Password"
                                                value={confirmPassword}
                                                onChange={(e) =>
                                                    setconfirmPassword(e.target.value)
                                                }
                                            />

                                        </div>

                                        {/* Button */}
                                        <button
                                            type="submit"
                                            className="forgot-button"
                                        >
                                            Reset Password
                                        </button>

                                    </form>

                                    

                                </div>

                            </div>


                            {/* ================= RIGHT SIDE ================= */}

                            <div className="col-md-6 forgot-image-col">

                                <img
                                    src="https://img.freepik.com/premium-vector/datacenter-businessman_18591-27585.jpg"
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

export default ResetPass;