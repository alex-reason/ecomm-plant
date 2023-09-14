import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";

const EditProductPage = () => {
    const [productInfo, setProductInfo] = useState(null);

    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        axios.get('/api/products?id=' + id).then(response => {
            setProductInfo(response.data)
        })
    }, [id])

    return (
        <Layout>
            edit product
            {
                productInfo && <ProductForm formName={'Edit Product'} formValues={productInfo} productId={id} />
            }
        </Layout>
    )
};

export default EditProductPage;