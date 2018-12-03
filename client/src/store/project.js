import { SET_PROJECT, GET_PROJECT } from './constants';

export const setProject = (project) => ({ type: SET_PROJECT, project });

const store = (state = {}, action) => {
  switch(action.type) {
    case SET_PROJECT:
      return action.project;
    default:
      return state;
  }
}

export default store;