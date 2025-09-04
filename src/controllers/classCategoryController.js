import ClassCategory from "../models/ClassCategory.js"

// @desc    Get user selected class categories
// @route   GET /api/class-categories
// @access  Public
export const getClassCategories = async (req, res) => {
    try {
        const categories = await ClassCategory.find().sort({ order: 1 })
        res.json(categories)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

// @desc    Create a new class category
// @route   POST /api/class-categories
// @access  Public
export const addClassCategory = async (req, res) => {
    try {
        const { name, order } = req.body

        const exists = await ClassCategory.findOne({ name })
        if (exists) {
            return res.status(400).json({ message: "Category already exists" })
        }

        const orderExists = await ClassCategory.findOne({ order })
        if (orderExists) {
            return res
                .status(400)
                .json({ message: "Order number already in use" })
        }

        const category = new ClassCategory({ name, order })
        await category.save()
        res.status(201).json(category)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

// @desc    Delete a class category (only if no data linked)
// @route   DELETE /api/class-categories/:id
// @access  Public
export const deleteClassCategory = async (req, res) => {
    try {
        // Log params and body to see what is coming from the UI
        const { order } = req.params

        // Find category by order
        const category = await ClassCategory.findOne({ order })

        if (!category) {
            return res.status(404).json({ message: "Category not found" })
        }

        // ✅ TODO: check if rows exist for this category before deleting
        // Example:
        // const rows = await Row.find({ categoryId: category._id });
        // if (rows.length > 0) {
        //   return res.status(400).json({ message: "Cannot delete category with rows" });
        // }

        await category.deleteOne()
        res.json({ message: "Category deleted" })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}
