import io from 'socket.io-client';
// const url = 'http://localhost:3000'
const url = window.location.origin;

const socket = io.connect(url);


import store, { updateTaskOnServer, updateTask, createTask, deleteTask } from './src/store';

socket.on('connect', () => {
  console.log('client connected to server', socket.id);
});

socket.on('task-created', _task => {
  // store.dispatch(updateTaskOnServer(task.id, task, task.projectId));
  store.dispatch(createTask(_task));
});

socket.on('task-updated', data => {
  // store.dispatch(updateTaskOnServer(task.id, task, task.projectId));
  const { projectId, task } = data;
  // console.log(projectId, task);
  // let project;
  // store.subscribe(() => {
  //   project = store.getState().project;
  // });
  const project = store.getState().project;
  // console.log('project from socket:', project);
  // console.log('STORE:', store.getState())
  // console.log(project.id === projectId)
  if(project.id === projectId) {
    store.dispatch(updateTask(task));
  }
});

socket.on('task-deleted', taskId => {
  // store.dispatch(updateTaskOnServer(task.id, task, task.projectId));
  store.dispatch(deleteTask(taskId));
});

export default socket;