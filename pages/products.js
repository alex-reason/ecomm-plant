import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
// components and assets
import { EditIcon, TrashIcon } from "@/assets/icons";
import Layout from "@/components/Layout";

const Products = () => {
    const [productsList, setProductsList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [loading, setLoading] = useState(null)
    const productListLinkStyle = "bg-gray-200 text-black text-sm mx-1 py-1 px-2 rounded-lg gap-1 flex items-center hover:bg-orange-700 hover:text-white";

    useEffect(() => {
        setLoading(true)
        axios.get('/api/products').then(response => {
            setProductsList(response.data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        setLoading(true)
        axios.get('/api/categories').then(response => {
            setCategoriesList(response.data);
            setLoading(false);
        })
    }, []);

    return (
        <Layout>
            <Link href={'/products/new'} className="bg-green-600 text-white py-1 px-2 rounded-md">Add a product</Link>

            {loading ? <BeatLoader className="mt-3" /> :
                <div className="grid lg:grid-cols-4 sm:grid-cols-1 gap-x-3 px-5">
                    {
                        productsList.map(productItem => (
                            <div key={productItem._id} className="grid grid-rows-4 mt-3 p-2 gap-1 items-start box-shadow rounded-md ">
                                <div className="flex flex-col gap-2 px-2 items-between row-span-3">
                                    <p className="col-span-1 font-medium uppercase">{productItem?.title}</p>
                                    {productItem?.imageList.length > 0 && productItem.imageList.map(image => (
                                        <img src={image} key={image} className="rounded-md w-20 h-20 object-cover" />
                                    ))}
                                    <p>${productItem?.price}</p>
                                    <p className="text-xs">{productItem?.description}</p>
                                    <p>
                                        {categoriesList.find((category) => category._id === productItem.category)?.categoryName}
                                    </p>
                                    <p className="text-xs italic text-gray-400">
                                        ({categoriesList.find((category) => category._id === productItem.category)?.parentCategory})
                                    </p>
                                </div>
                                <div className="flex pb-2">
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
                        ))
                    }
                </div>
            }

        </Layout >
    )
};

export default Products;