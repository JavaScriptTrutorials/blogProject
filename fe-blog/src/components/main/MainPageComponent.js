import { MainPage, Menu, MainContent } from "./MainPageStyles";
import { fetchGetCategories } from "../../redux/category/categoryActions";
//import CreateCategory from "../categories/CreateCategory";
import {CreateCategoryModal} from '../categories/StyledCategoryList';
import {connect} from 'react-redux';
import { useEffect, useState } from "react";
import CategoryList from "../categories/CategoryList";
//import { CategoryListStyle } from "../categories/CategoryListStyle";
import { categoriesSelector, subcategoriesSelector, errorSelector } from "../../redux/category/categorySelectors";


const MainPageComponent = (props) => {
    const {category, categoriesById, get} = props;

    useEffect(() => {
        get(null);
    }, [get]);

    const [toggle, setToggle] = useState(false);

    return (
        <MainPage>
            <div className="container">
                {toggle?<CreateCategoryModal display='block' displayToggle={setToggle}/>:<CreateCategoryModal displayToggle={setToggle}/>}
            <Menu className='menu'>
            <h2>Categories</h2>
            <button onClick={() => setToggle(!toggle)}>Add new category</button>
            {props.error !== ''? <p>{props.error}</p> : category.loading? <p>Loading...</p>:
                <CategoryList categories={categoriesById}/>
            }
            </Menu>
            <MainContent className='main'>
                <p>main</p>
                <p>main</p>
                <p>main</p>
                <p>main</p>
                <p>main</p>
                <p>main</p>
                <p>main</p>
                <p>main</p>
                <p>main</p>
                <p>main</p>
            </MainContent>
            </div>
        </MainPage>
    );
};

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        category: state.category,
        error: errorSelector(state),
        categories: categoriesSelector(state),
        categoriesById: subcategoriesSelector(state)(null)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        get: (data) => {dispatch(fetchGetCategories(data))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPageComponent);