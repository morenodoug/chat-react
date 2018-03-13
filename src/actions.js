import api from './api'
import * as constans from './constans';
import * as moment from 'moment';

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

export function addChatUser(newUser) {
    return {
        type: ADD_CHAT_USER,
        chatUser: newUser
    }
}

export const REMOVE_CHAT_USER = 'REMOVE_CHAT_USER';

export function removeChatUser(id) {
    return {
        type: REMOVE_CHAT_USER,
        chatUser: id
    }
}

export const SET_CHAT_LIST = 'SET_CHAT_LIST';

export function setChatListCreator(chatList) {

    return {
        type: SET_CHAT_LIST,
        chatList
    }
}


/**
 * MANEJAR CONVERSATIONS
 */

export const ADD_CONVERSATION_MESSAGE = 'ADD_CONVERSATION_MESSAGE';
export function addConversationMessage(userInfo, message) {
    return {
        type: ADD_CONVERSATION_MESSAGE,
        message: {
            userInfo,
            message: message,
            date: '11111' //moment.moment().format('d m yyyy')
        }

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