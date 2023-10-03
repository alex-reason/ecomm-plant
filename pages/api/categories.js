import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        res.json(await Category.find());
    };

    if (method == 'PUT') {
        const { categoryName, parentCategory, properties, _id } = req.body;
        await Category.updateOne({ _id }, { categoryName, parentCategory, properties });
        res.json(true);
    };

    if (method === 'POST') {
        const { categoryName, parentCategory, properties } = req.body;
        const categoryDoc = await Category.create({
            categoryName,
            parentCategory,
            properties
        });
        res.json(categoryDoc);
    };

    if (method == 'DELETE') {
        if (req.query?.id) {
            await Category.deleteOne({ _id: req.query?.id });
            res.json(true);
        }
    };
};