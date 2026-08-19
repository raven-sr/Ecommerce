import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import api from "../app/api"

export const GetProduct = createAsyncThunk("/get/product", async(_, {rejectWithValue}) => {
    try {
        const {data} = await api.get("/api/v1/products")
        return data
        
    } catch (error) {
        return  rejectWithValue(error.response?.data)
    }
})

export const relatedProduct = createAsyncThunk("/get/related/product", async(keyword, {rejectWithValue}) => {
    try {
        const {data} = await api.get(`/api/v1/products?keyword=${keyword}`)
        return data
        
    } catch (error) {
        return  rejectWithValue(error.response?.data)
    }
})

export const page = createAsyncThunk("/get/page/product", async(Page, {rejectWithValue}) => {
    try {
        const {data} = await api.get(`/api/v1/products?page=${Page}`)
        return data
        
    } catch (error) {
        return  rejectWithValue(error.response?.data)
    }
})


export const GetSingleProduct = createAsyncThunk("/get/singleproduct", async(id, {rejectWithValue}) => {
    try {
        const {data} = await api.get(`/api/v1/product/${id}`)
        
        return data
        
    } catch (error) {
        return  rejectWithValue(error.response?.data)
    }
})

export const deleteProduct = createAsyncThunk("/delete/singleproduct", async(id, {rejectWithValue}) => {
    try {
        const {data} = await api.delete(`/api/v1/admin/deleteproduct/${id}`)
        
        return data
        
    } catch (error) {
        return  rejectWithValue(error.response?.data)
    }
})
export const UpdateProduct = createAsyncThunk(
    "/update/product",

    async ({ id, formData }, { rejectWithValue }) => {

        try {

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            };

            const { data } = await api.put(
                `/api/v1/admin/updateproduct/${id}`,
                formData,
                config
            );

            return data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data
            );

        }

    }
);
export const AddProduct = createAsyncThunk(
    "/add/product",

    async (formData, { rejectWithValue }) => {

        try {

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            };

            const { data } = await api.post(
                "/api/v1/admin/addproduct",
                formData,
                config
            );

            return data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data
            );

        }

    }
);



const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        product: [],
        productCount: 0,
        loading: false,
        error: null,
        success:false,
        totalPages: 0,
        resultPerPage: 0
    },
    reducers:{
        removeError: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(GetProduct.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(GetProduct.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success= true
            state.products = action.payload.allProducts
            state.productCount = action.payload.totalProducts
        })
        .addCase(GetProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.error
        })
        
         builder
        .addCase(GetSingleProduct.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(GetSingleProduct.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success= true
            state.product = action.payload.product
        })
        .addCase(GetSingleProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.error  || action.payload?.message || "Failed to fetch product";
        })
        builder
        .addCase(relatedProduct.pending, (state) => {   
            state.error = null
        })
        .addCase(relatedProduct.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success= true
            state.products = action.payload.allProducts
            state.productCount = action.payload.totalProducts
        })
        .addCase(relatedProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.error
        })
          builder
        .addCase(page.pending, (state) => {   
            state.error = null
        })
        .addCase(page.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success= true
            state.products = action.payload.allProducts
            state.productCount = action.payload.totalProducts
            state.totalPages = action.payload.totalPages
            state.resultPerPage = action.payload.resultPerPage
        })
        .addCase(page.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.error
        })
        builder
        .addCase(deleteProduct.pending, (state) => {   
            state.error = null
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success= true
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder

    .addCase(UpdateProduct.pending, (state) => {

        state.loading = true;

        state.error = null;

    })

    .addCase(UpdateProduct.fulfilled, (state, action) => {

        state.loading = false;

        state.error = null;

        state.success = true;

        state.product = action.payload.product || null;

    })

    .addCase(UpdateProduct.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload?.error || "Product update failed";

        state.success = false;

    });
    builder

    .addCase(AddProduct.pending, (state) => {

        state.loading = true;

        state.error = null;

    })

    .addCase(AddProduct.fulfilled, (state, action) => {

        state.loading = false;

        state.error = null;

        state.success = true;

        state.product =
            action.payload.product || null;

    })

    .addCase(AddProduct.rejected, (state, action) => {

        state.loading = false;

        state.error =
            action.payload?.error ||
            "Product adding failed";

        state.success = false;

    });
    }
})

export const {removeError, removeSuccess} = productSlice.actions
export default productSlice.reducer