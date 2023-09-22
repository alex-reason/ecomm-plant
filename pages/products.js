import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
// components and assets
import { EditIcon, TrashIcon } from "@/assets/icons";
import Layout from "@/components/Layout";

const Products = () => {
    const [productsList, setProductsList] = useState([]);
    const productListLinkStyle = "bg-gray-200 text-black text-sm mx-1 py-1 px-2 rounded-lg gap-1 flex items-center hover:bg-orange-700 hover:text-white";

    useEffect(() => {
        axios.get('/api/products').then(response => {
            setProductsList(response.data);
        })
    }, []);

    return (
        <Layout>
            <Link href={'/products/new'} className="bg-green-600 text-white py-1 px-2 rounded-md">Add a product</Link>
            <div className="flex flex-col">
                <div className="w-1/2">
                    <div className="flex justify-between my-3 items-center">
                        <h3 className="bg-red-100 px-1 my-1 width">Product name</h3>
                    </div>
                    {productsList && productsList.map(productItem => (
                        <div key={productItem._id} className="flex justify-between my-3 items-center">
                            <p >{productItem?.title}</p>
                            <div className="flex">
                                <Link className={productListLinkStyle} href={`/products/edit/${productItem._id}`}>
                                    <EditIcon classname={"w-4 h-6"} />
                                    Edit
                                </Link>
                                <Link className={productListLinkStyle} href={`/products/delete/${productItem._id}`}>
                                    <TrashIcon classname={"w-4 h-6"} />
                                    Delete
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
};

export default Products;