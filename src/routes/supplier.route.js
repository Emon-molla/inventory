import express from "express"
import { createSupplier, getSupplier } from "../controllers/supplier.controller.js"
import { roleMiddleware } from "../middlewares/role.middleware.js"

const router = express.Router()

router.post("/create-supplier",roleMiddleware(["admin","manager"]), createSupplier)
router.get("/suppliers",roleMiddleware(["admin","manager","staff"]), getSupplier)

export default router