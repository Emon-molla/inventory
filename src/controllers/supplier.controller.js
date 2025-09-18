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

export const getSupplier = async (req,res) =>{
    try {
        const suppliers = await Supplier.find()

        res.status(200).json({
            message:"All suppliers.",
            suppliers
        })
        
    } catch (error) {
        console.log("Internal server error",error)
    }
}

export const deleteSupplier = async (req,res) =>{
    try {
        const {id} = req.params

        const supplier = await Supplier.findByIdAndDelete(id)

        if(!supplier){
            return res.status(400).json({message:"spplier unidefind."})
        }

        return res.status({
            message:"supplier deleted successfully.",
            suppliername:supplier.name
        })
    } catch (error) {
        console.log("Internal server error",error)
    }
}