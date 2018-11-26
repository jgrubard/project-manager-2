import axios from 'axios';

import { FETCH_TASKS, CREATE_TASK } from './constants';

const fetchTasks = tasks => ({ type: FETCH_TASKS, tasks });
const createTask = task => ({ type: CREATE_TASK, task });

export const getTasksFromServer = (projectId) => async dispatch => {
  // console.log(projectId)
  try {
    const response = await axios(`/api/projects/${projectId}/tasks`);
    // console.log(response)
    const tasks = response.data;
    dispatch(fetchTasks(tasks));
  } catch(err) {
    console.log('ERROR FETCHING TASKS:', err);
  }
}

export const createTaskOnServer = (task) => async dispatch => {
  try {
    const response = await axios.post(`/api/projects/${task.projectId}/tasks`, task)
    const _task = response.data;
    dispatch(createTask(_task));
  } catch(err) {
    console.log('ERROR CREATING TASK:', err);
  }
}

const store = (state = [], action) => {
  switch(action.type) {
    case FETCH_TASKS:
      return action.tasks;
    case CREATE_TASK:
      return [ ...state, action.task ];
    default:
      return state;
  }
}

export default store;