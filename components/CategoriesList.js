import { EditIcon, TrashIcon } from "@/assets/icons";

const CategoriesList = ({ categoriesList, handleEdit, handleDeleting, loading }) => {
    return (
        <div className="flex flex-col gap-2 mt-10">
            {categoriesList.length > 0 && !loading && categoriesList.map((item) => (
                <div key={item._id} className="categories-container">
                    <div className="grid grid-cols-3 gap-1 col-span-3 " >
                        <p className="font-medium">{item.categoryName}</p>
                        {item.parentCategory ? <p>({item.parentCategory})</p> : <p></p>}
                        {
                            item.properties?.length > 0
                                ?
                                <div className="flex flex-col">
                                    {item.properties.map(property => (
                                        <p key={property.name}>{property.name}: {property.values}</p>
                                    ))}
                                </div>
                                :
                                <p>no properties</p>
                        }
                    </div>
                    <div className="flex gap-1 md: block text-xs">
                        <button className="btn-default flex items-center" onClick={() => handleEdit(item)}>
                            <EditIcon classname={"w-4 h-6"} />
                            Edit
                        </button>
                        <button className="btn-default flex items-center text-xs" onClick={() => handleDeleting(item)}>
                            <TrashIcon classname={"w-4 h-6"} />
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CategoriesList