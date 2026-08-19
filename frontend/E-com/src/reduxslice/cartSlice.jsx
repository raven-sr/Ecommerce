import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../app/api";

export const CreateCart = createAsyncThunk("/add/cart", async(cartValue, { rejectWithValue }) => {
    try {
        const {data} = await api.post("/api/v1/add/cart", cartValue)
        return data
    } catch (error) {
        return rejectwithValue(error?.response?.data)
    }
})


export const GetCart = createAsyncThunk("/get/cart", async(_, { rejectWithValue }) => {
    try {
        const {data} = await api.get("/api/v1/get/cart")
        return data
    } catch (error) {
        return rejectwithValue(error?.response?.data)
    }
})

export const deleteCart = createAsyncThunk("/delete/cart", async(id, {rejectWithValue}) => {
    try {
        const {data} = await api.delete(`/api/v1/delete/cart/${id}`)
        
        return data
        
    } catch (error) {
        return  rejectWithValue(error.response?.data)
    }
})

export const updateCart = createAsyncThunk("/update/cart", async({id,quantity}, {rejectWithValue}) => {
    try {
        const {data} = await api.put(`/api/v1/update/cart/${id}`,{quantity: quantity})
        
        return data
        
    } catch (error) {
        return  rejectWithValue(error.response?.data)
    }
})

export const priceCalculation = createAsyncThunk("/price/calculation", async(Subtotal, { rejectWithValue }) => {
    try {
        const {data} = await api.post("/api/v1/post/prices", {itemsPrice: Subtotal})
        return data
    } catch (error) {
        return rejectwithValue(error?.response?.data)
    }
})



const cartSlice = createSlice({
    name: "cart", 
initialState: {
    cart: {
        items: [],
        totalItems: 0,
        totalPrice: 0,
        totalProducts: 0
    },
    loading: true,
    error: null,
    success: false,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0
},
     reducers:{
            removeCartError: (state) => {
                state.error = null;
            },
            removeCartSuccess: (state) => {
                state.success = false;
            }
        },
        extraReducers: (builder) => {
            builder
            .addCase(CreateCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(CreateCart.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success= true
                state.cart = action.payload.cart
            })
            .addCase(CreateCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

             builder
            .addCase(GetCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(GetCart.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success= true
                state.cart = action.payload.cart
            })
            .addCase(GetCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
             builder
            .addCase(deleteCart.pending, (state) => {
                state.error = null
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success= true
                state.cart = action.payload.cart
            })
            .addCase(deleteCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            builder
            .addCase(updateCart.pending, (state) => {
                state.error = null
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success= true
                state.cart = action.payload.cart
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
             builder
            .addCase(priceCalculation.pending, (state) => {
                state.error = null
            })
            .addCase(priceCalculation.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success= true
                state.taxPrice= action.payload.price.taxPrice
                state.shippingPrice= action.payload.price.shippingPrice
                state.totalPrice= action.payload.price.totalPrice
            })
            .addCase(priceCalculation.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
        }
    })
    
    export const {removeCartError, removeCartSuccess} = cartSlice.actions
    export default cartSlice.reducer