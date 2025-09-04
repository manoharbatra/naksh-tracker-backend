// src/controllers/classDataController.js
import ClassData from "../models/ClassData.js"

// POST - Add new record
export const addClassData = async (req, res) => {
    try {
        const { class: classNum, date, event, place, outcome, link } = req.body

        // Validation (extra safeguard)
        if (!classNum || !date || !event || !place || !outcome || !link) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const newRecord = new ClassData({
            class: classNum,
            date,
            event,
            place,
            outcome,
            link,
        })

        const savedRecord = await newRecord.save()

        res.status(201).json({
            message: "Record added successfully",
            data: savedRecord,
        })
    } catch (error) {
        console.error("Error adding record:", error)
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

// GET - Fetch all records
export const getClassData = async (req, res) => {
    try {
        const records = await ClassData.find()
        res.json(records)
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}


export const updateClassDataById = async (req, res) => {
  try {
    const { id } = req.params; // Get _id from URL
    const updateData = req.body; // Fields to update from frontend

    // Find and update document
    const updatedClassData = await ClassData.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // return updated doc & run schema validations
    );

    if (!updatedClassData) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json({ message: "Data updated successfully", data: updatedClassData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// @desc    Delete a class data record by ID
// @route   DELETE /api/class-data/:id
// @access  Public
export const deleteClassDatabyId = async (req, res) => {
    try {
        // Log params and body to see what is coming from the UI
        const { id } = req.params

        // Find category by order
        const hasClassData = await ClassData.findById(id)

        if (!hasClassData) {
            return res.status(404).json({ message: "Data not found" })
        }

        await hasClassData.deleteOne()
        res.json({ message: "Data deleted" })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}
