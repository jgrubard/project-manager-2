import axios from 'axios';
import socket from '../../socket';
// socket.emit();

import { GOT_USER } from './constants';
import { addUser } from './users';

export const gotUser = user => ({ type: GOT_USER, user });

export const signup = (credentials) => async dispatch => {
  try {
    const response = await axios.post('/api/sessions/signup', credentials)
    const token = response.data;
    window.localStorage.setItem('token', token);
    const user = await dispatch(getUserFromToken(token));
    await dispatch(addUser(user));
  } catch(err) {
    console.log(err);
    window.localStorage.removeItem('token');
  }
}

export const attemptLogin = (credentials, history) => async dispatch => {
  try {
    const response = await axios.post('/api/sessions/login', credentials)
    const token = response.data;
    window.localStorage.setItem('token', token);
    await dispatch(getUserFromToken(token, history));
  } catch (err) {
    window.localStorage.removeItem('token');
  }
}

export const getUserFromToken = (token, history) => async dispatch => {
  try {
    const response = await axios.get(`/api/sessions/${token}`)
    const user = await response.data;
    dispatch(gotUser(user));
    // if(user.id) {
    //   socket.emit('user-online', user.id);
    // }
    return user;
  } catch(err) {
    console.log(err);
    window.localStorage.removeItem('token');
  }
}

export const logoutUser = (history) => dispatch => {
  window.localStorage.removeItem('token');
  dispatch(gotUser({}));
  history.push('/');
}

const store = (state = {}, action) => {
  switch(action.type) {
    case GOT_USER:
      if(action.user === '') {
        window.localStorage.removeItem('token');
        return {};
      }
      return action.user;
    default:
      return state;
  }
}

export default store;