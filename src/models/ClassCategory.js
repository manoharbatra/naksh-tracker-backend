import mongoose from "mongoose";

const classCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true, collection: "class_categories" }
);

const ClassCategory = mongoose.model("ClassCategory", classCategorySchema);

export default ClassCategory;
