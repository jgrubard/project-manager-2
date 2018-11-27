import axios from 'axios';

import { FETCH_TASKS, CREATE_TASK, UPDATE_TASK } from './constants';

const fetchTasks = tasks => ({ type: FETCH_TASKS, tasks });
const createTask = task => ({ type: CREATE_TASK, task });
const updateTask = task => ({ type: UPDATE_TASK, task })

export const getTasksFromServer = (projectId) => async dispatch => {
  try {
    const response = await axios(`/api/projects/${projectId}/tasks`);
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

export const updateTaskOnServer = (taskId, colId, projectId) => async dispatch => {
  try {
    const response = await axios.put(`/api/projects/${projectId}/tasks/${taskId}`, { colId })
    const task = response.data;
    dispatch(updateTask(task));
  } catch(err) {
    console.log('ERROR UPDATING TASK:', err);
  }
}

const store = (state = [], action) => {
  let tasks;
  switch(action.type) {
    case FETCH_TASKS:
      return action.tasks;
    case CREATE_TASK:
      return [ ...state, action.task ];
    case UPDATE_TASK:
      tasks = state.filter(task => action.task.id !== task.id);
      return [ ...tasks, action.task ];
    default:
      return state;
  }
}

export default store;