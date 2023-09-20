import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from '@/components/Layout';

const DeleteProductPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return
        };
        axios.get(`/api/products?id=${id}`).then(response => {
            setProductInfo(response.data);
        })
    }, [id]);

    const handleGoBack = () => {
        router.push('/products');
    };

    const handleDelete = async () => {
        await axios.delete(`/api/products/?id=${id}`);
        handleGoBack()
    }

    return (
        <Layout>
            {productInfo &&
                <div className="mt-2">
                    <h1 className="text-center">Do you want to delete product &quot;{productInfo.title}?&quot;</h1>
                    <div className="flex gap-2 mt-2 justify-center">
                        <button className="btn-red" onClick={handleDelete}>Yes</button>
                        <button className="btn-default" onClick={handleGoBack}>No</button>
                    </div>
                </div>
            }
        </Layout>
    )
};

export default DeleteProductPage;