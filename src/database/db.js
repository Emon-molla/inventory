import mongoose from "mongoose";

export const connection = async()=>{
    try {
        const conn = await mongoose.connect(process.env.DB_URL)
        console.log(`Mongodb connected successfully on :${conn.connection.host}`)
    } catch (error) {
        console.log('Mongodb connection faild.',error)
    }
}