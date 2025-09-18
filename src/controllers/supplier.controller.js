import { Supplier } from "../models/supplier.model.js";


export const createSupplier = async (req,res) =>{
    const {name,contact,address} = req.body;
    try {
        if(!name || !contact || !address){
            return res.status(400).json({message:"All fields are required."})
        }

        const supplier = new Supplier({
            name,
            contact,
            address
        });

        await supplier.save()

        return res.status({
            message:"Supplier created successfully.",
            supplier
        })
    } catch (error) {
        console.log("Internal server error",error)
    }
}