import { Product } from "../models/product.model.js";
import { Sale } from "../models/sale.model.js";


export const createSale = async (req,res) =>{
    try {
       const {customerName,items}  = req.body;

       let totalAmount = 0

       for (let i of items){
        const product = await Product.findById(i.product)

        if(!product || product.quantity < i.qty){
            return res.status(400).json({message:`not enough stock for ${product?.name}`})
        }

        product.quantity -= i.qty
        
        await product.save()

        totalAmount += i.price * i.qty
       }

       const sale = new Sale({
        customerName,
        items,
        totalAmount:totalAmount
       })

       await sale.save()

       return res.status(200).json({
        message:"Sale created successfully",
        sale
       })
    } catch (error) {
        console.log("Internal server error",error)
    }
}

export const getSales = async (req,res) =>{
    try {
      const sales = await Sale.find()
      res.status(200).json({
        message:"All sales",
        sales
      })  
    } catch (error) {
        console.log("Internal server error",error)
    }
}

export const deleteSale = async (req,res) =>{
    try {
        const {id} = req.params

        const sale = await Sale.findByIdAndDelete(id)

        if(!sale){
            return res.status(400).json({message:"Invalid sales id."})
        }

        return res.status(200).json({
            message:"sales information deleted successfully.",
            customerName:sale.customerName
        })
        
    } catch (error) {
        console.log("Internal server error",error)
    }
}

export const deleteAllSale = async (req,res) =>{
    try {
       await Sale.deleteMany()
       
       res.status(200).json({message:"All sales data is deleted."})
    } catch (error) {
        console.log("Internal server error",error)
    }
}