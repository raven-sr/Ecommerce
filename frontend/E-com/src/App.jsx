import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/home"
import About from "./pages/about"
import Contact from "./pages/contact"
import Cart from "./pages/cart"
import Register from "./pages/register"
import { Toaster } from "react-hot-toast"
import ProductDetails from "./pages/productdetails"
import Login from "./pages/login"
import ForgotPass from "./pages/forgotpass"
import ResetPass from "./pages/resetpass"
import { useEffect, useState } from "react"
import Ramsan from "./assets/Ramsan.jpeg"
import Order from "./pages/order"
import MyOrder from "./pages/myorders"
import SingleOrder from "./pages/singleOrder"
import Admin from "./pages/admin"
import ManageProducts from "./pages/AdminProducts"
import ManageUsers from "./pages/ManageUsers"

function App() {

  const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (showLoader) {
        return (
            <div className="vh-100 d-flex align-items-center justify-content-center">
                <img
                    src={Ramsan}
                    alt="Loading..."
                    style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "contain"
                    }}
                />
            </div>
        );
    }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/productdetails/:id" element={<ProductDetails/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgotpass" element={<ForgotPass/>}/>
        <Route path="/resetpass/:token" element={<ResetPass/>}/>
        <Route path="/order" element={<Order/>} />
        <Route path="/myorder" element={<MyOrder/>} />   
        <Route path="/singleorder/:id" element={<SingleOrder/>}/>  
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/admin/products" element={<ManageProducts/>}/>
        <Route path="/admin/users" element={<ManageUsers/>}/>
      </Routes>
      <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000
                }}
            />
    </BrowserRouter>
  )
}

export default App
