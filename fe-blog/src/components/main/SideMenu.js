import { CategoryListStyle } from "../categories/CategoryListStyle";
import { connect } from "react-redux";
import { categoriesSelector, subcategoriesSelector, errorSelector } from "../../redux/category/categorySelectors";
import { fetchGetCategories } from "../../redux/category/categoryActions";
import { useEffect, useState } from "react";
import RClickMenu from "../rClickMenu/RClickMenu";
import { CreateCategoryModal } from "../categories/StyledCategoryList";

const SideMenu = props => {

    const {category, categoriesById, get} = props;

    const [toggleCreate, setToggleCreate] = useState(false);

    const [contextMenu, setContextMenu] = useState(false);
    const [pageXY, setPageXY] = useState([null, null]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const openSideMenu = (id, x, y) => {
        console.log(id, x, y);
        setContextMenu(true);
        setSelectedCategory(id);
        setPageXY([x,y]);
    };

    useEffect(() => {
        get(null);
    }, [get]);

    const handleAdd = (e) => {
        setToggleCreate(true);
        setContextMenu(false);
        e.stopPropagation();
    }

    const handleClick = e => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'contextmenu') {
          console.log('Right click');
          openSideMenu(null, e.pageX, e.pageY);
        }
    };


    return (
        <div className={props.className} onContextMenu={e => handleClick(e)}>
            {contextMenu &&
                <RClickMenu position={pageXY} selectedCategory={selectedCategory} setContextMenu={setContextMenu}>
                    <RClickMenu.Item>
                        <div onClick={e => handleAdd(e)}>
                            <span className="material-icons">add</span>
                            <span>add</span>
                        </div>
                    </RClickMenu.Item>
                    <RClickMenu.Item>
                        <div onClick={e => console.log("todo: add method")}>
                            <span className="material-icons">delete</span>
                            <span>delete</span>
                        </div>
                    </RClickMenu.Item>
                </RClickMenu>}

            {toggleCreate &&
                <CreateCategoryModal display='block' displayToggle={setToggleCreate} parentCategory={selectedCategory}/>
            }

            <h2>Categories</h2>
            {props.error !== ''? <p>{props.error}</p> : category.loading? <p>Loading...</p>:
                <CategoryListStyle noOffset categories={categoriesById} openSideMenu={openSideMenu}/>
            }
            
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);