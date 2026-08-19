import express from "express";
import cors from "cors";

import productRoutes from "./routes/routes.js";
import userRoutes from "./routes/userroutes.js";
import orderRoutes from "./routes/orderroutes.js";
import cartRoutes from "./routes/cartroute.js";

import error from "./middleware/middleware.js";
import CookieParser from "cookie-parser";

const app = express();

// CORS
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://ecommerce-dun-sigma-79.vercel.app"
    ],
    credentials: true
}));

app.use(express.json());
app.use(CookieParser());

// Routes
app.use("/api/v1/", productRoutes);
app.use("/api/v1/", userRoutes);
app.use("/api/v1/", orderRoutes);
app.use("/api/v1/", cartRoutes);

// Error middleware
app.use(error);

export default app;