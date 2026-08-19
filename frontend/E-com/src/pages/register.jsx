// // import { useState } from "react";
// // import Title from "../components/title"
// // import {Link} from "react-router-dom"

// // function Register(){

// //    const [image, setImage] = useState("https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg");

// //     const handleImageChange = (e) => {
// //         const file = e.target.files[0];

// //     if (file) {
// //         setImage(URL.createObjectURL(file));
// //     }

// //     };


// //     return (
// //         <>
// //          <Title title="E-commerce | Register" />
// //         <div className="container">

// //             <div className="row">

// //                 <div className="col-md-6">

// //                 </div>
// //                 <div className="col-12 col-md-6">
// //                     <div className="d-flex gap-5">
// //                         <h5>Ramzon</h5>
// //                         <span>Already have an account? <Link to="/login">Sign in here!</Link></span>
// //                     </div>

// //                     <form className="mt-4">

// //     {/* Username */}
// //     <div className="mb-3">
// //         <label className="form-label" htmlFor="username">
// //             User Name
// //         </label>

// //         <input
// //             className="form-control"
// //             type="text"
// //             id="username"
// //             name="username"
// //             placeholder="Enter your username"
// //         />
// //     </div>

// //     {/* Email & Password */}
// //     <div className="row">

// //         <div className="col-md-6 mb-3">
// //             <label className="form-label" htmlFor="email">
// //                 Email
// //             </label>

// //             <input
// //                 className="form-control"
// //                 type="email"
// //                 id="email"
// //                 name="email"
// //                 placeholder="Enter your email"
// //             />
// //         </div>

// //         <div className="col-md-6 mb-3">
// //             <label className="form-label" htmlFor="password">
// //                 Password
// //             </label>

// //             <input
// //                 className="form-control"
// //                 type="password"
// //                 id="password"
// //                 name="password"
// //                 placeholder="Enter your password"
// //             />
// //         </div>

// //     </div>

// //     {/* User Image */}
// //     <div className="mb-3">

// //         <label className="form-label" htmlFor="image">
// //             User Image
// //         </label>

// //         <div className="d-flex align-items-center gap-3">

// //             <img
// //                 src={image}
// //                 alt="User preview"
// //                 className="rounded-circle border"
// //                 style={{
// //                     width: "55px",
// //                     height: "55px",
// //                     objectFit: "cover"
// //                 }}
// //             />

// //             <input
// //                 className="form-control"
// //                 type="file"
// //                 id="image"
// //                 name="image"
// //                 accept="image/*"
// //                 onChange={handleImageChange}
// //             />

// //         </div>

// //     </div>

// //     {/* Register Button */}
// //     <button
// //         type="submit"
// //         className="btn btn-primary w-100 mt-2"
// //     >
// //         Create Account
// //     </button>

// // </form>
// //                 </div>

// //             </div>
            
            
            
// //             </div></>
// //     )
// // }
// // export default Register







// import { useEffect, useState } from "react";
// import Title from "../components/title";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { RegisterUser } from "../reduxslice/userslice";
// import Loader from "../components/Loader";
// import toast from "react-hot-toast";

// function Register() {

//     const dispatch = useDispatch();
//     const navigate = useNavigate()
//     const { success, error, loading } = useSelector((state) => state.user);

//     const [name, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const [image, setImage] = useState(
//         "https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
//     );

//     const [imageFile, setImageFile] = useState(null);


//     const handleImageChange = (e) => {

//         const file = e.target.files[0];

//         if (file) {

//             // For preview
//             setImage(URL.createObjectURL(file));

//             // Actual file for backend
//             setImageFile(file);
//         }
//     };


//     const handleSubmit = (e) => {

//         e.preventDefault();

//         const formData = new FormData();

//         formData.append("name", name);
//         formData.append("email", email);
//         formData.append("password", password);

//         if (imageFile) {
//             formData.append("avatar", imageFile);
//         }

//         dispatch(RegisterUser(formData));
//     };
//         useEffect(() => {
//             if (success) {
//                 navigate("/login")
//                 toast.success()
//                 dispatch(removeSuccess());
//             }
//         }, [success, dispatch, navigate]);
    
//         useEffect(() => {
//             if (error) {
//               dispatch(removeError());
//             }
//         }, [error, dispatch]);


//     return loading ? (
//         <Loader/>
//     ): (
//         <>
//             <Title title="E-commerce | Register" />

