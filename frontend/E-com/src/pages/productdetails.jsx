// import { useDispatch, useSelector } from "react-redux"
// import Nav from "../components/nav"
// import Title from "../components/title"
// import { useParams } from "react-router-dom"
// import { useEffect, useState } from "react"
// import { GetSingleProduct } from "../reduxslice/productSlicer"
// import { Minus, Plus, ShoppingCart, Star, Strikethrough } from "lucide-react"

// function ProductDetails (){

//     const {id} = useParams()
//     const dispatch = useDispatch()
//     const {product,error,success}= useSelector((state)=>state.product);
//     const stock = product.stock
//     const [ value,setValue] = useState(1)
//      const [ratings, setRatings] = useState({});
//         const [hoverRating, setHoverRating] = useState({});
    
//         // Function to set rating
//         const handleRating = (productId, star) => {
//         setRatings((prev) => ({
//             ...prev,
//             [productId]: star
//         }));
//     };

//     const incorder =()=>{
     
//          setValue(prev => prev + 1);

//     }

//       const decorder =()=>{
     
//          setValue(prev => Math.max(1, prev - 1));
//     }
    
//     const handleMouseEnter = (productId, star) => {
//         setHoverRating((prev) => ({
//             ...prev,
//             [productId]: star
//         }));
//     };
    
//     const handleMouseLeave = (productId) => {
//         setHoverRating((prev) => ({
//             ...prev,
//             [productId]: 0
//         }));
//     };

//     useEffect(()=>{
//         dispatch(GetSingleProduct(id))
//     },[dispatch])

//     return (<>
//     <Title title="E-commerce | Product Details" />
//     <Nav/>
//     <div className="container">

//         <div className="row">

//             <div className="col-12 col-md-6 ">

//                 <img src={product.image?.[0].url} alt="" className="img-fluid" />

//             </div>
//             <div className="col-12 col-md-6">
//                 <h5>{product.name}</h5>
//                 <div className="d-flex gap-2"><h5>₹{product.discountPrice}</h5> <del>₹{product.price}</del></div>
//                 <p>{product.description}</p>
//                 <p>{stock}</p> { stock > 1 ? <p>Available</p> : <p>Un-Available</p>}
//                 <div>
//                     <div>
                        
//                          <button onClick={decorder}><Minus /></button>
//                         <span>{value}</span>
//                         <button onClick={incorder}><Plus /></button>
                       
//                     </div>
//                     <div>
//                         <button><ShoppingCart/>Add to Cart</button>
//                     </div>
//                 </div>

//                 <div>
//                     <h6>Share your Reviews</h6>
//                     <div className="d-flex align-items-center">

//                 {/* Stars */}
//                 <div
//                         className="rating-stars"
//                         onMouseLeave={() => handleMouseLeave(product._id)}
//                     >
//                         {[1, 2, 3, 4, 5].map((star) => {

//                             const currentRating =
//                                 hoverRating[product._id] || ratings[product._id] || 0;

//                             return (
//                                 <Star
//                                     key={star}
//                                     size={20}
//                                     className={
//                                         star <= currentRating
//                                             ? "rating-star active"
//                                             : "rating-star"
//                                     }
//                                     onMouseEnter={() =>
//                                         handleMouseEnter(product._id, star)
//                                     }
//                                     onClick={() =>
//                                         handleRating(product._id, star)
//                                     }
//                                 />
//                             );
//                         })}
//                     </div>


//                     {/* Rating and Reviews */}
//                     <div className="d-flex gap-3">

//                         <span className="ms-2">
//                             {ratings[product._id] || 0}/5
//                         </span>

//                         <span>
//                             {product.numOfReviews} reviews
//                         </span>

//                     </div>

//                 </div>
//                     <textarea placeholder="How was the product quality">

//                     </textarea>
//                     <button>
//                         Post Review
//                     </button>
//                 </div>
                

//             </div>

//         </div>

//     </div>
//     </>)

// }
// export default ProductDetails





