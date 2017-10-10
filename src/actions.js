import api from './api'
import * as constans from './constans';

export const SET_USER_INFO = "SET_USER_INFO";

export function setUserInfo(user) {
    return {
        type: SET_USER_INFO,
        user
    }
}
/**
 * manejar chat users
 */

export const ADD_CHAT_USER = 'ADD_CHAT_USER';

export function addChatUser(id, email, name) {
    return {
        type: ADD_CHAT_USER,
        chatUser: {
            id,
            email,
            name

        }
    }
}

export const REMOVE_CHAT_USER = 'REMOVE_CHAT_USER';

export function removeChatUser(id) {
    return {
        type: REMOVE_CHAT_USER,
        chatUser: id
    }
}



export function userSignUpFail() {
    return {
        type: constans.USER_SIGNUP_FAIL,
        isAuthenticate: false

    }
}

export function userSignUpSucces() {
    return {
        type: constans.AUTHENTICATE_STATUS,
        isAuthenticate: true
    }
}


/**
 * REDUX THUNK 
 */
export const authenticateSuccess = (userData) => (dispatch, getState) => {
    localStorage.setItem('jwt', userData.token);

    dispatch(setUserInfo(userData))

    // window.location.assign('/');

}

export const signUP = (name, email, password) => (dispatch, getState) => {


    return api.signUp(name, email, password).then((response) => {

        dispatch(authenticateSuccess(response.data));
        return response;

    }).catch((err) => {

        return err.response
    })
};

export const signIn = (email, password) => (dispatch, getState) => {

    return api.signIn(email, password).then((response) => {
        dispatch(authenticateSuccess(response.data))

        return response;
    }).catch((err) => {
        return err.response;
    })
}

export const getMyProfile = () => (dispatch, getState) => {

    return api.getMyProfile().then((response) => {
        dispatch(authenticateSuccess(response.data));
        return response;
    }).catch((err) => {
        return err.response;
    })
}