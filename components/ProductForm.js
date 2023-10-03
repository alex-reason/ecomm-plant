import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { v4 } from "uuid";
import axios from "axios";
//firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/pages/api/firebase/firebase";
// components and assetss
import { UploadIcon } from "@/assets/icons";

const defaultFormValues = { title: '', description: '', price: '', category: '' };

const ProductForm = ({ formName, formValues = defaultFormValues, imageList, productId = null, photosLabel = '' }) => {
    const [newProduct, setNewProduct] = useState(formValues);
    const [redirectToProducts, setRedirectToProducts] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [newImages, setNewImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const handleFetch = async () => {
            axios.get('/api/categories').then(response => {
                setCategories(response.data);
            })
        };
        return handleFetch;
    }, []);

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        if (productId) {
            await axios.put('/api/products', { ...newProduct, imageList: [...imageList, ...newImages], _id: productId }).then(setRedirectToProducts(true));
        }
        else {
            await axios.post('/api/products', { ...newProduct, imageList: newImages }).then(setRedirectToProducts(true));
        };
        setRedirectToProducts(true);
    };

    const handleUploadImage = async () => {
        if (uploadedImage == null) return;
        const imageRef = ref(storage, `e-commerce-images/${uploadedImage?.name + v4()}`);
        uploadBytes(imageRef, uploadedImage).then(snapshot => {
            getDownloadURL(snapshot.ref).then((url) => {
                setNewImages((prev) => [...prev, url]);
            });
        })
    };

    if (redirectToProducts) {
        router.push('/products')
    };

    const propertiesToFill = []
    if (categories.length > 0 && newProduct.category) {
        const selectedCategoryInfo = categories.find(({ _id }) => _id === newProduct.category);
        propertiesToFill.push(...selectedCategoryInfo.properties)
    }

    console.log(propertiesToFill)

    return (
        <>
            <h1>{formName}</h1>
            <form onSubmit={handleCreateProduct}>
                <div className="flex flex-col">
                    {/* product name */}
                    <label>Product Name</label>
                    <input
                        className="mb-2"
                        type="text"
                        placeholder="product name"
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                    />

                    {/* categories */}
                    <label>Category</label>
                    <select
                        className="mb-2"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    >
                        <option value="">uncategorized</option>
                        {categories.length > 0 && categories.map((item => (
                            <option key={item._id} value={item._id}>{item.categoryName}</option>
                        )))}
                    </select>
                    {/* properties */}
                    {propertiesToFill.length > 0 && propertiesToFill.map(property =>
                        (<p key={property.name}>{property.name}: {property.values}</p>)
                    )}

                    {/* photos */}
                    <div className="mb-2 flex flex-col">
                        <div className="flex items-center mb-3">
                            <label className="w-10 h-10 text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200 cursor-pointer mr-3">
                                <UploadIcon classname={"w-6 h-6"} />
                                <input type="file" onChange={e => setUploadedImage(e.target?.files[0])} className="hidden" />
                            </label>
                            {uploadedImage && <p className="mr-3 text-gray-300">{uploadedImage?.name}</p>}
                            <p onClick={handleUploadImage} className="border-2 border-orange-700 rounded-lg px-2 cursor-pointer">Confirm Upload</p>
                        </div>
                        <p>{photosLabel}</p>
                        <div className="flex flex-wrap gap-2">
                            {imageList && imageList.map(item => (
                                <img src={item} key={item} className="w-auto h-20 rounded-lg" alt='uploaded photo' />
                            ))}
                        </div>
                        {newImages?.length > 0 &&
                            <div>
                                <p>new photos</p>
                                {newImages?.length > 0 && newImages.map(item => (
                                    <img src={item} key={item} className="w-auto h-20 rounded-lg" alt='uploaded photo' />
                                ))}
                            </div>
                        }
                    </div>

                    {/* description */}
                    <label>Description</label>
                    <textarea
                        placeholder="product description"
                        value={newProduct.description}
                        onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                    />

                    {/* price*/}
                    <label>Price in USD </label>
                    <input
                        className="mb-2"
                        type="number" placeholder="price"
                        value={newProduct.price}
                        onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn-default">Save</button>
            </form>
        </>
    )
};

export default ProductForm;