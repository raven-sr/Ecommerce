import {
    Plus,
    Edit,
    Trash2,
    X,
    Package,
    Search,
    Image as ImageIcon,
    MoreVertical,
    Star,
    Tag
} from "lucide-react";

import Nav from "../components/nav";
import Footer from "../components/footer";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
    deleteProduct,
    GetProduct,
    relatedProduct,
    UpdateProduct,
    AddProduct
} from "../reduxslice/productSlicer";


function ManageProducts() {

    const dispatch = useDispatch();


    // =====================================================
    // REDUX
    // =====================================================

    const {
        products = [],
        productCount: totalProducts,
        loading
    } = useSelector(
        (state) => state.product
    );


    // =====================================================
    // POPUP
    // =====================================================

    const [popup, setPopup] = useState(false);

    const [selectedProduct, setSelectedProduct] =
        useState(null);


    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({

        name: "",

        price: "",

        discountPrice: "",

        offer: "",

        description: "",

        category: "",

        stock: "",

        brand: "",

        image: []

    });


    // =====================================================
    // FILTER
    // =====================================================

    const [stockFilter, setStockFilter] =
        useState("all");

    const [search, setSearch] =
        useState("");


    // =====================================================
    // GET PRODUCTS
    // =====================================================

    useEffect(() => {

        dispatch(GetProduct());

    }, [dispatch]);


    // =====================================================
    // CATEGORY FILTER
    // =====================================================

    const handleSelect = (keyword) => {

        if (!keyword) {

            dispatch(GetProduct());

            return;

        }

        dispatch(
            relatedProduct(keyword)
        );

    };


    // =====================================================
    // FILTER PRODUCTS
    // =====================================================

    const filteredProducts =
        products.filter((product) => {

            const searchValue =
                search.toLowerCase();


            const matchesSearch =

                product.name
                    ?.toLowerCase()
                    .includes(searchValue)

                ||

                product.brand
                    ?.toLowerCase()
                    .includes(searchValue)

                ||

                product.category
                    ?.toLowerCase()
                    .includes(searchValue);


            let matchesStock = true;


            if (stockFilter === "inStock") {

                matchesStock =
                    Number(product.stock || 0) > 10;

            }


            if (stockFilter === "lowStock") {

                matchesStock =
                    Number(product.stock || 0) > 0 &&
                    Number(product.stock || 0) <= 10;

            }


            if (stockFilter === "outOfStock") {

                matchesStock =
                    Number(product.stock || 0) <= 0;

            }


            return (
                matchesSearch &&
                matchesStock
            );

        });


    // =====================================================
    // STATISTICS
    // =====================================================

    const totalStock =
        products.reduce(
            (total, product) => {

                return (
                    total +
                    Number(product.stock || 0)
                );

            },
            0
        );


    const lowStockProducts =
        products.filter(
            (product) => {

                const stock =
                    Number(product.stock || 0);

                return (
                    stock > 0 &&
                    stock <= 10
                );

            }
        ).length;


    const outOfStockProducts =
        products.filter(
            (product) =>
                Number(product.stock || 0) <= 0
        ).length;


    // =====================================================
    // DELETE PRODUCT
    // =====================================================

    const handleDelete = async (id) => {

        await dispatch(
            deleteProduct(id)
        );

        dispatch(
            GetProduct()
        );

    };


    // =====================================================
    // RESET FORM
    // =====================================================

    const resetForm = () => {

        setFormData({

            name: "",

            price: "",

            discountPrice: "",

            offer: "",

            description: "",

            category: "",

            stock: "",

            brand: "",

            image: []

        });

    };


    // =====================================================
    // ADD PRODUCT BUTTON
    // =====================================================

    const handleAddProduct = () => {

        // IMPORTANT
        // null means ADD MODE

        setSelectedProduct(null);

        resetForm();

        setPopup(true);

    };


    // =====================================================
    // EDIT PRODUCT BUTTON
    // =====================================================

    const handleEdit = (product) => {

        setSelectedProduct(product);


        setFormData({

            name:
                product.name || "",

            price:
                product.price || "",

            discountPrice:
                product.discountPrice || "",

            offer:
                product.offer || "",

            description:
                product.description || "",

            category:
                product.category || "",

            stock:
                product.stock || "",

            brand:
                product.brand || "",

            // Existing images are NOT File objects.
            // Keep them inside selectedProduct.
            image: []

        });


        setPopup(true);

    };


    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData(
            (previous) => ({

                ...previous,

                [name]: value

            })
        );

    };


    // =====================================================
    // HANDLE IMAGES
    // =====================================================

    const handleImageChange = (e) => {

        const files =
            Array.from(
                e.target.files
            );


        setFormData(
            (previous) => ({

                ...previous,

                image: files

            })
        );

    };


    // =====================================================
    // CANCEL
    // =====================================================

    const handleCancel = () => {

        setPopup(false);

        setSelectedProduct(null);

        resetForm();

    };


    // =====================================================
    // SUBMIT
    // ADD + UPDATE
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // =================================================
        // CREATE REAL FORMDATA
        // =================================================

        const data =
            new FormData();


        // =================================================
        // PRODUCT FIELDS
        // =================================================

        data.append(
            "name",
            formData.name
        );


        data.append(
            "price",
            formData.price
        );


        data.append(
            "discountPrice",
            formData.discountPrice
        );


        data.append(
            "offer",
            formData.offer
        );


        data.append(
            "description",
            formData.description
        );


        data.append(
            "category",
            formData.category
        );


        data.append(
            "stock",
            formData.stock
        );


        data.append(
            "brand",
            formData.brand
        );


        // =================================================
        // IMAGES
        // =================================================

        if (
            formData.image &&
            formData.image.length > 0
        ) {

            formData.image.forEach(
                (file) => {

                    data.append(
                        "images",
                        file
                    );

                }
            );

        }


        // =================================================
        // DEBUG
        // =================================================

        console.log(
            "========== PRODUCT FORMDATA =========="
        );


        for (
            const [key, value]
            of data.entries()
        ) {

            console.log(
                key,
                value
            );

        }


        // =================================================
        // ADD PRODUCT
        // =================================================

        if (!selectedProduct) {

            console.log(
                "ADDING PRODUCT..."
            );


            const result =
                await dispatch(
                    AddProduct(data)
                );


            // =============================================
            // ADD SUCCESS
            // =============================================

            if (
                AddProduct.fulfilled.match(
                    result
                )
            ) {

                console.log(
                    "Product added successfully"
                );


                setPopup(false);

                setSelectedProduct(null);

                resetForm();


                // Refresh products

                dispatch(
                    GetProduct()
                );

            }


            return;

        }


        // =================================================
        // UPDATE PRODUCT
        // =================================================

        console.log(
            "UPDATING PRODUCT..."
        );


        const result =
            await dispatch(

                UpdateProduct({

                    id:
                        selectedProduct._id,

                    formData:
                        data

                })

            );


        // =================================================
        // UPDATE SUCCESS
        // =================================================

        if (
            UpdateProduct.fulfilled.match(
                result
            )
        ) {

            console.log(
                "Product updated successfully"
            );


            setPopup(false);

            setSelectedProduct(null);

            resetForm();


            // Refresh products

            dispatch(
                GetProduct()
            );

        }

    };


    // =====================================================
    // RETURN
    // =====================================================

    return (

        <div>

            <Nav />


            <div className="container py-4">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">
                            Products
                        </h2>

                        <p className="text-muted mb-0">
                            Manage your store products and inventory
                        </p>

                    </div>


                    <button
                        className="btn text-white d-flex align-items-center justify-content-center gap-2 px-4"
                        style={{
                            backgroundColor:
                                "#5C8374"
                        }}
                        onClick={
                            handleAddProduct
                        }
                    >

                        <Plus size={18} />

                        Add Product

                    </button>

                </div>



                {/* =================================================
                    STATISTICS
                ================================================= */}

                <div className="row g-3 mb-4">

                    <div className="col-12 col-sm-6 col-xl-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <p className="text-muted mb-1 small">
                                    Total Products
                                </p>

                                <h3 className="fw-bold mb-0">

                                    {
                                        totalProducts ||
                                        products.length
                                    }

                                </h3>

                            </div>

                        </div>

                    </div>


                    <div className="col-12 col-sm-6 col-xl-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <p className="text-muted mb-1 small">
                                    Total Stock
                                </p>

                                <h3 className="fw-bold mb-0">

                                    {
                                        totalStock.toLocaleString(
                                            "en-IN"
                                        )
                                    }

                                </h3>

                            </div>

                        </div>

                    </div>


                    <div className="col-12 col-sm-6 col-xl-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <p className="text-muted mb-1 small">
                                    Low Stock
                                </p>

                                <h3 className="fw-bold mb-0">
                                    {lowStockProducts}
                                </h3>

                            </div>

                        </div>

                    </div>


                    <div className="col-12 col-sm-6 col-xl-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <p className="text-muted mb-1 small">
                                    Out of Stock
                                </p>

                                <h3 className="fw-bold mb-0">
                                    {outOfStockProducts}
                                </h3>

                            </div>

                        </div>

                    </div>

                </div>



                {/* =================================================
                    SEARCH + FILTER
                ================================================= */}

                <div className="card border-0 shadow-sm mb-4">

                    <div className="card-body">

                        <div className="row g-3">


                            <div className="col-12 col-lg-6">

                                <div className="input-group">

                                    <span className="input-group-text bg-white">

                                        <Search
                                            size={18}
                                            className="text-muted"
                                        />

                                    </span>


                                    <input
                                        type="search"
                                        className="form-control"
                                        placeholder="Search products..."
                                        value={search}
                                        onChange={
                                            (e) =>
                                                setSearch(
                                                    e.target.value
                                                )
                                        }
                                    />

                                </div>

                            </div>


                            <div className="col-12 col-sm-6 col-lg-3">

                                <select
                                    className="form-select"
                                    onChange={
                                        (e) =>
                                            handleSelect(
                                                e.target.value
                                            )
                                    }
                                >

                                    <option value="">
                                        All Categories
                                    </option>

                                    <option value="Electronics">
                                        Electronics
                                    </option>

                                    <option value="Clothing">
                                        Clothing
                                    </option>

                                    <option value="Books">
                                        Books
                                    </option>

                                    <option value="Home">
                                        Home
                                    </option>

                                    <option value="Sports">
                                        Sports
                                    </option>

                                </select>

                            </div>


                            <div className="col-12 col-sm-6 col-lg-3">

                                <select
                                    className="form-select"
                                    value={
                                        stockFilter
                                    }
                                    onChange={
                                        (e) =>
                                            setStockFilter(
                                                e.target.value
                                            )
                                    }
                                >

                                    <option value="all">
                                        All Stock
                                    </option>

                                    <option value="inStock">
                                        In Stock
                                    </option>

                                    <option value="lowStock">
                                        Low Stock
                                    </option>

                                    <option value="outOfStock">
                                        Out of Stock
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                </div>



                {/* =================================================
                    PRODUCTS
                ================================================= */}

                <div className="row g-4">

                    {
                        filteredProducts.length === 0 ? (

                            <div className="col-12">

                                <div className="card border-0 shadow-sm">

                                    <div className="card-body text-center py-5">

                                        <Package
                                            size={55}
                                            className="text-muted mb-3"
                                        />

                                        <h5 className="fw-bold">
                                            No Products Found
                                        </h5>

                                    </div>

                                </div>

                            </div>

                        ) : (

                            filteredProducts.map(
                                (product) => {

                                    const stock =
                                        Number(
                                            product.stock || 0
                                        );


                                    const productImage =
                                        product.image?.[0]?.url;


                                    return (

                                        <div
                                            className="col-12 col-sm-6 col-lg-4 col-xl-3"
                                            key={
                                                product._id
                                            }
                                        >

                                            <div className="card border-0 shadow-sm h-100 overflow-hidden">


                                                {/* IMAGE */}

                                                <div
                                                    className="position-relative"
                                                    style={{
                                                        backgroundColor:
                                                            "#F8F9FA"
                                                    }}
                                                >

                                                    {
                                                        productImage ? (

                                                            <img
                                                                src={
                                                                    productImage
                                                                }
                                                                alt={
                                                                    product.name
                                                                }
                                                                className="w-100"
                                                                style={{
                                                                    height:
                                                                        "230px",
                                                                    objectFit:
                                                                        "cover"
                                                                }}
                                                            />

                                                        ) : (

                                                            <div
                                                                className="d-flex align-items-center justify-content-center"
                                                                style={{
                                                                    height:
                                                                        "230px"
                                                                }}
                                                            >

                                                                <ImageIcon
                                                                    size={
                                                                        50
                                                                    }
                                                                    className="text-muted"
                                                                />

                                                            </div>

                                                        )
                                                    }


                                                    {
                                                        stock <= 0 ? (

                                                            <span className="badge bg-danger position-absolute top-0 start-0 m-3">
                                                                Out of stock
                                                            </span>

                                                        ) : stock <= 10 ? (

                                                            <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-3">
                                                                Only {stock} left
                                                            </span>

                                                        ) : (

                                                            <span className="badge bg-success position-absolute top-0 start-0 m-3">
                                                                {stock} in stock
                                                            </span>

                                                        )
                                                    }


                                                    {
                                                        product.offer && (

                                                            <span className="badge bg-danger position-absolute bottom-0 start-0 m-3">

                                                                <Tag
                                                                    size={12}
                                                                />

                                                                {" "}

                                                                {
                                                                    product.offer
                                                                }

                                                            </span>

                                                        )
                                                    }


                                                    {/* MENU */}

                                                    <div className="dropdown position-absolute top-0 end-0 m-2">

                                                        <button
                                                            className="btn btn-light rounded-circle shadow-sm"
                                                            data-bs-toggle="dropdown"
                                                        >

                                                            <MoreVertical
                                                                size={17}
                                                            />

                                                        </button>


                                                        <ul className="dropdown-menu dropdown-menu-end">

                                                            <li>

                                                                <button
                                                                    className="dropdown-item d-flex align-items-center gap-2"
                                                                    onClick={() =>
                                                                        handleEdit(
                                                                            product
                                                                        )
                                                                    }
                                                                >

                                                                    <Edit
                                                                        size={15}
                                                                    />

                                                                    Edit Product

                                                                </button>

                                                            </li>


                                                            <li>

                                                                <button
                                                                    className="dropdown-item text-danger d-flex align-items-center gap-2"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            product._id
                                                                        )
                                                                    }
                                                                >

                                                                    <Trash2
                                                                        size={15}
                                                                    />

                                                                    Delete Product

                                                                </button>

                                                            </li>

                                                        </ul>

                                                    </div>

                                                </div>



                                                {/* DETAILS */}

                                                <div className="card-body d-flex flex-column">

                                                    <small
                                                        className="text-uppercase fw-semibold mb-1"
                                                        style={{
                                                            color:
                                                                "#5C8374"
                                                        }}
                                                    >

                                                        {
                                                            product.category ||
                                                            "Uncategorized"
                                                        }

                                                    </small>


                                                    <h5 className="fw-bold mb-1">

                                                        {
                                                            product.name
                                                        }

                                                    </h5>


                                                    {
                                                        product.brand && (

                                                            <small className="text-muted mb-2">

                                                                Brand:{" "}

                                                                <strong>
                                                                    {
                                                                        product.brand
                                                                    }
                                                                </strong>

                                                            </small>

                                                        )
                                                    }


                                                    <p
                                                        className="text-muted small mb-3"
                                                        style={{
                                                            display:
                                                                "-webkit-box",
                                                            WebkitLineClamp:
                                                                2,
                                                            WebkitBoxOrient:
                                                                "vertical",
                                                            overflow:
                                                                "hidden"
                                                        }}
                                                    >

                                                        {
                                                            product.description ||
                                                            "No description available"
                                                        }

                                                    </p>


                                                    <div className="d-flex align-items-center gap-2 mb-3">

                                                        <span
                                                            className="badge d-flex align-items-center gap-1"
                                                            style={{
                                                                backgroundColor:
                                                                    "#FFF4D6",
                                                                color:
                                                                    "#D97706"
                                                            }}
                                                        >

                                                            <Star
                                                                size={12}
                                                                fill="currentColor"
                                                            />

                                                            {
                                                                product.rating ||
                                                                0
                                                            }

                                                        </span>


                                                        <small className="text-muted">

                                                            {
                                                                product.numOfReviews ||
                                                                0
                                                            }

                                                            {" "}reviews

                                                        </small>

                                                    </div>


                                                    <div className="mb-3">

                                                        <span className="fw-bold fs-5">

                                                            ₹

                                                            {
                                                                Number(
                                                                    product.discountPrice ??
                                                                    product.price ??
                                                                    0
                                                                ).toLocaleString(
                                                                    "en-IN"
                                                                )
                                                            }

                                                        </span>


                                                        {
                                                            product.discountPrice &&
                                                            Number(
                                                                product.discountPrice
                                                            ) <
                                                            Number(
                                                                product.price
                                                            ) && (

                                                                <span className="text-muted small text-decoration-line-through ms-2">

                                                                    ₹

                                                                    {
                                                                        Number(
                                                                            product.price
                                                                        ).toLocaleString(
                                                                            "en-IN"
                                                                        )
                                                                    }

                                                                </span>

                                                            )
                                                        }

                                                    </div>


                                                    <div className="mt-auto">

                                                        <button
                                                            className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    product
                                                                )
                                                            }
                                                        >

                                                            <Edit
                                                                size={16}
                                                            />

                                                            Edit

                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    );

                                }
                            )

                        )
                    }

                </div>

            </div>



            {/* =========================================================
                PRODUCT POPUP
            ========================================================= */}

            {
                popup && (

                    <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                        style={{
                            backgroundColor:
                                "rgba(0,0,0,0.5)"
                        }}
                    >

                        <div className="modal-dialog modal-dialog-centered modal-lg">

                            <div className="modal-content border-0 shadow">


                                {/* HEADER */}

                                <div className="modal-header">

                                    <div>

                                        <h5 className="modal-title fw-bold">

                                            {
                                                selectedProduct
                                                    ? "Update Product"
                                                    : "Add Product"
                                            }

                                        </h5>


                                        <small className="text-muted">

                                            {
                                                selectedProduct
                                                    ? "Update product information"
                                                    : "Add a new product"
                                            }

                                        </small>

                                    </div>


                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={
                                            handleCancel
                                        }
                                    />

                                </div>



                                {/* FORM */}

                                <form
                                    onSubmit={
                                        handleSubmit
                                    }
                                >

                                    <div className="modal-body">

                                        <div className="row g-3">


                                            {/* NAME */}

                                            <div className="col-12">

                                                <label className="form-label fw-semibold">
                                                    Product Name
                                                </label>

                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Enter product name"
                                                    value={
                                                        formData.name
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                    required
                                                />

                                            </div>



                                            {/* DESCRIPTION */}

                                            <div className="col-12">

                                                <label className="form-label fw-semibold">
                                                    Description
                                                </label>

                                                <textarea
                                                    name="description"
                                                    className="form-control"
                                                    rows="4"
                                                    placeholder="Enter product description"
                                                    value={
                                                        formData.description
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                />

                                            </div>



                                            {/* PRICE */}

                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Price
                                                </label>

                                                <div className="input-group">

                                                    <span className="input-group-text">
                                                        ₹
                                                    </span>

                                                    <input
                                                        type="number"
                                                        name="price"
                                                        className="form-control"
                                                        min="1"
                                                        value={
                                                            formData.price
                                                        }
                                                        onChange={
                                                            handleChange
                                                        }
                                                        required
                                                    />

                                                </div>

                                            </div>



                                            {/* DISCOUNT PRICE */}

                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Discount Price
                                                </label>

                                                <div className="input-group">

                                                    <span className="input-group-text">
                                                        ₹
                                                    </span>

                                                    <input
                                                        type="number"
                                                        name="discountPrice"
                                                        className="form-control"
                                                        min="1"
                                                        value={
                                                            formData.discountPrice
                                                        }
                                                        onChange={
                                                            handleChange
                                                        }
                                                    />

                                                </div>

                                            </div>



                                            {/* OFFER */}

                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Offer
                                                </label>

                                                <input
                                                    type="text"
                                                    name="offer"
                                                    className="form-control"
                                                    placeholder="10% OFF"
                                                    value={
                                                        formData.offer
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                />

                                            </div>



                                            {/* STOCK */}

                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Stock
                                                </label>

                                                <input
                                                    type="number"
                                                    name="stock"
                                                    className="form-control"
                                                    min="0"
                                                    value={
                                                        formData.stock
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                    required
                                                />

                                            </div>



                                            {/* CATEGORY */}

                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Category
                                                </label>

                                                <select
                                                    name="category"
                                                    className="form-select"
                                                    value={
                                                        formData.category
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                    required
                                                >

                                                    <option value="">
                                                        Select Category
                                                    </option>

                                                    <option value="Electronics">
                                                        Electronics
                                                    </option>

                                                    <option value="Clothing">
                                                        Clothing
                                                    </option>

                                                    <option value="Books">
                                                        Books
                                                    </option>

                                                    <option value="Home">
                                                        Home
                                                    </option>

                                                    <option value="Sports">
                                                        Sports
                                                    </option>

                                                </select>

                                            </div>



                                            {/* BRAND */}

                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Brand
                                                </label>

                                                <input
                                                    type="text"
                                                    name="brand"
                                                    className="form-control"
                                                    placeholder="Apple"
                                                    value={
                                                        formData.brand
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                />

                                            </div>



                                            {/* IMAGES */}

                                            <div className="col-12">

                                                <label className="form-label fw-semibold">
                                                    Product Images
                                                </label>

                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={
                                                        handleImageChange
                                                    }
                                                    required={
                                                        !selectedProduct
                                                    }
                                                />

                                                <small className="text-muted">

                                                    {
                                                        selectedProduct
                                                            ? "Select new images only if you want to replace the current images."
                                                            : "You can select up to 5 images."
                                                    }

                                                </small>

                                            </div>



                                            {/* CURRENT IMAGES */}

                                            {
                                                selectedProduct &&
                                                selectedProduct.image?.length > 0 && (

                                                    <div className="col-12">

                                                        <label className="form-label fw-semibold">
                                                            Current Images
                                                        </label>


                                                        <div className="d-flex flex-wrap gap-2">

                                                            {
                                                                selectedProduct.image.map(
                                                                    (
                                                                        image,
                                                                        index
                                                                    ) => (

                                                                        <img
                                                                            key={
                                                                                index
                                                                            }
                                                                            src={
                                                                                image.url
                                                                            }
                                                                            alt={
                                                                                selectedProduct.name
                                                                            }
                                                                            style={{
                                                                                width:
                                                                                    "100px",
                                                                                height:
                                                                                    "100px",
                                                                                objectFit:
                                                                                    "cover",
                                                                                borderRadius:
                                                                                    "8px",
                                                                                border:
                                                                                    "1px solid #ddd"
                                                                            }}
                                                                        />

                                                                    )
                                                                )
                                                            }

                                                        </div>

                                                    </div>

                                                )
                                            }

                                        </div>

                                    </div>



                                    {/* FOOTER */}

                                    <div className="modal-footer">

                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={
                                                handleCancel
                                            }
                                        >

                                            Cancel

                                        </button>


                                        <button
                                            type="submit"
                                            className="btn text-white px-4"
                                            style={{
                                                backgroundColor:
                                                    "#5C8374"
                                            }}
                                            disabled={
                                                loading
                                            }
                                        >

                                            {
                                                loading

                                                    ? (
                                                        selectedProduct
                                                            ? "Updating..."
                                                            : "Adding..."
                                                    )

                                                    : (
                                                        selectedProduct
                                                            ? "Update Product"
                                                            : "Add Product"
                                                    )
                                            }

                                        </button>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                )
            }


            <Footer />

        </div>

    );

}


export default ManageProducts;