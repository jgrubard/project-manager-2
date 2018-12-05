import { SET_PROJECT } from './constants';
import socket from '../../socket';

export const setProject = (project) => ({ type: SET_PROJECT, project });

export const setCurrentProject = (project, userId, oldProjectId) => dispatch => {
  // console.log('user id', userId);
  dispatch(setProject(project));
  // const projectId = project.id;
  socket.emit('join-project', project.id, userId);
  if(oldProjectId) socket.emit('leave-project', oldProjectId, userId);
}

const store = (state = {}, action) => {
  switch(action.type) {
    case SET_PROJECT:
      return action.project;
    default:
      return state;
  }
}

export default store;