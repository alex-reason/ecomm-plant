import Layout from "@/components/Layout";
import Link from "next/link";

const Products = () => {
    return (
        <Layout>
            <Link href={'/products/new'} className="bg-orange-700 text-white py-1 px-2 rounded-md">Add a product</Link>
        </Layout>
    )
};

export default Products;