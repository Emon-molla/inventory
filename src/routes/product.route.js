import express from "express"
import { addProduct, daleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();

// router.use(auth)
router.post('/add-product',roleMiddleware(['admin']),addProduct)
router.get('/get-products',getProducts)
router.put('/update-product/:id',roleMiddleware(["admin","manager"]),updateProduct)
router.post('/delete-product/:id',roleMiddleware(["admin","manager"]),daleteProduct)

export default router;