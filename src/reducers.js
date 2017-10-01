import { combineReducers } from 'redux';
import { SET_USER_INFO } from './actions';

let defaultUser = {
    name: "",
    email: "",
    id: null
}

function user(state = defaultUser, action) {
    switch (action.type) {
        case (SET_USER_INFO):
            return {
                name: action.user.name,
                email: action.user.email,
                id: action.user.id,

            }
        default:
            return state;

    }
}

const rootReducer = combineReducers({
    user
});
export default rootReducer;