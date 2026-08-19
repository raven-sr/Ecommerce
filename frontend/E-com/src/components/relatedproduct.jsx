import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { GetProduct, relatedProduct, removeError, removeSuccess } from "../reduxslice/productSlicer";
import { removeCartSuccess, removeCartError } from "../reduxslice/cartSlice";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import { CreateCart } from "../reduxslice/cartSlice";

function RelatedProduct ({keyword}){

    const {products,error,success} = useSelector((state)=> state.product);
    const {cart, success: cartSuccess, error: cartError} = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate()        

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

    useEffect(()=>{
        if (keyword) {
            dispatch(relatedProduct(keyword));
        } else {
        dispatch(GetProduct());
    }
    },[dispatch, keyword])

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

    return(<>
    
      <div className="container">
                    <div className="row ">

                        {products.map((product) => (

                            <div
                                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5 mt-3"
                                key={product._id} onClick={() => { navigate(`/productdetails/${product._id}`)}} 
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
    
    </>)
}

export default RelatedProduct