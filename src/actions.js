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
  api.signUp(name, email, password).then((response) => {
    dispatch({
      type: constans.USER_SIGNUP_SUCCESS,
      data: response.data
    })
  }).catch((err) => {
    dispatch({
      type: constans.USER_SIGNUP_FAIL,
      error: err.response.data
    })
  })
};