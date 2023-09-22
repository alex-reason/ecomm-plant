
import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
//firebase
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/pages/api/firebase/firebase";
// components and assets
import ProductForm from "@/components/ProductForm";
import Layout from "@/components/Layout";

const New = () => {
    const [imageListAll, setImageListAll] = useState([]);
    const [loading, setLoading] = useState(null)
    const imageListRef = ref(storage, "e-commerce-images");

    useEffect(() => {
        // get all images in firebase storage
        setLoading(true);
        setImageListAll([])
        const unsub = () => {
            listAll(imageListRef)
                .then(res => {
                    res.items.forEach((item) => {
                        getDownloadURL(item).then((url) => {
                            setImageListAll((prev) => [...prev, url])
                        })
                    })
                })

            setTimeout(() => setLoading(false), 2000)
        }
        return unsub
    }, []);

    return (
        <Layout>
            {loading
                ? <BeatLoader />
                : <ProductForm formName={'Add Product'} imageList={imageListAll} photosLabel="all photos in storage" />
            }
        </Layout>
    )
};

export default New;