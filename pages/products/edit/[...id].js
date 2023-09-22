import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
// components and assets
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
    }, [id]);

    return (
        <Layout>
            {productInfo &&
                <ProductForm
                    formName={'Edit Product'}
                    imageList={productInfo.imageList || []}
                    formValues={productInfo}
                    productId={id}
                    photosLabel="photos for product"
                />
            }
        </Layout>
    )
};

export default EditProductPage;