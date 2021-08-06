import {
    FETCH_CREATE_CATEGORY_REQUEST,
    FETCH_CREATE_CATEGORY_SUCCESS,
    FETCH_CREATE_CATEGORY_FAILURE,
    FETCH_GET_CATEGORIES_REQUEST,
    FETCH_GET_CATEGORIES_SUCCESS,
    FETCH_GET_CATEGORIES_FAILURE
} from './categoryTypes';

import {
    apiLinkRoot, apiLinkPathEntrance, httpRequestJson
} from '../../utils/fetch.utils';

// Actions for creating category
export const fetchCreateCategoryRequest = () => {
    return {
        type: FETCH_CREATE_CATEGORY_REQUEST
    };
};

export const fetchCreateCategorySuccess = category => {
    return {
        type: FETCH_CREATE_CATEGORY_SUCCESS,
        payload: category
    };
};

export const fetchCreateCategoryFailure = error => {
    console.log(error.message);
    return {
        type: FETCH_CREATE_CATEGORY_FAILURE,
        payload: error
    };
};
export const fetchCreateCategory = category => {
    let statusOk;
    return dispatch => {
        dispatch(fetchCreateCategoryRequest());

        fetch(`${apiLinkRoot}${apiLinkPathEntrance.category}`, httpRequestJson.post(category))
        .then(response => {
            statusOk = response.ok;
            return response.json();
        })
        .then(data => {
            console.log(data);
            if(statusOk){
                dispatch(fetchCreateCategorySuccess(data));
            } else {
                dispatch(fetchCreateCategoryFailure(data.message));
            }
        })
        .catch(err => dispatch(fetchCreateCategoryFailure(err.message)));
    };
};

// actions for getting categories
export const fetchGetCategoriesRequest = () => {
    return {
        type: FETCH_GET_CATEGORIES_REQUEST
    };
};

export const fetchGetCategoriesSuccess = categories => {
    return {
        type: FETCH_GET_CATEGORIES_SUCCESS,
        payload: categories
    };
};

export const fetchGetCategoriesFailure = error => {
    return {
        type: FETCH_GET_CATEGORIES_FAILURE,
        payload: error
    };
};
export const fetchGetCategories = category => {
    let statusOk;
    return dispatch => {
        dispatch(fetchGetCategoriesRequest());

        fetch(`${apiLinkRoot}${apiLinkPathEntrance.category}`, httpRequestJson.get())
        .then(response => {
            statusOk = response.ok;
            return response.json();
        })
        .then(data => {
            console.log(data);
            if(statusOk){
                dispatch(fetchGetCategoriesSuccess(data));
            } else {
                dispatch(fetchGetCategoriesFailure(data));
            }
        })
        .catch(err => dispatch(fetchGetCategoriesFailure(err.message)));
    };
};