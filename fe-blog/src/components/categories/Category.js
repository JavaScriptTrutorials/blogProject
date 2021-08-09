import {useState, useEffect} from 'react';
import {CreateCategoryModal} from './StyledCategoryList';
import { CategoryListStyle } from './CategoryListStyle';
//import CategoryList from './CategoryList';
import {connect} from 'react-redux';
import { subcategoriesSelector, isExpandedSelector} from "../../redux/category/categorySelectors";
import { removeExpandedCategories, addExpandedCategories } from '../../redux/category/categoryActions';

const Category = props => {

    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        if(props.isExpanded){
            setToggle(true);
        }
    }, [props.isExpanded]);
/*
    const handleAdd = (e) => {
        setToggleCreate(true);
        setContextMenu(false);
        e.stopPropagation();
    }
*/
    const handleExpandMore = (e) => {
        props.add(props.category._id);
        setToggle(!toggle);
        e.stopPropagation();
    };

    const handleExpandLess = (e) => {
        props.remove(props.category._id);
        setToggle(!toggle);
        e.stopPropagation();
    };

    const handleClick= (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'click') {
          console.log('Left click');
        } else if (e.type === 'contextmenu') {
          console.log('Right click');
          props.openSideMenu(props.category._id, e.pageX, e.pageY);
        }
      }

    return (
        <div onClick={(e) => handleClick(e)} onContextMenu={e => handleClick(e)}>
            
            {toggle?
                <span onClick={e => handleExpandLess(e)} className="material-icons">expand_less</span>:
                <span onClick={e => handleExpandMore(e)} className="material-icons">expand_more</span>
            }
            <span>{props.category.name}</span>

            {toggle && <CategoryListStyle categories={props.categoriesById} openSideMenu={props.openSideMenu}/>}
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