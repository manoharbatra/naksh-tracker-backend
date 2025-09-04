import mongoose from "mongoose"

const classDataSchema = new mongoose.Schema(
    {
        date: { type: String, required: true }, // or Date if you prefer
        event: { type: String, required: true },
        place: { type: String, required: true },
        outcome: { type: String, required: true },
        link: { type: String, required: true },
        class: { type: Number, required: true },
    },
    { timestamps: true, collection: "class_data" }
)

const ClassData = mongoose.model("ClassData", classDataSchema)

export default ClassData;