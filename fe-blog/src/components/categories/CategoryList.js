import Category from './Category';

const CategoryList = (props) => {
    const {categories} = props;


    return (
        <div className={props.className}  /*style={{paddingLeft: '20px'}}*/>
            
        {categories.map(category => {
            return (
                <div key={category._id}>
                    <Category category={category} openSideMenu={props.openSideMenu}/>
                </div>
            )
        })}
        </div>
    );
};

export default CategoryList;