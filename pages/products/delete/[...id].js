import { useRouter } from "next/router";
import axios from "axios";
import Layout from '@/components/Layout';

const DeleteProductPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const handleGoBack = () => {
        router.push('/products');
    }
    return (
        <Layout>
            <div className="flex flex-col items-start">
                <p>Do you want to delete product {id}?</p>
                <button>Yes</button>
                <button onClick={handleGoBack}>No</button>
            </div>
        </Layout>
    )
}

export default DeleteProductPage;