import axios from 'axios';
import socket from '../../socket';
import { FETCH_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from './constants';

const fetchTasks = tasks => ({ type: FETCH_TASKS, tasks });
export const createTask = task => ({ type: CREATE_TASK, task });
export const updateTask = task => ({ type: UPDATE_TASK, task });
export const deleteTask = taskId => ({ type: DELETE_TASK, taskId });

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
    socket.emit('task-created', _task);
  } catch(err) {
    console.log('ERROR CREATING TASK:', err);
  }
}

export const updateTaskOnServer = (taskId, updatedTask, projectId) => async dispatch => {
  try {
    const response = await axios.put(`/api/projects/${projectId}/tasks/${taskId}`, updatedTask)
    const task = response.data;
    dispatch(updateTask(task));
    socket.emit('task-updated', task);
  } catch(err) {
    console.log('ERROR UPDATING TASK:', err);
  }
}

export const deleteTaskFromServer = (taskId, projectId) => async dispatch => {
  try {
    await axios.delete(`/api/projects/${projectId}/tasks/${taskId}`);
    await dispatch(deleteTask(taskId));
    socket.emit('task-deleted', taskId);
  } catch(err) {
    console.log('ERROR DELETING TASK:', err);
  }
}

export const clearTasks = () => dispatch => {
  try {
    dispatch(fetchTasks([]))
  } catch(err) {
    console.log('ERROR CLEARING TASKS:', err);
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
    case DELETE_TASK:
      return state.filter(task => action.taskId !== task.id);
    default:
      return state;
  }
}

export default store;