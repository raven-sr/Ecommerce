// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Search,
//   ShoppingBag,
//   ShoppingCart,
//   User,
//   Menu,
//   X,
//   LogOutIcon,
//   LogOut
// } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { Logout, removeError, removeSuccess } from "../reduxslice/userslice";
// import toast from "react-hot-toast";
// import RamsanLogo from "../assets/RamsanLogo.jpeg"


// function Nav({search, setSearch}) {

//   const [open, setOpen] = useState(false);
//   const [popup, setPopup] = useState(false);
//   const { isAuthenticated, success, error,user} = useSelector((state) => state.user);
//   const {cart} = useSelector((state)=>state.cart)


//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const handel = ()=>{
//     dispatch(Logout());
//     navigate("/")
//   }

 

//   useEffect(() => {
//     if(success){
//       toast.success("User logged out successfully")
//       dispatch(removeSuccess())
//     }
//   }, [success, dispatch])

//    useEffect(() => {
//     if(error){
//       toast.error(error)
//       dispatch(removeError())
//     }
//   }, [error, dispatch])


//   return (
//     <nav
//       className="sticky-top shadow-sm"
//       style={{
//         backgroundColor: "#F8F9FA",padding:"5px"
//       }}
//     >

//       <div className="container-fluid">

//         <div className="row align-items-center">

//           {/* ================= LOGO ================= */}

//           <div className="col-6 col-lg-4 d-flex align-items-center gap-4">

//             <Link to="/"
//               className="d-flex align-items-center text-decoration-none fw-bold fs-4"
//               onClick={() => setOpen(false)}
//             >
//               <div className="d-flex align-items-center">
             
//                 <img src={RamsanLogo} className="" style={{height:"50px", width:"100px", objectFit:"contain"}}/>
//               </div>

//             </Link>


//             <div
//               className="col-lg-6 d-flex align-items-center position-relative "
//               onClick={() => setPopup(!popup)}
//               style={{ cursor: "pointer" }}
//             >
//               <img
//                 src={user.avatar.url}
//                 className="rounded-circle"
//                 style={{
//                   height: "50px",
//                   width: "50px",
//                   objectFit: "cover"
//                 }}
//               />

//               <div className="ms-2">
//                 <span className="fw-semibold text-muted">Hello</span>
//                 <h6 className="mb-0">{user?.name}</h6>
//               </div>

//               {/* DROPDOWN */}
//               {popup && (
//                 <div
//                   className="position-absolute bg-white shadow rounded"
//                   style={{
//                     top: "60px",
//                     left: "0",
//                     width: "180px",
//                     zIndex: 1000
//                   }}
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   <Link
//                     to="/myorder"
//                     className="d-block text-decoration-none text-dark px-3 py-2"
//                     onClick={() => setPopup(false)}
//                   >
//                     My Orders
//                   </Link>
//                 </div>
//               )}
//             </div>

//           </div>
          


//           {/* ================= DESKTOP LINKS ================= */}

//           <div className="col-lg-2 d-none d-lg-flex justify-content-center">

//             <div className="d-flex gap-4">

//               <Link
//                 to="/"
//                 className="text-decoration-none fw-medium"
//                 style={{ color: "#2C3E50" }}
//               >
//                 Home
//               </Link>

//               <Link
//                 to="/about"
//                 className="text-decoration-none fw-medium"
//                 style={{ color: "#2C3E50" }}
//               >
//                 About
//               </Link>

//               <Link
//                 to="/contact"
//                 className="text-decoration-none fw-medium"
//                 style={{ color: "#2C3E50" }}
//               >
//                 Contact
//               </Link>
//               {user.role === "admin" && (
//                 <Link
//                 to="/admin"
//                 className="text-decoration-none fw-medium"
//                 style={{ color: "#2C3E50" }}
//               >
//                 Admin
//               </Link>)}

//             </div>

//           </div>


//           {/* ================= SEARCH ================= */}

//           <div className="col-lg-3 d-none d-lg-block ms-4">

//             <form className="d-flex">

//               <input
//                 type="search"
//                 placeholder="Search..."
//                 className="form-control border-0 shadow-sm"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 style={{
//                   backgroundColor: "#F3F4F6"
//                 }}
//               />

//               <button
//                 type="submit"
//                 className="btn ms-1"
//                 style={{
//                   backgroundColor: "#5C8374",
//                   color: "white"
//                 }}
//               >
//                 <Search size={18} />
//               </button>

//             </form>

//           </div>


//           {/* ================= DESKTOP CART + USER ================= */}

//           <div className="col-lg-2 d-none d-lg-flex justify-content-end">

//             <div className="d-flex align-items-center gap-4">

//               {/* CART */}

