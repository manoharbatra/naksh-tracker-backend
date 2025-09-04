import { body } from "express-validator";

export const addClassCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim(),

  body("order")
    .notEmpty()
    .withMessage("Order is required")
    .isInt({ min: 1 })
    .withMessage("Order must be a positive integer"),
];