const SectionTitle = ({additionalClass, name}) => {
    return (
        <h5 className={`${additionalClass} bg-red-100 mx-1 my-1 width rounded-md text-xs font-medium`}>{name}</h5>
    )
};

export default SectionTitle;