//               <Link
//                 to="/cart"
//                 className="position-relative text-dark"
//               >

//                 <ShoppingCart size={24} />

//                 <span
//                   className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
//                   style={{
//                     backgroundColor: "#5C8374",
//                     fontSize: "10px"
//                   }}
//                 >
//                   {cart.totalProducts}
//                 </span>

//               </Link>

//               {isAuthenticated && <div onClick={handel}>
//                 <LogOutIcon className="text-dark"/>
//               </div>}
              
                  
              


//               {/* USER */}

//               {!isAuthenticated && 
//               <div className="d-flex gap-2">
//                 <Link to="/register" className="text-dark btn btn-success btn-sm text-white d-flex align-items-center gap-1">
//                   <User size={18}/> <span style={{textDecoration: "none"}}> Register</span>
//                 </Link>

//                 <Link to="/login" className="text-dark btn btn-success btn-sm text-white d-flex align-items-center gap-1">
//                   <User size={18}/> <span style={{textDecoration: "none"}}> Login</span>
//                 </Link>
//               </div>
//               }

//             </div>

//           </div>


//           {/* ================= MOBILE CART + USER + MENU ================= */}

//           <div className="col-6 d-flex d-lg-none justify-content-end">

//             <div className="d-flex align-items-center gap-3">

//               {/* CART */}

//               <Link
//                 to="/cart"
//                 className="position-relative text-dark"
//               >

//                 <ShoppingCart size={23} />

//                 <span
//                   className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
//                   style={{
//                     backgroundColor: "#5C8374",
//                     fontSize: "9px"
//                   }}
//                 >
//                   {cart.totalProducts}
//                 </span>

//               </Link>

//                {isAuthenticated && <div onClick={handel}>
//                 <LogOutIcon className="text-dark"/>
//               </div>}

              


//               {/* USER */}

//               {!isAuthenticated && 
//               <div className="d-flex gap-2">
//                 <Link to="/register" className="text-dark btn btn-success btn-sm text-white d-flex align-items-center gap-1">
//                   <User size={18}/> <span style={{textDecoration: "none"}}> Register</span>
//                 </Link>
//                 <Link to="/login" className="text-dark btn btn-success btn-sm text-white d-flex align-items-center gap-1">
//                   <User size={18}/> <span style={{textDecoration: "none"}}> Login</span>
//                 </Link>
//               </div>
//               }


//               {/* MENU BUTTON */}

//               <button
//                 onClick={() => setOpen(!open)}
//                 className="btn border-0 p-1"
//                 style={{
//                   color: "#2C3E50"
//                 }}
//               >

//                 {open ? (
//                   <X size={27} />
//                 ) : (
//                   <Menu size={27} />
//                 )}

//               </button>

//             </div>

//           </div>


//           {/* ================= MOBILE MENU ================= */}

//           {open && (

//             <div className="col-12 d-lg-none mt-3">

//               <div className="d-flex flex-column gap-2 border-top pt-3">

//                 <Link
//                   to="/"
//                   className="text-decoration-none fw-medium text-dark py-2"
//                   onClick={() => setOpen(false)}
//                 >
//                   Home
//                 </Link>

//                 <Link
//                   to="/about"
//                   className="text-decoration-none fw-medium text-dark py-2"
//                   onClick={() => setOpen(false)}
//                 >
//                   About
//                 </Link>

//                 <Link
//                   to="/contact"
//                   className="text-decoration-none fw-medium text-dark py-2"
//                   onClick={() => setOpen(false)}
//                 >
//                   Contact
//                 </Link>

//                  {user.role === "admin" && (
//                 <Link
//                 to="/admin"
//                 className="text-decoration-none fw-medium"
//                 style={{ color: "#2C3E50" }}
//               >
//                 Admin
//               </Link>)}


//               </div>

//             </div>

//           )}

//         </div>

//       </div>

//     </nav>
//   );
// }

// export default Nav;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  LogOutIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  Logout,
  removeError,
  removeSuccess,
} from "../reduxslice/userslice";
import toast from "react-hot-toast";
import RamsanLogo from "../assets/RamsanLogo.jpeg";

