import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

export const GetReview = createAsyncThunk("/get/review", async(id, {rejectWithValue}) => {
    try {
        const {data} = await axios.get(`/api/v1/product/reviews/${id}`)
        return data
        
    } catch (error) {
        return  rejectWithValue(error.response?.data)
    }
})

export const Postreview = createAsyncThunk("/post/review", async({id,comment,rating}, {rejectWithValue}) => {

    try {

        const {data} = await axios.post("/api/v1/product/review",{rating: rating,comment: comment,productId: id})
        return data
        
    } catch (error) {
        return  rejectWithValue(error.response?.data)
    }
})


const reviewSlice = createSlice({
    name: "review",
    initialState: {
        reviews: [],
        review: [],
        loading: false,
        error: null,
        success:false,
        posted:false
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
        .addCase(GetReview.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(GetReview.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success= true
            state.reviews = action.payload.reviews
        })
        .addCase(GetReview.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
            builder
        .addCase(Postreview.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(Postreview.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success= true
            state.posted= true
            state.reviews = action.payload.product.reviews
        })
        .addCase(Postreview.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    
    }
})

export const {removeError, removeSuccess} = reviewSlice.actions
export default reviewSlice.reducer