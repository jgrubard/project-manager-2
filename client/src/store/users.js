import axios from 'axios';

import { FETCH_USERS, ADD_USER, UPDATE_USER } from './constants';
import { gotUser } from './sessions';

const fetchUsers = users => ({ type: FETCH_USERS, users });

export const addUser = user => ({ type: ADD_USER, user });
export const updateUser = user => ({ type: UPDATE_USER, user });

export const fetchUsersFromServer = () => async dispatch => {
  try {
    const response = await axios.get('/api/users');
    const users = response.data;
    dispatch(fetchUsers(users));
  } catch(err) {
    console.log(err);
  }
}

export const updateUserOnServer = (userId, userData) => async dispatch => {
  try {
    const response = await axios.put(`/api/users/${userId}`, userData)
    const user = response.data;
    dispatch(updateUser(user));
    dispatch(gotUser(user));
  } catch(err) {
    console.log('ERROR UPDATING USER', err);
  }
}

const store = (state = [], action) => {
  let users;
  switch (action.type) {
    case FETCH_USERS:
      return action.users;
    case ADD_USER:
      return [ ...state, action.user ];
    case UPDATE_USER:
      users = state.filter(user => user.id !== action.user.id);
      return [ ...users, action.user ];
    default:
      return state;
  }
}

export default store;