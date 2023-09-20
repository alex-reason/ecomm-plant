import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/pages/api/firebase/firebase";
import { v4 } from "uuid";
import fallbackSrc from '../assets/nomad-hair-grey-bun.png';

const defaultFormValues = {
    title: '',
    description: '',
    price: ''
};

const ProductForm = ({ formName, formValues = defaultFormValues, imageList, productId = null}) => {
    const [newProduct, setNewProduct] = useState(formValues);
    const [redirectToProducts, setRedirectToProducts] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imagesToDisplay, setImagesToDisplay] = useState(imageList);

    const router = useRouter();

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        if (productId) {
            // edit existing product
            await axios.put('/api/products', { ...newProduct, imageList:imagesToDisplay, _id: productId }).then(setRedirectToProducts(true));
        }
        else {
            // create new product
            await axios.post('/api/products', { ...newProduct, imageList:imagesToDisplay }).then(setRedirectToProducts(true));
        };
        setRedirectToProducts(true);
    };

    const handleUploadImage = async () => {
        if (uploadedImage == null) return;
        const imageRef = ref(storage, `e-commerce-images/${uploadedImage?.name + v4()}`);
        uploadBytes(imageRef, uploadedImage).then(snapshot => {
            // to make sure that the newly uploaded image will readily show in image list
            getDownloadURL(snapshot.ref).then((url) => {
                setImagesToDisplay((prev) => [...prev, url]);
            });
        })
    };

    if (redirectToProducts) {
        router.push('/products')
    };

    return (
        <>
            <h1>{formName}</h1>
            <form onSubmit={handleCreateProduct}>
                <div className="flex flex-col">

                    {/* product name */}
                    <label>Product Name</label>
                    <input className="mb-2" type="text" placeholder="product name" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />
                    <label>Photos</label>

                    <div className="mb-2">
                        <label className="w-24 h-24 text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            {/* <p>Upload</p> */}
                            <input type="file" onChange={e => setUploadedImage(e.target?.files[0])} className="hidden" />

                        </label>
                        <p onClick={handleUploadImage} className="cursor-pointer">Upload</p>

                        <div className="flex flex-wrap gap-2">
                            {imagesToDisplay && imagesToDisplay.map(item => (
                              <img src={item || fallbackSrc} key={item} className="w-auto h-20 rounded-lg" alt='uploaded photo' />
                            ))}
                        </div>
                    </div>

                    {/* description */}
                    <label>Description</label>
                    <textarea placeholder="product description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />

                    {/* price*/}
                    <label>Price in USD </label>
                    <input className="mb-2" type="number" placeholder="price" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />

                </div>
                <button type="submit" className="btn-default">Save</button>
            </form>
        </>
    )
};

export default ProductForm;