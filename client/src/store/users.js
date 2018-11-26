import axios from 'axios';

import { FETCH_USERS, ADD_USER } from './constants';

const fetchUsers = users => ({ type: FETCH_USERS, users });

export const addUser = user => ({ type: ADD_USER, user });

export const fetchUsersFromServer = () => async dispatch => {
  try {
    const response = await axios.get('/api/users');
    const users = response.data;
    dispatch(fetchUsers(users));
  } catch(err) {
    console.log(err);
  }
}

const store = (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.users;
    case ADD_USER:
      return [ ...state, action.user ];
    default:
      return state;
  }
}

export default store;