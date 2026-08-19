import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
            name: {
                type: String,
                required: [true, "Product name is required"],
                trim: true,
                minlength: [3, "Name must be at least 3 characters"],
                maxlength: [100, "Name cannot exceed 100 characters"]
            },

            price: {
                type: Number,
                required: [true, "Price is required"],
                min: [1, "Price must be greater than 0"]
            },

            discountPrice: {
                type: Number,
                min: [1, "Price must be greater than 0"]
            },

            offer: {
                type: String
            },

            description: {
                type: String,
                trim: true,
                maxlength: [500, "Description cannot exceed 500 characters"]
            },

            category: {
                type: String,
                required: [true, "Category is required"],
                enum: ["Electronics", "Clothing", "Books", "Home", "Sports"]
            },

            stock: {
                type: Number,
                required: true,
                min: [0, "Stock cannot be negative"],
                default: 0
            },

            brand: {
                type: String,
                trim: true
            },

            rating: {
                type: Number,
                default: 0,
            },

            numOfReviews: {
                type: Number,
                default: 0,
            },
            reviews: [
                {
                    user: {
                        type: mongoose.Schema.ObjectId,
                        ref: "User",
                        required: true,
                    },
                    name: {
                        type: String,
                        required: true,
                    },
                    rating: {
                        type: Number,
                        required: true,
                    },
                    comment: {
                        type: String,
                        required: true,
                    },
                    createdAt: {
                        type: Date,
                        default: Date.now,
                    },
                  
                },
            ],
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },

            image:[

                {
                    publici_d:{
                        type:String,
                        required:[true],
                    },
                    url:{
                        type:String,
                        required:[true],

                    }
                }
            ]

            
        }
);

export default mongoose.model("Product", productSchema);
    
