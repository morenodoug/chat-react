import { combineReducers } from 'redux';
import { SET_USER_INFO } from './actions';
import { ADD_CHAT_USER, REMOVE_CHAT_USER, SET_CHAT_LIST } from './actions';
import { ADD_CONVERSATION_MESSAGE } from './actions'

import * as constans from './constans'

let defaultUser = {
    name: "",
    email: "",
    id: null
};

function user(state = defaultUser, action) {
    switch (action.type) {
        case (SET_USER_INFO):
            return { 
                name: action.user.name,
                email: action.user.email,
                id: action.user.id,

            };

        default:
            return state;

    }
}

function isAuthenticate(state = false, action) {

    switch (action.type) {

        case constans.USER_SIGNUP_FAIL:
            return action.isAuthenticate

        case constans.AUTHENTICATE_STATUS:
            return action.isAuthenticate

        default:
            return state


    }
}

function chatUsers(state = {}, action) {
    switch (action.type) {
        case ADD_CHAT_USER:
            return Object.assign({}, state, action.chatUser)

        case REMOVE_CHAT_USER:
            let newState = Object.assign({}, state);
            delete newState[action.chatUser]
            return newState;

        case SET_CHAT_LIST:
            return action.chatList
        default:
            return state
    }



}

function conversation(state = [], action) {
    switch (action.type) {
        case ADD_CONVERSATION_MESSAGE:
            let newState = state.slice()
            newState.push(action.message);
            return newState;

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user,
    isAuthenticate,
    chatUsers,
    conversation
});
export default rootReducer;