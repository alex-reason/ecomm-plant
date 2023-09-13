import { useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

const defaultFormValues = {
    title: '',
    description: '',
    price: ''
};

const ProductForm = ({ formName, formValues = defaultFormValues, productId = null }) => {
    const [newProduct, setNewProduct] = useState(formValues);
    const [redirectToProducts, setRedirectToProducts] = useState(false);
    const router = useRouter();

    const onCreateProduct = async (e) => {
        e.preventDefault();
        if (productId) {
            // edit existing product
            await axios.put('/api/products', { ...newProduct, _id: productId }).then(setRedirectToProducts(true));
        }
        else {
            // create new product
            await axios.post('/api/products', newProduct).then(setRedirectToProducts(true));
        };
        setRedirectToProducts(true);
    };

    if (redirectToProducts) {
        router.push('/products')
    };

    return (
        <>
            <h1>{formName}</h1>
            <form onSubmit={onCreateProduct}>
                <div className="flex flex-col">
                    <label>Product Name</label>
                    <input className="mb-2" type="text" placeholder="product name" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />
                    <label>Description</label>
                    <textarea placeholder="product description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
                    <label>Price in USD </label>
                    <input className="mb-2" type="number" placeholder="price" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
                </div>
                <button type="submit" className="btn-primary">Save</button>
            </form>
        </>
    )
};

export default ProductForm;