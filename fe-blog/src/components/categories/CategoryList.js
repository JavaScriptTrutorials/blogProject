const CategoryList = ({categories}) => {
    return (
        <div>
        {categories.map(category => {
            return (
                <div key={category._id}>
                    <h3>{category.name}</h3>
                    <p>Number of posts: {category.posts.length}</p>
                    <p>Created: {category.createdAt}</p>
                </div>
            )
        })}
        </div>
    );
};

export default CategoryList;