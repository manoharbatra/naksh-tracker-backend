import express from "express"
import { addClassData, getClassData, updateClassDataById, deleteClassDatabyId } from "../controllers/classDataController.js"

const router = express.Router()

router.post("/", addClassData) // Add new record
router.get("/", getClassData) // Fetch all records
router.put("/:id", updateClassDataById);
router.delete("/:id", deleteClassDatabyId) // delete

export default router