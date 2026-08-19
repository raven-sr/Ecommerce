import app from "./app.js"
import env from "dotenv"
import { connect_DB } from "./config/db.js"


env.config({path:"./config/config.env"})
const port=process.env.PORT || 3000

connect_DB()

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

process.on("uncaughtException",(err)=>{
    console.log(err.message)
    console.log("Http server and Node Server is shutting down due to unCaught Exception " )
    process.exit(1)
}) 



const server = app.listen(port, "0.0.0.0",()=>{
    console.log(`server is running in http:localhost:${port}`)
})

//Unhandled Exception
process.on("unhandledRejection",(err)=>{
    console.log(err.message)
    console.log("Http server and Node Server is shutting down due to unhandledRejection " )

    server.close(()=>{
        process.exit(1)
    })
})