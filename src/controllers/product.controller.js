import { Product } from "../models/product.model.js";

export const addProduct = async(req,res)=>{
    const {name,price,quantity,category} = req.body;

    try {
       if(!name || !price || !quantity || !category) {
        return res.status(400).json({message:"All fields are required."})
       }

       const newProduct = new Product({
        name,
        quantity,
        price,
        category
       })

       await newProduct.save()

       return res.status(200).json({
        success:true,
        product:newProduct
       })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error."})
    }
}

export const getProducts = async(req,res) =>{
    try {
        const products = await Product.find()
        return res.status(200).json(products)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error."})
    }
}

export const updateProduct = async (req,res)=>{
    const {id} = req.params;
    try {
        const product = await Product.findByIdAndUpdate(id,req.body,{new:true})
        if(!product){
            return res.status(400).json({message:"Product not found."})
        };

        return res.status(200).json({success:true,product})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error."})
    }
}

export const daleteProduct = async (req,res) =>{
    const {id} = req.params;
    try {
      const product = await Product.findByIdAndDelete(id);

      if(!product){
        return res.status(400).json({message:"Product not found."});
      }

      return res.status(200).json({success:true,message:"product deleted successfully."})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error."})
    }
}