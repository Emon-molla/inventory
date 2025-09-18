import express from "express"
import { createSupplier } from "../controllers/supplier.controller.js"

const router = express.Router()

router.post("/create-supplier", createSupplier)

export default router