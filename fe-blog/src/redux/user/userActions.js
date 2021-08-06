import { 
    FETCH_USER_REGISTER_REQUEST, 
    FETCH_USER_REGISTER_SUCCESS, 
    FETCH_USER_REGISTER_FAILURE,
    FETCH_USER_LOGIN_REQUEST,
    FETCH_USER_LOGIN_SUCCESS,
    FETCH_USER_LOGIN_FAILURE,
    FETCH_USER_LOGOUT
} from "./userTypes";
import jwt from 'jsonwebtoken';

import {
    apiLinkRoot, apiLinkPathEntrance, httpRequestJson
} from '../../utils/fetch.utils';

// Actions for registration
export const fetchUserRegisterRequest = () => {
    return {
        type: FETCH_USER_REGISTER_REQUEST
    };
};

export const fetchUserRegisterSuccess = user => {
    return {
        type: FETCH_USER_REGISTER_SUCCESS,
        payload: user
    };
};

export const fetchUserRegisterFailure = error => {
    return {
        type: FETCH_USER_REGISTER_FAILURE,
        payload: error
    };
};
export const fetchUserRegistration = credentials => {
    let statusOk;
    return dispatch => {
        dispatch(fetchUserRegisterRequest());
        console.log(`${apiLinkRoot}${apiLinkPathEntrance.signup}`, credentials);

        fetch(`${apiLinkRoot}${apiLinkPathEntrance.signup}`, httpRequestJson.post(credentials))
        .then(response => {
            console.log(response);
            statusOk = response.ok;
            return response.json();
        })
        .then(data => {
            console.log(data);
            const dataFromToken = jwt.decode(data.token);
            if(statusOk){
                localStorage.setItem('jwt', data.token);
                dispatch(fetchUserRegisterSuccess(dataFromToken));
            } else {
                dispatch(fetchUserRegisterFailure(data.errors));
            }
        })
        .catch(err => dispatch(fetchUserRegisterFailure(err.message)));
    };
};

// Actions for login
export const fetchUserLoginRequest = () => {
    return {
        type: FETCH_USER_LOGIN_REQUEST
    };
};

export const fetchUserLoginSuccess = user => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: user
    };
};

export const fetchUserLoginFailure = error => {
    return {
        type: FETCH_USER_LOGIN_FAILURE,
        payload: error
    };
};

export const fetchUserLogin = credentials => {
    let statusOk;
    return dispatch => {
        dispatch(fetchUserLoginRequest());

        fetch(`${apiLinkRoot}${apiLinkPathEntrance.login}`, httpRequestJson.post(credentials))
        .then(response => {
            console.log(response);
            statusOk = response.ok;
            return response.json();
        })
        .then(data => {
            console.log(data);
            const dataFromToken = jwt.decode(data.token);
            if(statusOk){
                localStorage.setItem('jwt', data.token);
                dispatch(fetchUserLoginSuccess(dataFromToken));
            } else {
                dispatch(fetchUserLoginFailure(data.errors));
            }
        })
        .catch(err => dispatch(fetchUserLoginFailure(err.message)));
    };
};

// logout
export const fetchUserLogOut = () => {
    localStorage.removeItem('jwt');
    return {
        type: FETCH_USER_LOGOUT
    };
}