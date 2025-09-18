import mongoose, { Schema } from "mongoose";

const saleSchema = new Schema({
    customerName:{
        type:String,
        required:true
    },
    items:[
        {
            product:{
                type:mongoose.Types.ObjectId,
                ref:"Product"
            },
            qty:Number,
            price:Number
        }
    ],
    totalAmount:{
        type:Number
    }
},{timestamps:true})

export const Sale = mongoose.model("Sale",saleSchema)