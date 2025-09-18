import mongoose, { Schema } from "mongoose";

const supplierSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    contact:{
        type:String
    },
    address:{
        type:String
    }
},{timestamps:true})

export const Supplier = mongoose.model("Supplier",supplierSchema)