import { useDispatch, useSelector } from "react-redux";
import Nav from "../components/nav";
import Title from "../components/title";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetSingleProduct, removeError, removeSuccess } from "../reduxslice/productSlicer";
import {
    Minus,
    Plus,
    ShoppingCart,
    Star,
    MessageSquare,
} from "lucide-react";
import toast from "react-hot-toast";
import Review from "../components/review";
import { Postreview } from "../reduxslice/ReviewSlice";
import RelatedProduct from "../components/relatedproduct";
import { CreateCart, removeCartSuccess } from "../reduxslice/cartSlice";

function ProductDetails() {

    const { id } = useParams();
    const dispatch = useDispatch();

    const { product, success, error, loading } = useSelector((state) => state.product);
    const {cart, success: cartSuccess} = useSelector((state) => state.cart)   
    const {isAuthenticated} = useSelector((state) => state.user)
    const stock = product?.stock || 0;
    const navigate = useNavigate()

    const [value, setValue] = useState(1);
    const [ratings, setRatings] = useState({});
    const [hoverRating, setHoverRating] = useState({});

    const [comment,setComment] = useState("");
    const rating= ratings[product._id];

    // Quantity
    const incorder = () => {
        setValue((prev) => Math.min(stock, prev + 1));
    };

    const decorder = () => {
        setValue((prev) => Math.max(1, prev - 1));
    };


    // Rating
    const handleRating = (productId, star) => {
        setRatings((prev) => ({
            ...prev,
            [productId]: star
        }));
    };


    const handleMouseEnter = (productId, star) => {
        setHoverRating((prev) => ({
            ...prev,
            [productId]: star
        }));
    };


    const handleMouseLeave = (productId) => {
        setHoverRating((prev) => ({
            ...prev,
            [productId]: 0
        }));
    };

    const handleSubmit =(e)=>{

        e.preventDefault()

        dispatch(Postreview({
            id,
            comment,
            rating
        }))
        toast.success("Review posted")
    }

  
    
    const createCart = (product) => {
        const cartValue = {
            product: product._id,
            quantity: value
        };
        dispatch(CreateCart(cartValue));
    }

        useEffect(() => {
            if (cartSuccess) {
                toast.success("Product added to cart")
                dispatch(removeCartSuccess());
            }
    }, [cartSuccess, dispatch, navigate]);
    


    // Get Product
    useEffect(() => {
        dispatch(GetSingleProduct(id));
    }, [dispatch, id]);


    useEffect(() => {
        if (success) {
          dispatch(removeSuccess());
        }
    }, [success, dispatch]);


    useEffect(() => {
        if (error) {
          dispatch(removeError());
        }
    }, [error, dispatch]);



  


    const selectedRating =
        ratings[product._id] || 0;

    const currentRating =
        hoverRating[product._id] ||
        selectedRating;

    
    return loading ? (
        <Loader/>
    ): (
        <>
            <Title title="E-commerce | Product Details" />

            <Nav />
            
            {/* Page Background */}
            <div className=" min-vh-100 py-4 py-md-5">

                <div className="container">

                    {/* Main Card */}
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden mx-5">

                        <div className="row g-0">


                            {/* =========================
                                PRODUCT IMAGE
                            ========================= */}

                            <div className="col-12 col-lg-6">

                                <div className="p-3 p-md-4 h-100 d-flex align-items-center justify-content-center">

                                    <img
                                        src={product.image?.[0]?.url}
                                        alt={product.name}
                                        className="img-fluid rounded-3 w-100"
                                        style={{
                                            height: "420px",
                                            objectFit: "cover"
                                        }}
                                    />

                                </div>

                            </div>


                            {/* =========================
                                PRODUCT DETAILS
                            ========================= */}

                            <div className="col-12 col-lg-6">

                                <div className="p-3 p-md-4 h-100">


                                    {/* Product Name */}

                                    <h4 className="fw-semibold mb-2">
                                        {product.name}
                                    </h4>


                                    {/* Product Rating */}

                                    <div className="d-flex align-items-center gap-2 mb-2">

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

                                        <small className="text-muted">
                                            {product.rating}/5
                                        </small>

                                        <small className="text-muted">
                                            ✓ Verified Reviews
                                        </small>

                                    </div>


                                    {/* Price */}

                                    <div className="d-flex align-items-center gap-2 mb-3">

                                        <span className="fs-3 fw-bold text-primary">
                                            ₹{product.discountPrice}
                                        </span>

                                        <del className="text-muted small">
                                            ₹{product.price}
                                        </del>

                                        {product.offer && (

                                            <span className="badge bg-success-subtle text-success">
                                                {product.offer} OFF
                                            </span>

                                        )}

                                    </div>


                                    {/* Description */}

                                    <p className="text-secondary small mb-4">
                                        {product.description}
                                    </p>


                                    {/* Stock */}

                                    <div className="d-flex align-items-center gap-2 mb-3">

                                        <span className="text-success">
                                            ●
                                        </span>

                                        <small className="text-success fw-semibold">
                                            IN STOCK ({stock} Available)
                                        </small>

                                    </div>


                                    {/* Quantity + Cart */}

                                    <div className="d-flex gap-2 mb-4">


                                        {/* Quantity */}

                                        <div
                                            className="input-group border rounded"
                                            style={{
                                                width: "105px"
                                            }}
                                        >

                                            <button
                                                className="btn btn-sm border-0"
                                                onClick={decorder}
                                                disabled={value <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>

                                            <span className="form-control form-control-sm border-0 text-center fw-semibold d-flex align-items-center justify-content-center">
                                                {value}
                                            </span>

                                            <button
                                                className="btn btn-sm border-0"
                                                onClick={incorder}
                                                disabled={value >= stock}
                                            >
                                                <Plus size={14} />
                                            </button>

                                        </div>


                                        {/* Add Cart */}

                                        <button
                                            className="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                                            disabled={stock === 0}  onClick={(e) => {e.stopPropagation(); createCart(product)}}
                                        >

                                            <ShoppingCart size={17} />

                                            {stock > 0
                                                ? "Add to Cart"
                                                : "Out of Stock"
                                            }

                                        </button>

                                    </div>


                                    {/* =========================
                                        REVIEW SECTION
                                    ========================= */}

                                    <div className="card border-0 bg-light rounded-3">

                                        <div className="card-body p-3">


                                            {/* Review Heading */}

                                            <div className="d-flex align-items-center gap-2 mb-2">

                                                <MessageSquare
                                                    size={15}
                                                    className="text-warning"
                                                />

                                                <small className="fw-bold text-secondary">
                                                    SHARE YOUR FEEDBACK
                                                </small>

                                            </div>


                                            {/* Rating */}

                                            <div
                                                className="d-flex align-items-center gap-1 mb-3"
                                                onMouseLeave={() =>
                                                    handleMouseLeave(product._id)
                                                }
                                            >

                                                {[1, 2, 3, 4, 5].map((star) => (

                                                    <Star
                                                        key={star}
                                                        size={17}
                                                        fill={
                                                            star <= currentRating
                                                                ? "currentColor"
                                                                : "none"
                                                        }
                                                        className={
                                                            star <= currentRating
                                                                ? "text-warning"
                                                                : "text-secondary"
                                                        }
                                                        style={{
                                                            cursor: "pointer"
                                                        }}
                                                        onMouseEnter={() =>
                                                            handleMouseEnter(
                                                                product._id,
                                                                star
                                                            )
                                                        }
                                                        onClick={() =>
                                                            handleRating(
                                                                product._id,
                                                                star
                                                            )
                                                        }
                                                    />

                                                ))}

                                                <small className="text-muted ms-1">
                                                    {selectedRating}/5
                                                </small>

                                            </div>


                                            {/* Review Textarea */}

                                            <textarea
                                                className="form-control form-control-sm border-0 shadow-sm mb-3"
                                                rows="3"
                                                placeholder="How was the product quality and delivery?"
                                                value={comment}
                                                onChange={(e)=> {
                                                    setComment(e.target.value)
                                                }}
                                            />


                                            {/* Post Review */}

                                            <button className="btn btn-dark btn-sm w-100" onClick={handleSubmit}>
                                                Post Review
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div>
                <h4 className="container fw-bold ">You might also like these . .</h4>
                <RelatedProduct keyword={product.brand} />
            </div>
            <Review id={id}/>
        </>
    );
}

export default ProductDetails;