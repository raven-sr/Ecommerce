import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetReview } from "../reduxslice/ReviewSlice"
import { Star } from "lucide-react"

function Review ({id}){

   

    const {reviews, success, error} = useSelector((state) => state.review)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetReview(id))
    }, [dispatch, id])

  


    return (<>
    
    <section className="review-section py-5">

    <div className="container">

        {/* Section Heading */}
        <div className="text-center mb-5">
            <h2 className="review-title">Customer Reviews</h2>
            <p className="review-subtitle">
                See what our customers are saying about our products
            </p>
        </div>


        <div className="row g-4">
            {reviews.map((review) => (
            
            <div className="col-md-6 col-lg-4  shadow rounded pt-3" key={review._id}>
                
                <div className="review-card">

                    <div className="d-flex align-items-center mb-3">

                        <img
                            src={review.user?.avatar?.url}
                            alt="Customer"
                            className="review-avatar rounded-circle" style={{width:"60px", height:"60px", objectFit:"cover"}}
                        />

                        <div className="ms-3">
                            <h5 className="customer-name">
                                {review.name}
                            </h5>

                            <div className="d-flex gap-1">

                                            {[1, 2, 3, 4, 5].map((star) => (

                                                <Star
                                                    key={star}
                                                    size={15}
                                                    fill={
                                                        star <= review.rating
                                                            ? "currentColor"
                                                            : "none"
                                                    }
                                                    className={
                                                        star <= review.rating
                                                            ? "text-warning"
                                                            : "text-secondary"
                                                    }
                                                />

                                            ))}

                                        </div>
                        </div>

                    </div>

                    <p className="review-text">
                        {review.comment}
                    </p>

                    <small className="review-date">
                       Created at: {new Date(review.createdAt).toLocaleDateString()}
                    </small>
                </div>
                

            </div>
            ))}
        </div>


        

    </div>

</section>
    
    </>)
}

export default Review