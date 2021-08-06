import {useState} from 'react';
import {connect} from 'react-redux';
import {fetchCreateCategory} from '../../redux/category/categoryActions';

const CreateCategory = props => {

    const [name, setName] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        console.log('new category', name);
        props.create({name});
    }

    return (
        <div>
            {props.category.loading && <p>Creating...</p>}
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