//             <div
//                 className="container-fluid min-vh-100 position-relative p-0"
//                 style={{
//                     overflow: "hidden"
//                 }}
//             >

//                 {/* BACKGROUND IMAGE */}

//                 <div
//                     className="position-absolute top-0 start-0 w-100 vh-100"
//                     style={{
//                         zIndex: 1
//                     }}
//                 >

//                     <img
//                         src="https://zdblogs.zohowebstatic.com/sites/academy/files/ecommerce_2.jpg"
//                         alt="E-commerce"
//                         className="w-100 h-100"
//                         style={{
//                             objectFit: "cover"
//                         }}
//                     />

//                 </div>


//                 {/* RIGHT SIDE FORM */}

//                 <div
//                     className="position-absolute top-0 end-0 vh-100 d-flex align-items-center justify-content-center"
//                     style={{
//                         width: "50%",
//                         zIndex: 10,
//                         backgroundColor: "rgba(255, 255, 255, 0.14)",
//                         backdropFilter: "blur(5px)",
//                         WebkitBackdropFilter: "blur(5px)",
//                         overflowY: "auto"
//                     }}
//                 >

//                     <div
//                         className="w-100 px-4 py-5"
//                         style={{
//                             maxWidth: "550px"
//                         }}
//                     >

//                         {/* HEADER */}

//                         <div className="mb-4">

//                             <h2 className="fw-bold mb-2">
//                                 Create an account
//                             </h2>

//                             <p className="text-muted mb-0">
//                                 Join Ramsan and start shopping today.
//                             </p>

//                         </div>


//                         {/* LOGIN LINK */}

//                         <div className="mb-4">

//                             <span className="text-muted">
//                                 Already have an account?
//                             </span>

//                             <Link
//                                 to="/login"
//                                 className="text-decoration-none fw-semibold ms-1"
//                             >
//                                 Sign in
//                             </Link>

//                         </div>


//                         {/* FORM */}

//                         <form
//                             className="text-black"
//                             onSubmit={handleSubmit}
//                         >

//                             {/* USERNAME */}

//                             <div className="mb-3">

//                                 <label
//                                     htmlFor="name"
//                                     className="form-label fw-semibold"
//                                 >
//                                     User Name
//                                 </label>

//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     id="name"
//                                     name="name"
//                                     placeholder="Enter your username"
//                                     value={name}
//                                     onChange={(e) =>
//                                         setUsername(e.target.value)
//                                     }
//                                     required
//                                 />

//                             </div>


//                             {/* EMAIL */}

//                             <div className="mb-3">

//                                 <label
//                                     htmlFor="email"
//                                     className="form-label fw-semibold"
//                                 >
//                                     Email
//                                 </label>

//                                 <input
//                                     type="email"
//                                     className="form-control"
//                                     id="email"
//                                     name="email"
//                                     placeholder="Enter your email"
//                                     value={email}
//                                     onChange={(e) =>
//                                         setEmail(e.target.value)
//                                     }
//                                     required
//                                 />

//                             </div>


//                             {/* PASSWORD */}

//                             <div className="mb-3">

//                                 <label
//                                     htmlFor="password"
//                                     className="form-label fw-semibold"
//                                 >
//                                     Password
//                                 </label>

//                                 <input
//                                     type="password"
//                                     className="form-control"
//                                     id="password"
//                                     name="password"
//                                     placeholder="Enter your password"
//                                     value={password}
//                                     onChange={(e) =>
//                                         setPassword(e.target.value)
//                                     }
//                                     required
//                                 />

//                             </div>


//                             {/* PROFILE IMAGE */}

//                             <div className="mb-4">

//                                 <label
//                                     htmlFor="image"
//                                     className="form-label fw-semibold"
//                                 >
//                                     Profile Image
//                                 </label>

//                                 <div className="d-flex align-items-center gap-3">

//                                     <img
//                                         src={image}
//                                         alt="Profile preview"
//                                         className="rounded-circle border flex-shrink-0"
//                                         style={{
//                                             width: "65px",
//                                             height: "65px",
//                                             objectFit: "cover"
//                                         }}
//                                     />

//                                     <input
//                                         type="file"
//                                         className="form-control"
//                                         id="image"
//                                         name="image"
//                                         accept="image/*"
//                                         onChange={handleImageChange}
//                                     />

//                                 </div>

//                             </div>


//                             {/* BUTTON */}

