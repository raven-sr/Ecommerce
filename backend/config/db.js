import mongoose from "mongoose";

export const connect_DB=()=>{mongoose.connect(process.env.db_url).then((data)=>{
    console.log("DB is connected:",data.connection.host)
})
}