import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { GetProduct, page, removeError, removeSuccess } from "../reduxslice/productSlicer";
import toast from "react-hot-toast";
import Title from "../components/title";
import { CreateCart, removeCartSuccess } from "../reduxslice/cartSlice";
import Pagination from "../components/Pagination";


function Home() {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [load, setLoading] = useState(false)
    const {products, productCount, totalPages, error, success, loading} = useSelector((state) => state.product)
    const {isAuthenticated} = useSelector((state)=> state.user)
    const [search, setSearch] = useState("")
    // Store rating separately for each product
    const {cart, success: cartSuccess, error: cartError} = useSelector((state) => state.cart)       
    const [currentPage, setCurrentPage] = useState(1);

    const createCart = (product) => {
        const cartValue = {
            product: product._id,
            quantity: 1
        };
        dispatch(CreateCart(cartValue));
    }
  

    useEffect(() => {
        if (cartSuccess) {
            dispatch(removeCartSuccess());
        }
    }, [cartSuccess, dispatch, navigate]);
    
   
    useEffect(() => {
      dispatch(GetProduct())
    }, [dispatch])

    useEffect(() => {
        if (success) {
          dispatch(removeSuccess());
        }
    }, [success, dispatch]);

    useEffect(() => {
        if (error) {
          toast.error("Something Gone wrong")
          dispatch(removeError());
        }
    }, [error, dispatch]);

   

    useEffect(() => {
        dispatch(page(currentPage));
    }, [dispatch, currentPage]);

    
    return (
        <>
         <Title title="E-commerce | Home" />
        <Nav search={search} setSearch={setSearch}/>
         <ImageSlider/>
            <div>

                {/* Heading */}
                <h3 className="text-center text-primary mt-5">
                    Latest Collections
                </h3>

                {/* Products */}
                <div className="container">
                    <div className="row ">

                        {products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())).map((product) => (
                            <div
                                className="col-12 col-sm-6 col-md-4 col-lg-3 my-5"
                                key={product._id} onClick={() => {
                                                                if (isAuthenticated) {
                                                                    navigate(`/productdetails/${product._id}`);
                                                                } else {
                                                                    toast.error("You need to login first");
                                                                }
                                                            }} 
                            >

                                {/* Product Image */}
                                <img
                                    src={product.image?.[0]?.url}
                                    alt={product.name}
                                    className="w-100"
                                    style={{
                                        height: "200px",
                                        objectFit: "cover"
                                    }}
                                />


                                {/* Product Name */}
                                <h5>
                                    {product?.name}
                                </h5>


                                {/* Product Description */}
                                <p className="text-truncate text-muted">
                                    {product?.description}
                                </p>


                                

                                <div className="d-flex gap-1">

                                            {[1, 2, 3, 4, 5].map((star) => (

                                                <Star
                                                    key={star}
                                                    size={15}
                                                    fill={
                                                        star <= product.rating
                                                            ? "currentColor"
                                                            : "none"
                                                    }
                                                    className={
                                                        star <= product.rating
                                                            ? "text-warning"
                                                            : "text-secondary"
                                                    }
                                                />

                                            ))}

                                        </div>


                                {/* Price + Add Cart */}
                                <div className="d-flex justify-content-between align-items-center">

                                    <div className="d-flex gap-2 align-items-center">
                                        <span className="fs-5 fw-bold text-primary">
                                            ₹{product.discountPrice}
                                        </span>

                                        <del className="text-muted small">
                                            ₹{product.price}
                                        </del>
                                    </div>

                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            createCart(product)
                                        }}
                                    >
                                        Add to Cart
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

            <Pagination currentPage = {currentPage} totalPages={totalPages} onPageChange = {setCurrentPage}/>

            {/* Footer */}
            <Footer />

        </>
    );
}

export default Home;