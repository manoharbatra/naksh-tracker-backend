import express from "express"
import {
    addClassCategory,
    getClassCategories,
    deleteClassCategory,
} from "../controllers/classCategoryController.js"
import {
    addClassCategoryValidator,
} from "../validators/classCategoryValidator.js"
import { validate } from "../middlewares/validate.js"

const router = express.Router()

router.post("/", addClassCategoryValidator, validate, addClassCategory) // create
router.get("/", getClassCategories) // get all user-selected categories
router.delete("/:order", deleteClassCategory) // delete

export default router
