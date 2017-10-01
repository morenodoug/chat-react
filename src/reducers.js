import { combineReducers } from 'redux';
import { SET_USER_INFO } from './actions';
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

    case constans.USER_SIGNUP_SUCCESS:
      console.log('success');
      console.log(action.data);
      return state;

    case constans.USER_SIGNUP_FAIL:
      console.log('error');
      console.log(action.error);
      return state;

    default:
      return state;

  }
}

const rootReducer = combineReducers({
  user
});
export default rootReducer;