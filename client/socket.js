import io from 'socket.io-client';
// const url = 'http://localhost:3000'
const url = window.location.origin;

const socket = io.connect(url);

import store, { createProject, updateProject, deleteProject, updateTask, createTask, deleteTask } from './src/store';

socket.on('connect', () => {
  console.log('client connected to server', socket.id);
});

// const project = store.getState().project;
// if(!!project.id) {
//   socket.join(`project-room ${project.id}`);
// }

// socket.on('join-project', projectId => {

// })

socket.on('project-created', project => {
  const projects = store.getState().projects;
  const _project = projects.find(p => p.id === project.id);
  const createOrUpdate = _project ? updateProject : createProject;
  store.dispatch(createOrUpdate(project));
  // if(_project) store.dispatch(updateProject(project));
  // else store.dispatch(createProject(project));
});

socket.on('project-deleted', projectId => {
  store.dispatch(deleteProject(projectId));
});

socket.on('task-created', _task => {
  store.dispatch(createTask(_task));
});

socket.on('task-updated', task => {
  const project = store.getState().project; // this is not being set
  console.log(project);
  console.log(project.id, task.projectId)
  console.log('should update task', project.id === task.projectId);
  if(project.id === task.projectId) {
    store.dispatch(updateTask(task));
  }
});

socket.on('task-deleted', taskId => {
  store.dispatch(deleteTask(taskId));
});

export default socket;