//                             <button
//                                 type="submit"
//                                 className="btn btn-primary btn-lg w-100"
//                             >
//                                 Create Account
//                             </button>


//                             <p className="text-white text-center small mt-3">
//                                 By creating an account, you agree to our
//                                 terms and conditions.
//                             </p>

//                         </form>

//                     </div>

//                 </div>

//             </div>
//         </>
//     );
// }

// export default Register;

import { useEffect, useState } from "react";
import Title from "../components/title";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser, removeSuccess, removeError } from "../reduxslice/userslice";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import "./Register.css";

function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { success, error, loading } = useSelector(
        (state) => state.user
    );

    const [name, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [image, setImage] = useState(
        "https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
    );

    const [imageFile, setImageFile] = useState(null);


    // =========================
    // IMAGE CHANGE
    // =========================

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (file) {

            // Preview image
            setImage(URL.createObjectURL(file));

            // Actual file for backend
            setImageFile(file);
        }
    };


    // =========================
    // FORM SUBMIT
    // =========================

    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);

        if (imageFile) {
            formData.append("avatar", imageFile);
        }

        dispatch(RegisterUser(formData));
    };


    // =========================
    // SUCCESS
    // =========================

    useEffect(() => {

        if (success) {

            navigate("/login");

            toast.success("Registration successful!");

            dispatch(removeSuccess());
        }

    }, [success, dispatch, navigate]);


    // =========================
    // ERROR
    // =========================

    useEffect(() => {

        if (error) {

            toast.error(error);

            dispatch(removeError());
        }

    }, [error, dispatch]);


    // =========================
    // LOADING
    // =========================

    if (loading) {
        return <Loader />;
    }


    return (
        <>
            <Title title="E-commerce | Register" />

            <div className="register-page">

                {/* =========================
                    BACKGROUND IMAGE
                ========================= */}

                <div className="register-background">

                    <img
                        src="https://zdblogs.zohowebstatic.com/sites/academy/files/ecommerce_2.jpg"
                        alt="E-commerce"
                    />

                </div>


                {/* =========================
                    FORM PANEL
                ========================= */}

                <div className="register-form-panel">

                    <div className="register-form-content">


                        {/* =========================
                            HEADER
                        ========================= */}

                        <div className="mb-4">

                            <h2 className="fw-bold mb-2">
                                Create an account
                            </h2>

                            <p className="text-muted mb-0">
                                Join Ramsan and start shopping today.
                            </p>

                        </div>


                        {/* =========================
                            LOGIN LINK
                        ========================= */}

                        <div className="mb-4">

                            <span className="text-muted">
                                Already have an account?
                            </span>

                            <Link
                                to="/login"
                                className="text-decoration-none fw-semibold ms-1"
                            >
                                Sign in
                            </Link>

                        </div>


                        {/* =========================
                            FORM
                        ========================= */}

                        <form
                            className="text-black"
                            onSubmit={handleSubmit}
                        >


                            {/* =========================
                                USERNAME
                            ========================= */}

                            <div className="mb-3">

                                <label
                                    htmlFor="name"
                                    className="form-label fw-semibold"
                                >
                                    User Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your username"
                                    value={name}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            {/* =========================
                                EMAIL
                            ========================= */}

                            <div className="mb-3">

                                <label
                                    htmlFor="email"
                                    className="form-label fw-semibold"
                                >
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


                            {/* =========================
                                PASSWORD
                            ========================= */}

                            <div className="mb-3">

                                <label
                                    htmlFor="password"
                                    className="form-label fw-semibold"
                                >
                                    Password
                                </label>

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


                            {/* =========================
                                PROFILE IMAGE
                            ========================= */}

                            <div className="mb-4">

                                <label
                                    htmlFor="image"
                                    className="form-label fw-semibold"
                                >
                                    Profile Image
                                </label>

                                <div className="profile-upload">

                                    <img
                                        src={image}
                                        alt="Profile preview"
                                    />

                                    <input
                                        type="file"
                                        className="form-control"
                                        id="image"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />

                                </div>

                            </div>


                            {/* =========================
                                REGISTER BUTTON
                            ========================= */}

                            <button
                                type="submit"
                                className="btn btn-primary btn-lg w-100"
                            >
                                Create Account
                            </button>


                            {/* =========================
                                TERMS
                            ========================= */}

                            <p className="text-muted text-center small mt-3 mb-0">
                                By creating an account, you agree to our
                                terms and conditions.
                            </p>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Register;