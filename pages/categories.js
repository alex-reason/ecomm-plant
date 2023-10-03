import { useState, useEffect } from "react";
import axios from "axios";
// components and assets
import Layout from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import CategoriesList from "@/components/CategoriesList";

const Categories = () => {
    const [loading, setLoading] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategory, setParentCategory] = useState("None");
    const [categoriesList, setCategoriesList] = useState([]);
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    const [properties, setProperties] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const parentCategories = ["None", "Beginner Plants", "Intermediate", "Plant Parents"];

    useEffect(() => {
        setLoading(true);
        handleFetch();
    }, []);

    const handleFetch = () => {
        axios.get('/api/categories').then(response => {
            setCategoriesList(response.data);
            setLoading(false);
        })
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const data = { categoryName, parentCategory, properties }
        if (categoryName.length <= 0) {
            return
        }
        if (categoryToEdit) {
            await axios.put('/api/categories', { ...data, _id: categoryToEdit._id }).then(setCategoryToEdit(null));
        } else {
            await axios.post('/api/categories', data);
        }
        setCategoryName('');
        setProperties([])
        handleFetch();
    };

    const handleEdit = async (category) => {
        setCategoryToEdit(category);
        setCategoryName(category.categoryName);
        setParentCategory(category.parentCategory || "0");
        setProperties(category?.properties || [])
    };

    const handleDeleting = (category) => {
        setIsDeleting(true);
        setCategoryToEdit(category);
        setCategoryName('');
        setParentCategory("None")
    };

    const handleCancel = () => {
        setCategoryToEdit(null);
        setIsDeleting(false);
        setCategoryName('');
        setParentCategory("None");
        setProperties([]);
    };

    const handleConfirmDelete = async () => {
        await axios.delete(`/api/categories/?id=${categoryToEdit._id}`).then(() => {
            setIsDeleting(false);
            setCategoryToEdit(null);
            handleFetch();
        });
    };

    const handleAddProperty = () => {
        setProperties(prev => {
            return [...prev, { name: '', values: '' }]
        })
    };

    const handlePropertyNameChange = (index, property, newName) => {
        setProperties(prev => {
            const currProperties = [...prev];
            currProperties[index].name = newName;
            return currProperties
        })
    };

    const handlePropertyValuesChange = (index, property, newValues) => {
        setProperties(prev => {
            const currProperties = [...prev];
            currProperties[index].values = newValues;
            return currProperties
        })
    };

    const handleRemoveProperty = (indexToRemove) => {
        setProperties(prev => {
            return [...prev].filter((p, pi) => (pi !== indexToRemove))
        })
    };

    return (
        <Layout>
            <h1>Categories</h1>

            <form className="flex flex-col items-start gap-1" onSubmit={handleSave}>
                <label>{categoryToEdit ? 'Edit Category' : 'New Category'}  </label>
                <div className="flex gap-1">
                    <input
                        type="text"
                        className="mb-0"
                        placeholder="Category Name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <select value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}>
                        {parentCategories.map((p) => (
                            <option value={p} key={p}>{p}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block">Properties</label>
                    <button type="button" className="btn-secondary text-sm mb-3 " onClick={handleAddProperty}>add property</button>
                </div>
                {properties.length > 0 && properties.map((property, index) => (
                    <div key={`${index}-properties`} className="flex gap-1">
                        <input
                            placeholder="property name (eg. color)"
                            value={property.name}
                            onChange={(e) => handlePropertyNameChange(index, property, e.target.value)}
                        />
                        <input
                            placeholder="values (separate by commas)"
                            value={property.values}
                            onChange={(e) => handlePropertyValuesChange(index, property, e.target.value)}
                        />
                        <button type="button" onClick={() => handleRemoveProperty(index)} className="btn-secondary">
                            Remove
                        </button>
                    </div>
                ))}
                <div className="flex gap-1">
                    
                    <button type="submit" className="btn-default py-1">save</button>
                    {categoryToEdit && <button type="button" className="btn-secondary" onClick={handleCancel}>cancel</button>}
                </div>
            </form>

            <SectionTitle names={"Category Name"} />

            {isDeleting
                ? (
                    <div className="text-center p-3">
                        <p>Delete <span className="font-medium">{categoryToEdit.categoryName}</span> from category list?</p>
                        <button className="btn-default mr-3" onClick={handleConfirmDelete}>Yes </button>
                        <button className="btn-red" onClick={handleCancel}>No</button>
                    </div>
                )
                : categoryToEdit ?
                    <></>
                    :
                    (
                        <CategoriesList
                            categoriesList={categoriesList}
                            handleDeleting={handleDeleting}
                            handleEdit={handleEdit} loading={loading}
                            parentCategories={parentCategories}
                        />
                    )
            }
        </Layout>
    )
};

export default Categories;