function Nav({ search, setSearch }) {
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState(false);

  const { isAuthenticated, success, error, user } = useSelector(
    (state) => state.user
  );

  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =========================
  // LOGOUT
  // =========================
  const handel = () => {
    dispatch(Logout());
    navigate("/");
    setOpen(false);
  };

  // =========================
  // LOGOUT SUCCESS
  // =========================
  useEffect(() => {
    if (success) {
      toast.success("User logged out successfully");
      dispatch(removeSuccess());
    }
  }, [success, dispatch]);

  // =========================
  // ERROR
  // =========================
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeError());
    }
  }, [error, dispatch]);

  return (
    <nav
      className="sticky-top shadow-sm"
      style={{
        backgroundColor: "#F8F9FA",
        padding: "6px 0",
        zIndex: 1050,
      }}
    >
      <div className="container-fluid px-3 px-lg-4">

        {/* =================================================
            MAIN NAVIGATION ROW
        ================================================= */}

        <div className="row align-items-center">

          {/* =================================================
              LOGO + DESKTOP USER
          ================================================= */}

          <div className="col-6 col-lg-4">
            <div className="d-flex align-items-center">

              {/* LOGO */}
              <Link
                to="/"
                className="d-flex align-items-center text-decoration-none"
                onClick={() => setOpen(false)}
              >
                <img
                  src={RamsanLogo}
                  alt="Ramsan"
                  style={{
                    height: "48px",
                    width: "100px",
                    objectFit: "contain",
                  }}
                />
              </Link>

              {/* =================================================
                  DESKTOP USER
              ================================================= */}

              {isAuthenticated && user && (
                <div
                  className="d-none d-lg-flex align-items-center position-relative ms-3"
                  onClick={() => setPopup(!popup)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={user?.avatar?.url}
                    alt={user?.name || "User"}
                    className="rounded-circle"
                    style={{
                      height: "45px",
                      width: "45px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="ms-2">
                    <span className="fw-semibold text-muted small">
                      Hello
                    </span>

                    <h6 className="mb-0">
                      {user?.name}
                    </h6>
                  </div>

                  {/* =================================================
                      DESKTOP USER DROPDOWN
                  ================================================= */}

                  {popup && (
                    <div
                      className="position-absolute bg-white shadow rounded"
                      style={{
                        top: "55px",
                        left: "0",
                        width: "180px",
                        zIndex: 2000,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link
                        to="/myorder"
                        className="d-block text-decoration-none text-dark px-3 py-2"
                        onClick={() => setPopup(false)}
                      >
                        My Orders
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* =================================================
              DESKTOP LINKS
          ================================================= */}

          <div className="col-lg-2 d-none d-lg-flex justify-content-center">
            <div className="d-flex gap-4">

              <Link
                to="/"
                className="text-decoration-none fw-medium"
                style={{ color: "#2C3E50" }}
              >
                Home
              </Link>

              <Link
                to="/about"
                className="text-decoration-none fw-medium"
                style={{ color: "#2C3E50" }}
              >
                About
              </Link>

              <Link
                to="/contact"
                className="text-decoration-none fw-medium"
                style={{ color: "#2C3E50" }}
              >
                Contact
              </Link>

              {/* ADMIN */}
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-decoration-none fw-medium"
                  style={{ color: "#2C3E50" }}
                >
                  Admin
                </Link>
              )}

            </div>
          </div>

          {/* =================================================
              DESKTOP SEARCH
          ================================================= */}

          <div className="col-lg-3 d-none d-lg-block">
            <form className="d-flex">

              <input
                type="search"
                placeholder="Search products..."
                className="form-control border-0 shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  backgroundColor: "#F3F4F6",
                  height: "40px",
                }}
              />

              <button
                type="submit"
                className="btn ms-1"
                style={{
                  backgroundColor: "#5C8374",
                  color: "white",
                  height: "40px",
                }}
              >
                <Search size={18} />
              </button>

            </form>
          </div>

          {/* =================================================
              DESKTOP CART + LOGOUT + LOGIN
          ================================================= */}

          <div className="col-lg-3 d-none d-lg-flex justify-content-end">
            <div className="d-flex align-items-center gap-4">

              {/* CART */}
              <Link
                to="/cart"
                className="position-relative text-dark"
              >
                <ShoppingCart size={24} />

                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{
                    backgroundColor: "#5C8374",
                    fontSize: "10px",
                  }}
                >
                  {cart?.totalProducts || 0}
                </span>
              </Link>

              {/* LOGOUT */}
              {isAuthenticated && (
                <button
                  onClick={handel}
                  className="btn p-0 border-0"
                  style={{ background: "none" }}
                >
                  <LogOutIcon
                    className="text-dark"
                    size={22}
                  />
                </button>
              )}

              {/* LOGIN / REGISTER */}
              {!isAuthenticated && (
                <div className="d-flex gap-2">

                  <Link
                    to="/register"
                    className="btn btn-success btn-sm text-white d-flex align-items-center gap-1"
                  >
                    <User size={18} />
                    Register
                  </Link>

                  <Link
                    to="/login"
                    className="btn btn-success btn-sm text-white d-flex align-items-center gap-1"
                  >
                    <User size={18} />
                    Login
                  </Link>

                </div>
              )}

            </div>
          </div>

          {/* =================================================
              MOBILE CART + LOGIN + MENU
          ================================================= */}

          <div className="col-6 d-flex d-lg-none justify-content-end">
            <div className="d-flex align-items-center gap-3">

              {/* CART */}
              <Link
                to="/cart"
                className="position-relative text-dark"
              >
                <ShoppingCart size={23} />

                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{
                    backgroundColor: "#5C8374",
                    fontSize: "8px",
                    minWidth: "16px",
                    height: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cart?.totalProducts || 0}
                </span>
              </Link>

              {/* =================================================
                  MOBILE LOGOUT
              ================================================= */}

              {isAuthenticated && (
                <button
                  onClick={handel}
                  className="btn p-0 border-0"
                  style={{ background: "none" }}
                >
                  <LogOutIcon
                    className="text-dark"
                    size={21}
                  />
                </button>
              )}

              {/* =================================================
                  MOBILE LOGIN
              ================================================= */}

              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="text-dark d-flex align-items-center"
                >
                  <User size={23} />
                </Link>
              )}

              {/* =================================================
                  MOBILE MENU BUTTON
              ================================================= */}

              <button
                onClick={() => setOpen(!open)}
                className="btn border-0 p-0"
                style={{
                  color: "#2C3E50",
                }}
              >
                {open ? (
                  <X size={27} />
                ) : (
                  <Menu size={27} />
                )}
              </button>

            </div>
          </div>

          {/* =================================================
              MOBILE SEARCH BAR
          ================================================= */}

          <div className="col-12 d-lg-none mt-2">

            <form className="d-flex">

              <div className="position-relative flex-grow-1">

                <Search
                  size={18}
                  className="position-absolute"
                  style={{
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#777",
                  }}
                />

                <input
                  type="search"
                  placeholder="Search products..."
                  className="form-control border-0 shadow-sm ps-5"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    backgroundColor: "#F3F4F6",
                    height: "42px",
                    borderRadius: "8px",
                  }}
                />

              </div>

              <button
                type="submit"
                className="btn ms-2 d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "#5C8374",
                  color: "white",
                  width: "45px",
                  height: "42px",
                  borderRadius: "8px",
                }}
              >
                <Search size={18} />
              </button>

            </form>

          </div>

          {/* =================================================
              MOBILE MENU
          ================================================= */}

          {open && (
            <div className="col-12 d-lg-none">

              <div className="border-top mt-3 pt-3">

                {/* =================================================
                    USER PROFILE
                ================================================= */}

                {isAuthenticated && user && (
                  <div
                    className="d-flex align-items-center mb-3 pb-3 border-bottom"
                    style={{
                      cursor: "pointer",
                    }}
                  >

                    {/* USER IMAGE */}
                    <img
                      src={user?.avatar?.url}
                      alt={user?.name || "User"}
                      className="rounded-circle"
                      style={{
                        width: "52px",
                        height: "52px",
                        objectFit: "cover",
                        border: "2px solid #5C8374",
                      }}
                    />

                    {/* USER NAME */}
                    <div className="ms-3">

                      <small
                        className="text-muted d-block"
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        Hello,
                      </small>

                      <h6
                        className="mb-0 fw-semibold"
                        style={{
                          color: "#2C3E50",
                        }}
                      >
                        {user?.name}
                      </h6>

                    </div>

                  </div>
                )}

                {/* =================================================
                    MY ORDERS
                ================================================= */}

                {isAuthenticated && user && (
                  <Link
                    to="/myorder"
                    className="d-block text-decoration-none fw-medium text-dark py-2"
                    onClick={() => setOpen(false)}
                  >
                    My Orders
                  </Link>
                )}

                {/* =================================================
                    HOME
                ================================================= */}

                <Link
                  to="/"
                  className="d-block text-decoration-none fw-medium text-dark py-2"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>

                {/* =================================================
                    ABOUT
                ================================================= */}

                <Link
                  to="/about"
                  className="d-block text-decoration-none fw-medium text-dark py-2"
                  onClick={() => setOpen(false)}
                >
                  About
                </Link>

                {/* =================================================
                    CONTACT
                ================================================= */}

                <Link
                  to="/contact"
                  className="d-block text-decoration-none fw-medium text-dark py-2"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>

                {/* =================================================
                    ADMIN
                ================================================= */}

                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="d-block text-decoration-none fw-medium text-dark py-2"
                    onClick={() => setOpen(false)}
                  >
                    Admin
                  </Link>
                )}

                {/* =================================================
                    REGISTER
                ================================================= */}

                {!isAuthenticated && (
                  <Link
                    to="/register"
                    className="d-block text-decoration-none fw-medium text-dark py-2"
                    onClick={() => setOpen(false)}
                  >
                    Register
                  </Link>
                )}

              </div>

            </div>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Nav;