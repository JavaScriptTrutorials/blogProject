import {
    FETCH_CREATE_CATEGORY_REQUEST,
    FETCH_CREATE_CATEGORY_SUCCESS,
    FETCH_CREATE_CATEGORY_FAILURE,
    FETCH_GET_CATEGORIES_REQUEST,
    FETCH_GET_CATEGORIES_SUCCESS,
    FETCH_GET_CATEGORIES_FAILURE,
    ADD_EXPANDED_CATEGORIES,
    REMOVE_EXPANDED_CATEGORIES
} from './categoryTypes';

const initState = {
    loading: false,
    error: '',
    createError: '',
    categories: [],
    expanded: []
};

const reducer = (state=initState, action) => {
    switch(action.type){
        case FETCH_CREATE_CATEGORY_REQUEST:
        case FETCH_GET_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                createError: '',
            };
        case FETCH_CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                createError: '',
                categories: [...state.categories, action.payload.category]
            };
        case FETCH_GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                createError: '',
                categories: action.payload.categories
            };
        case FETCH_CREATE_CATEGORY_FAILURE:
            return {
                ...state,
                createError: action.payload,
                loading: false,
            }
        case FETCH_GET_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADD_EXPANDED_CATEGORIES:
            return {
                ...state,
                expanded: [...state.expanded, action.payload]
            }
        case REMOVE_EXPANDED_CATEGORIES:
            return {
                ...state,
                expanded: state.expanded.filter((expand) => expand !== action.payload)
            }
        default: return state;
    }
};

export default reducer;