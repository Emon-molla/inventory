import express from "express"
import { createSale, deleteAllSale, deleteSale, getSales } from "../controllers/sale.controller.js"
import { roleMiddleware } from "../middlewares/role.middleware.js"

const router = express.Router()

router.post("/create-sale",roleMiddleware(["admin","staff","manager"]),createSale)
router.get("/sales",roleMiddleware(["admin","staff","manager"]),getSales)
router.post("/sale-delete/:id",roleMiddleware(["admin","manager"]),deleteSale)
router.post("/sale-delete-all/",roleMiddleware(["admin"]),deleteAllSale)

export default router