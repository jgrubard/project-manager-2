import io from 'socket.io-client';
// const url = 'http://localhost:3000'
const url = window.location.origin;

const socket = io.connect(url);

import store, { updateTask, createTask, deleteTask } from './src/store';

socket.on('connect', () => {
  console.log('client connected to server', socket.id);
});

socket.on('task-created', _task => {
  store.dispatch(createTask(_task));
});

socket.on('task-updated', task => {
  const project = store.getState().project;
  console.log('should update task', project.id === task.projectId);
  if(project.id === task.projectId) {
    store.dispatch(updateTask(task));
  }
});

socket.on('task-deleted', taskId => {
  store.dispatch(deleteTask(taskId));
});

export default socket;