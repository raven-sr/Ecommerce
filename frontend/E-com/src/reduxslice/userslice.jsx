import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

export const RegisterUser = createAsyncThunk("/register/user", async(user, {rejectWithValue}) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };
        const {data} = await axios.post("/api/v1/register", user, config)
        return data
        
    } catch (error) {
        return  rejectWithValue(error.response?.data)
    }
})
export const LoginUser = createAsyncThunk("/login/user", async(user, {rejectWithValue}) => {
    try {
    
        const {data} = await axios.post("/api/v1/login", user)
        return data
        
    } catch (error) {
        return  rejectWithValue(error.response?.data)
    }
})

export const forgotPass = createAsyncThunk("/forgotpass/user", async(email, {rejectWithValue}) => {
    try {
        const {data} = await axios.post("/api/v1/password/forgot", {email : email})
        return data
        
    } catch (error) {
        console.log("FORGOT ERROR:", error.response?.data);
        return  rejectWithValue(error.response?.data)
    }
})

export const resetPass = createAsyncThunk("/resetpass/user", async({token, value}, {rejectWithValue}) => {
    try {
        const {data} = await axios.post(`/api/v1/password/reset/${token}`, value)
        return data
    } catch (error) {
        return  rejectWithValue(error.response?.data)
    }
})

export const Logout = createAsyncThunk("/logout/user", async(_, {rejectWithValue}) => {
    try {
        const {data} = await axios.get("/api/v1/logout")
        return data
    } catch (error) {
        return  rejectWithValue(error.response?.data)
    }
})

export const CreateAddress = createAsyncThunk("/post/address/user", async({address,state,pinCode,phoneNo,city,country}, {rejectWithValue}) => {
    try {
    
        const {data} = await axios.patch("/api/v1/create/address", {address: address,state: state,pinCode: pinCode,phoneNo: phoneNo,city: city,country: country})
        return data
        
    } catch (error) {
        return  rejectWithValue(error.response?.data)
    }
})

export const MyData = createAsyncThunk("/get/user", async(_, {rejectWithValue}) => {
    try {
        const {data} = await axios.get("/api/v1/get/mydata")
        return data
    } catch (error) {
        return  rejectWithValue(error.response?.data)
    }
})

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
        loading: false,
        error: null,
        success:false,
        isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
        address: null
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
        .addCase(RegisterUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(RegisterUser.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success= true
            state.user = action.payload.user || null
            state.isAuthenticated = Boolean(action.payload?.user)
            localStorage.setItem("user", JSON.stringify(state.user))
            localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated))
        })
        .addCase(RegisterUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.error
            state.user = null
            state.isAuthenticated = false
        })
        builder
        .addCase(LoginUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(LoginUser.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success= true
            state.user = action.payload.user || null
            state.isAuthenticated = Boolean(action.payload?.user)
            localStorage.setItem("user", JSON.stringify(state.user))
            localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated))
        })
        .addCase(LoginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.user = null
            state.isAuthenticated = false
        })
         builder
        .addCase(forgotPass.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(forgotPass.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success= true
            state.user = action.payload.user || null
            state.isAuthenticated = Boolean(action.payload?.user)
            localStorage.setItem("user", JSON.stringify(state.user))
            localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated))
        })
        .addCase(forgotPass.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.error
            state.user = null
            state.isAuthenticated = false
        })

        builder
        .addCase(resetPass.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(resetPass.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success= true
            state.user = action.payload.user || null
            state.isAuthenticated = Boolean(action.payload?.user)
        })
        .addCase(resetPass.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.error || action.error?.message || "Password reset failed"
            state.user = null
            state.isAuthenticated = false
        })
         builder
        .addCase(Logout.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(Logout.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success= true
            state.user =  null
            state.isAuthenticated = false
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");
        })
        .addCase(Logout.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.error 
            state.user = null
            state.isAuthenticated = false
        })

        builder
        .addCase(CreateAddress.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(CreateAddress.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success= true
            state.address = action.payload.address
        })
        .addCase(CreateAddress.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        

        builder
        .addCase(MyData.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(MyData.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.user = action.payload.user
        })
        .addCase(MyData.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const {removeError, removeSuccess} = userSlice.actions
export default userSlice.reducer