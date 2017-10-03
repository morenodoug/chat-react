import api from './api'
import * as constans from './constans';

export const SET_USER_INFO = "SET_USER_INFO";

export function setUserInfo(user) {
    return {
        type: SET_USER_INFO,
        user
    }
}

export const signUP = (name, email, password) => (dispatch, getState) => {

    let response = {}
    return api.signUp(name, email, password).then((response) => {
        console.log(response);
        dispatch(authenticatedSuccess(response.data));
        return response;

    }).catch((err) => {
        console.log(err.response);
        // dispatch({
        //     type: constans.USER_SIGNUP_FAIL,
        //     error: err.response.data
        // })
        return err.response
    })
};

export function userSignUpFail() {
    return {
        type: constans.USER_SIGNUP_FAIL,
        isAuthenticate: false

    }
}

export function userSignUpSucces() {
    return {
        type: constans.USER_SIGNUP_SUCCESS,
        isAuthenticate: true
    }
}

export const authenticatedSuccess = (userData) => (dispatch, getState) => {
    console.log('asdasdasd')
    dispatch(userSignUpSucces())
    dispatch(setUserInfo({ name: userData.name, email: userData.email, id: userData.id }))

}