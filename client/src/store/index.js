import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import users from './users';
import user from './sessions';
import projects from './projects';
import userProjects from './userProjects';
import tasks from './tasks';
import project from './project';

const middleware = applyMiddleware(thunk, logger);
const reducers = combineReducers({ user, users, projects, userProjects, tasks, project });

const store = createStore(reducers, middleware);

export default store;

export * from './users';
export * from './sessions';
export * from './projects';
export * from './userProjects';
export * from './tasks';
export * from './project';