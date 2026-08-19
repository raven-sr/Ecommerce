import errorHandler from "../helper/helper.js"
import apiHelper from "../helper/apihelper.js"
import Product from "../models/productdb.js"
import Cart from "../models/cartdb.js";
import { v2 as cloudinary } from "cloudinary";

//Retrive All product
export const getAllProducts = async (req,res, next)=>{
    const resultPerPage=8
    const searchProduct = new apiHelper(Product.find(),req.query).search().filter()
    const resultQuery= searchProduct.query.clone()
    const totalProducts = await resultQuery.countDocuments()
    const totalPages = Math.ceil(totalProducts / resultPerPage)
    const page = Number(req.query.page) || 1

    if( totalPages > 0 && page > totalPages){

         return next(new errorHandler("Page doesn't exist",404))
    }

    searchProduct.pagination(resultPerPage)


    const allProducts = await searchProduct.query
    if(allProducts.length === 0){
        return next(new errorHandler("Product not found",404))
    }
    return res.status(200).json({
        message:"All products",
        totalProducts,
        totalPages,
        resultPerPage,
        currentPage:page,
        allProducts,})
}

//Retrive Single product

export const getSingleProduct = async (req,res,next)=>{

    const id =  req.params.id

    const product = await Product.findById(id)
    if(!product){

        return next(new errorHandler("Product not found",404))
        
    }


    return res.status(200).json({message:"Single product",product})
}

// Add product
// export const addProduct = async(req,res)=>{

    

//     let stock = await Product.create(req.body)
//     return res.status(201).json({

//         message:"product added",
//         stock,

//     })
// }

// Update product
// export const UpdateProduct = async(req,res,next)=>{
//     const id = req.params.id
    
//     let product = await Product.findByIdAndUpdate(id,req.body,{
//         new:true,
//         runValidators:true
//     })
//      if(!product){

//         return next(new errorHandler("Product not found",404))
//     }
//     return res.status(200).json({
//         message:"Product Updated",
//         product
//     })


// }


export const addProduct = async (req, res, next) => {

    try {

        // ==========================================
        // GET PRODUCT DATA
        // ==========================================

        const {
            name,
            price,
            discountPrice,
            offer,
            description,
            category,
            stock,
            brand
        } = req.body;


        // ==========================================
        // CHECK IMAGES
        // ==========================================

        if (!req.files || req.files.length === 0) {

            return next(
                new errorHandler(
                    "Please upload at least one product image",
                    400
                )
            );

        }


        // ==========================================
        // UPLOAD IMAGES TO CLOUDINARY
        // ==========================================

        const images = [];


        for (const file of req.files) {

            const myCloud = await new Promise(
                (resolve, reject) => {

                    const stream =
                        cloudinary.uploader.upload_stream(
                            {
                                folder: "products"
                            },

                            (error, result) => {

                                if (error) {

                                    reject(error);

                                } else {

                                    resolve(result);

                                }

                            }
                        );


                    stream.end(file.buffer);

                }
            );


            images.push({

                publici_d:
                    myCloud.public_id,

                url:
                    myCloud.secure_url

            });

        }


        // ==========================================
        // CREATE PRODUCT
        // ==========================================

        const product = await Product.create({

            name,

            price,

            discountPrice,

            offer,

            description,

            category,

            stock,

            brand,

            user: req.user._id,

            image: images

        });


        // ==========================================
        // RESPONSE
        // ==========================================

        return res.status(201).json({

            success: true,

            message: "Product Added Successfully",

            product

        });


    } catch (error) {

        console.log(error);

        return next(error);

    }

};

export const UpdateProduct = async (req, res, next) => {

    try {

        const id = req.params.id;

        // Find existing product
        const product = await Product.findById(id);

        if (!product) {
            return next(
                new errorHandler("Product not found", 404)
            );
        }


        // ==========================================
        // UPDATE IMAGES
        // ==========================================

        let updatedImages = product.image || [];

        if (req.files && req.files.length > 0) {

            // Delete old images from Cloudinary
            for (const image of product.image || []) {

                if (image.publici_d) {

                    await cloudinary.uploader.destroy(
                        image.publici_d
                    );

                }

            }


            // Upload new images
            updatedImages = [];

            for (const file of req.files) {

                const myCloud = await new Promise(
                    (resolve, reject) => {

                        const stream =
                            cloudinary.uploader.upload_stream(
                                {
                                    folder: "products"
                                },
                                (error, result) => {

                                    if (error) {
                                        reject(error);
                                    } else {
                                        resolve(result);
                                    }

                                }
                            );

                        stream.end(file.buffer);

                    }
                );


                updatedImages.push({
                    publici_d: myCloud.public_id,
                    url: myCloud.secure_url
                });

            }

        }


        // ==========================================
        // UPDATE PRODUCT
        // ==========================================

        product.name = req.body.name;
        product.price = req.body.price;
        product.discountPrice = req.body.discountPrice;
        product.offer = req.body.offer;
        product.description = req.body.description;
        product.category = req.body.category;
        product.stock = req.body.stock;
        product.brand = req.body.brand;

        product.image = updatedImages;


        await product.save();


        // ==========================================
        // RESPONSE
        // ==========================================

        return res.status(200).json({
            success: true,
            message: "Product Updated",
            product
        });


    } catch (error) {

        console.log(error);

        return next(error);

    }

};

// Delete Product
export const deleteProduct = async (req,res,next)=>{
     const id = req.params.id
    //  req.body.user=req.user.id;
    await Cart.updateMany(
        { "items.product": id },
        {
            $pull: {
                items: {
                    product: id
                }
            }
        }
    );
     let product = await Product.findByIdAndDelete(id)

     if(!product){

       return next(new errorHandler("Product not found",404))
    }
    return res.status(200).json({
        message:"Product Deleted",
        product
    })
    
}

//productReview

export const productReview=async (req,res,next)=>{
    const {rating , comment , productId}= req.body;
    const review={
       user:req.user._id,
       name:req.user.name,
       rating: Number(rating),
       comment
    }
    const product= await Product.findById(productId)
     if(!product){
       return next(new errorHandler("Product not found",404))
    }
    const reviewExists = product.reviews.find(review => review.user.toString() === req.user.id);
if (reviewExists) {
    reviewExists.rating = rating;
    reviewExists.comment = comment;
} else {
    product.reviews.push(review);
}

//Update Review Count
product.numOfReviews = product.reviews.length;

//Update Rating
let sum = 0;

product.reviews.forEach((review) => {
    sum = sum + review.rating;
});

product.rating = product.reviews.length > 0
    ? sum / product.reviews.length
    : 0;

//Save Details
await product.save({validateBeforeSave:false});

res.status(200).json({
    success: true,
    product,
});

}

export const viewProductReview =async (req,res,next)=>{
    const product = await Product.findById(req.params.id).populate("reviews.user");;
    if(!product){
        return next(new errorHandler("product not found",404));
    }
    return res.status(200).json({
        success:true,
        reviews:product.reviews
    })
}

//Delete Reviews
export const adminDeleteReview = async (req, res, next) => {

    //Product ID: req.query.productId | review : req.query.id
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new errorHandler("Product not found", 400));
    }

    const reviews = product.reviews.filter(
        (review) => review._id.toString() !== req.query.id.toString());

    let sum = 0;

    reviews.forEach((review) => {
        sum += review.rating;
    });

    const ratings = reviews.length > 0 ? sum / reviews.length : 0;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        { reviews, ratings, numOfReviews },
        { new: true ,runValidators:true}
    );

    return res.status(200).json({
        success:true,
        message:"Review was successfully Deleted"
    })
};
 