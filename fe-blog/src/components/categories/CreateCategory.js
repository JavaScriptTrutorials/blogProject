import {useState} from 'react';
import {connect} from 'react-redux';
import {fetchCreateCategory} from '../../redux/category/categoryActions';

const CreateCategory = props => {

    const [name, setName] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        console.log('new category', name);
        if(props.parentCategory){
            props.create({name, parentCategory: props.parentCategory});
        } else {
            props.create({name});
        }
        

    }

    const handleClose = (e) => {
        console.log(e.target.tagName);
        if(e.target.className.includes('modal') || e.target.tagName==='SPAN'){
            props.displayToggle(false);
        }
    }

    return (
        <div className={`${props.className} modal` } onClick={(e) => handleClose(e)}>
            <div className='modal-content'>
            <span className="close" onClick={(e) => handleClose(e)}>&times;</span>
            {props.category.loading && <p>Creating...</p>}
            {props.category.createError !== "" && <p>{props.category.createError}</p>}
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label htmlFor="name">Category name</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)}/>
                </div>
                <div>
                    <button>Create new category</button>
                </div>
            </form>
            </div>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        category: state.category
    };
};

const mapDispatchToProps = dispatch => {
    return {
        create: (data) => {dispatch(fetchCreateCategory(data))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory);