
import { useState, useEffect } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/pages/api/firebase/firebase";
import ProductForm from "@/components/ProductForm";
import Layout from "@/components/Layout";

const New = () => {
    const [imageListAll, setImageListAll] = useState([]);
    const [loading, setLoading] = useState(false)
    const imageListRef = ref(storage, "e-commerce-images");

    useEffect(() => {
        setImageListAll([]);
        setLoading(true);
        // get all images in firebase storage
        const unsub = async () => {
            await listAll(imageListRef)
                .then(res => {
                    res.items.forEach((item) => {
                        getDownloadURL(item).then((url) => {
                            setImageListAll((prev) => [...prev, url])
                        })
                        .then(setLoading(false))
                    })
                })
        }
        return unsub
    }, [])

    return (
        <Layout>
            {loading ? <p>Loading</p> : <ProductForm formName={'Add Product'} imageList={imageListAll} />}
        </Layout>
    )
};

export default New;