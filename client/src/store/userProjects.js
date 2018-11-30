import axios from 'axios';
import { FETCH_USER_PROJECTS } from './constants';

const fetchUserProjects = userProjects => ({ type: FETCH_USER_PROJECTS, userProjects });

export const getAllUsersOnProjectFromServer = (projectId, userId) => async dispatch => {
  try {
    const response = await axios.get(`/api/userProjects/${projectId}/${userId}`);
    const userProjects = await response.data;
    dispatch(fetchUserProjects(userProjects));
    return userProjects;
  } catch(err) {
    console.log('ERROR LOADING USER PROJECTS', err);
  }
}

const store = (state = [], action) => {
  switch(action.type) {
    case FETCH_USER_PROJECTS:
      return action.userProjects;
    default:
      return state;
  }
}

export default store;