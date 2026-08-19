import express from "express"
import productRoutes from "./routes/routes.js"
import userRoutes from "./routes/userroutes.js"
import orderRoutes from "./routes/orderroutes.js"
import cartRoutes from "./routes/cartroute.js"
import error from "./middleware/middleware.js"
import CookieParser from "cookie-parser"

const app = express()

app.use(express.json());
app.use(CookieParser());

app.use("/api/v1/",productRoutes);
app.use("/api/v1/",userRoutes);
app.use("/api/v1/",orderRoutes);
app.use("/api/v1/", cartRoutes);

app.use(error);


export default app