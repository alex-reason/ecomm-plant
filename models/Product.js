import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    imageList: Array,
    category: { type: mongoose.Types.ObjectId, ref: "Category" }
});

export const Product = models.Product || model("Product", ProductSchema);