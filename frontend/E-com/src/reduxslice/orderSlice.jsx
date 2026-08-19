import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import api from "../app/api"



export const Postorder = createAsyncThunk("/post/order", async({itemsPrice,taxPrice,shippingPrice,shippingInfo,orderItems,paymentInfo}, {rejectWithValue}) => {

    try {

        const {data} = await api.post("/api/v1/user/order",{itemsPrice: itemsPrice,taxPrice: taxPrice,shippingPrice: shippingPrice,shippingInfo: shippingInfo,orderItems: orderItems,paymentInfo: paymentInfo})
        return data
        
    } catch (error) {
        return  rejectWithValue(error.response?.data)
    }
})

export const getOrder = createAsyncThunk("/get/order", async(_, {rejectWithValue}) => {

    try {

        const {data} = await api.get("/api/v1/user/orders")
        return data
        
    } catch (error) {
        return  rejectWithValue(error.response?.data)
    }
})

export const getSingleOrder = createAsyncThunk("/get/single/order", async(id, {rejectWithValue}) => {

    try {

        const {data} = await api.get(`/api/v1/user/order/${id}`)
        return data
        
    } catch (error) {
        return  rejectWithValue(error.response?.data)
    }
})

export const deleteOrder = createAsyncThunk("/delete/order", async(id, {rejectWithValue}) => {

    try {

        const {data} = await api.delete(`/api/v1/user/delete/${id}`)
        return data
        
    } catch (error) {
        return  rejectWithValue(error.response?.data)
    }
})


const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        order: null,
        loading: false,
        error: null,
        success:false,
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
        .addCase(Postorder.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(Postorder.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success= true
            state.orders = action.payload.orders
        })
        .addCase(Postorder.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder
        .addCase(getOrder.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(getOrder.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success= true
            state.orders = action.payload.orders
        })
        .addCase(getOrder.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder
        .addCase(deleteOrder.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(deleteOrder.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
        })
        .addCase(deleteOrder.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        builder
        .addCase(getSingleOrder.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(getSingleOrder.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success= true
            state.order = action.payload.order
        })
        .addCase(getSingleOrder.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const {removeError, removeSuccess} = orderSlice.actions
export default orderSlice.reducer