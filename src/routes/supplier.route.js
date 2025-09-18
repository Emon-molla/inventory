import express from "express"
import { createSupplier, deleteSupplier, getSupplier } from "../controllers/supplier.controller.js"
import { roleMiddleware } from "../middlewares/role.middleware.js"

const router = express.Router()

router.post("/create-supplier",roleMiddleware(["admin","manager"]), createSupplier)
router.get("/suppliers",roleMiddleware(["admin","manager","staff"]), getSupplier)
router.post("/supplier-delete/:id",roleMiddleware(["admin","manager"]), deleteSupplier)

export default router