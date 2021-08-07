import { fetchGetCategories } from "../../redux/category/categoryActions";
import CreateCategory from "./CreateCategory";
import {connect} from 'react-redux';
import { useEffect } from "react";
//import CategoryList from "./CategoryList";
import { categoriesSelector, subcategoriesSelector } from "../../redux/category/categorySelectors";

const Categories = ({category, get, categories, categoriesById}) => {

    useEffect(() => {
        get(null);
    }, [get]);

    return (
        <div>
            <h2>Categories</h2>
            {/*category.error !== ''? <p>{category.error}</p> : category.loading? <p>Loading...</p>:
            <div>
            <CategoryList categories={categoriesById}/>
            <br />
    <CategoryList categories={categoriesById}/></div>*/}
            <CreateCategory/>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        category: state.category,
        categories: categoriesSelector(state),
        categoriesById: subcategoriesSelector(state)(null)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        get: (data) => {dispatch(fetchGetCategories(data))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Categories);