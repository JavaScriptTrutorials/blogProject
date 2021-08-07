import {useState, useEffect} from 'react';
import {CreateCategoryModal} from './StyledCategoryList';
import { CategoryListStyle } from './CategoryListStyle';
//import CategoryList from './CategoryList';
import {connect} from 'react-redux';
import { subcategoriesSelector, isExpandedSelector} from "../../redux/category/categorySelectors";
import { removeExpandedCategories, addExpandedCategories } from '../../redux/category/categoryActions';

const Category = props => {

    const [toggle, setToggle] = useState(false);
    const [toggleCreate, setToggleCreate] = useState(false);

    useEffect(() => {
        if(props.isExpanded){
            setToggle(true);
        }
    }, [])

    const handleAdd = () => {
        setToggleCreate(true);
    }

    const handleExpandMore = () => {
        props.add(props.category._id);
        setToggle(!toggle);
    };

    const handleExpandLess = () => {
        props.remove(props.category._id);
        setToggle(!toggle);
    };

    return (
        <div>
            {toggle?
                <span onClick={handleExpandLess} className="material-icons">expand_less</span>:
                <span onClick={handleExpandMore} className="material-icons">expand_more</span>
            }
            {toggleCreate?
                <CreateCategoryModal display='block' displayToggle={setToggleCreate} parentCategory={props.category._id}/>:
                <CreateCategoryModal displayToggle={setToggleCreate} parentCategory={props.category._id}/>
            }
            <span>{props.category.name}</span>
            <span className="material-icons" onClick={handleAdd}>add</span>

            {toggle && <CategoryListStyle categories={props.categoriesById}/>}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        categoriesById: subcategoriesSelector(state)(ownProps.category._id),
        isExpanded: isExpandedSelector(state)(ownProps.category._id)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        add: (id) => dispatch(addExpandedCategories(id)),
        remove: id => dispatch(removeExpandedCategories(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);