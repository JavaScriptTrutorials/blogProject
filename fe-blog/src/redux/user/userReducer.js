import { 
    FETCH_USER_REGISTER_REQUEST, 
    FETCH_USER_REGISTER_SUCCESS, 
    FETCH_USER_REGISTER_FAILURE,
    FETCH_USER_LOGIN_REQUEST,
    FETCH_USER_LOGIN_SUCCESS,
    FETCH_USER_LOGIN_FAILURE,
    FETCH_USER_LOGOUT
} from "./userTypes";

const initState = {
    isAuthenticated: false,
    loading: false,
    data: {},
    error: ''
};

const reducer = (state = initState, action) => {
    switch(action.type){
        case FETCH_USER_REGISTER_REQUEST:
        case FETCH_USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case FETCH_USER_REGISTER_SUCCESS:
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                error: '',
                data: action.payload
            }
        case FETCH_USER_REGISTER_FAILURE:
        case FETCH_USER_LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                data: {},
                error: action.payload
            }
        case FETCH_USER_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                data: {},
                error: ''
            }
        default: return state;
    }
};

export default reducer;

