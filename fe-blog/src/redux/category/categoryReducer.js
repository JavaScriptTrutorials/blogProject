import {
    FETCH_CREATE_CATEGORY_REQUEST,
    FETCH_CREATE_CATEGORY_SUCCESS,
    FETCH_CREATE_CATEGORY_FAILURE,
    FETCH_GET_CATEGORIES_REQUEST,
    FETCH_GET_CATEGORIES_SUCCESS,
    FETCH_GET_CATEGORIES_FAILURE
} from './categoryTypes';

const initState = {
    loading: false,
    error: '',
    categories: []
};

const reducer = (state=initState, action) => {
    switch(action.type){
        case FETCH_CREATE_CATEGORY_REQUEST:
        case FETCH_GET_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case FETCH_CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                categories: [...state.categories, action.payload.category]
            };
        case FETCH_GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                categories: action.payload.categories
            };
        case FETCH_CREATE_CATEGORY_FAILURE:
        case FETCH_GET_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default: return state;
    }
};

export default reducer;