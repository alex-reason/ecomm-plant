import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
    categoryName: { type: String, required: true },
    parentCategory: {type: String, required: true},
    properties: Array
});

export const Category = models?.Category || model('Category', CategorySchema);