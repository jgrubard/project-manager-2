import axios from 'axios';

import { FETCH_PROJECTS, CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } from './constants';

const fetchProjects = projects => ({ type: FETCH_PROJECTS, projects });
const createProject = project => ({ type: CREATE_PROJECT, project });
const updateProject = project => ({ type: UPDATE_PROJECT, project });
const deleteProject = id => ({ type: DELETE_PROJECT, id });

export const fetchProjectsFromServer = (userId) => async dispatch => {
  if(!userId) return null;
  try {
    const response = await axios.get(`/api/projects/${userId}`);
    const projects = await response.data;
    await dispatch(fetchProjects(projects));
  } catch(err) {
    console.log('ERROR GETTING PRODUCTS ON CLIENT', err);
  }
}

export const createProjectOnServer = (proj, userId) => async dispatch => {
  try {
    const response = await axios.post(`/api/projects/${userId}`, proj);
    const project = response.data;
    dispatch(createProject(project));
  } catch(err) {
    console.log('ERROR CREATING PROJECT', err);
  }
}

export const updateProjectOnServer = (proj, userId, usersToAdd, usersToRemove) => async dispatch => {
  try {
    const response = await axios.put(`/api/projects/${userId}/${proj.id}`, { proj, usersToAdd, usersToRemove });
    const project = response.data;
    dispatch(updateProject(project));
  } catch(err) {
    console.log('ERROR UPDATING PROJECT', err);
  }
}

export const deleteProjectFromServer = (projectId, userId) => async dispatch => {
  try {
    await axios.delete(`/api/projects/${userId}/${projectId}`)
    dispatch(deleteProject(projectId));
  } catch(err) {
    next(err);
  }
}

const store = (state = [], action) => {
  switch(action.type) {
    case FETCH_PROJECTS:
      return action.projects;
    case CREATE_PROJECT:
      return [ ...state, action.project ];
    case UPDATE_PROJECT:
      const projects = state.filter(project => project.id !== action.project.id)
      return [ ...projects, action.project ];
    case DELETE_PROJECT:
      return state.filter(project => project.id !== action.id);
    default:
      return state;
  }
}

export default store;