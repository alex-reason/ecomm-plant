import { useState } from "react";
import Layout from "@/components/Layout";

const defaultFormValues = {
    title: '',
    description: '',
    price: ''
}
const New = () => {
    const [newProduct, setNewProduct] = useState(defaultFormValues);
    const onCreateProduct = () => {}

    return (
        <Layout>
            <h1>New Product</h1>
            <form onSubmit={onCreateProduct}>
                <div className="flex flex-col">
                    <label>Product Name</label>
                    <input className="mb-2" type="text" placeholder="product name" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />
                    <label>Description</label>
                    <textarea placeholder="product description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
                    <label>Price in USD </label>
                    <input className="mb-2" type="text" placeholder="price" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
                </div>
                <button type="submit" className="btn-primary">Save</button>
            </form>
            <p>{newProduct.title}</p>
        </Layout>
    )
};

export default New;