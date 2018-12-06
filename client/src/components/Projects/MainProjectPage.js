import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskColumn from '../Tasks/TaskColumn';
import CreateTask from '../Tasks/CreateTask';
import EditProject from './EditProject';
import { getTasksFromServer, clearTasks, setCurrentProject } from '../../store';

import { Button } from '../Library';

class MainProjectPage extends Component {
  constructor() {
    super();
    this.state = {
      taskModalActive: false,
      projectModalActive: false,
      counter: 0
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleProjectModal = this.toggleProjectModal.bind(this);
  }

  componentDidMount() {
    const { loadTasks, projectId, project, loadProject, user } = this.props;
    if(projectId) loadTasks(projectId);
    if(project) loadProject(project, user.id);
  }

  componentWillUnmount() {
    const { clearTasks, loadProject, project } = this.props;
    clearTasks();
    if(project) loadProject({}, null, project.id);
  }

  componentDidUpdate(prevProps) {
    const { projectId, loadTasks, loadProject, project, user } = this.props;
    console.log('CDU - project & tasks will load:', prevProps.projectId !== projectId && project);
    if(prevProps.projectId !== projectId) {
      loadTasks(projectId);
    }
    if(project) {
      loadProject(project, user.id);
    }
  }

  toggleModal(ev) {
    ev.preventDefault();
    const { taskModalActive } = this.state;
    this.setState({ taskModalActive: !taskModalActive });
  }

  toggleProjectModal() {
    const { projectModalActive } = this.state;
    this.setState({ projectModalActive: !projectModalActive });
  }

  render() {
    const { project } = this.props;
    const { toggleModal, toggleProjectModal } = this;
    if(!project) return null;
    return (
      <div className='main-page-container'>
        <div className='project-nav'>
          <span className='project-title'>{project.name}</span>
          <Button
            label='Project Settings'
            onClick={toggleProjectModal}
            active={true}
            long={true}
            style={{ float: 'right' }}
          />
          <Button
            label='New Task'
            onClick={toggleModal}
            active={true}
            style={{ float: 'right' }}
          />
        </div>
        <div className='task-row'>
          <TaskColumn name='New Tasks' colId={1} projectId={project.id} />
          <TaskColumn name='In-Progress' colId={2} projectId={project.id} />
          <TaskColumn name='Review' colId={3} projectId={project.id} />
          <TaskColumn name='Completed' colId={4} projectId={project.id} />
        </div>
        <div>
        {
          this.state.taskModalActive &&
            <div className='modal-container modal-project'>
              <CreateTask toggleModal={toggleModal} project={project} />
            </div>
        }
        {
          this.state.projectModalActive &&
            <EditProject toggleProjectModal={toggleProjectModal} project={project}/>
        }
        </div>

      </div>
    );
  }
}

const mapState = ({ user, projects }, { projectId }) => {
  const project = projects.find(p => p.id === projectId);
  return { user, project, projects }
}

const mapDispatch = dispatch => {
  return {
    loadTasks: (projectId) => dispatch(getTasksFromServer(projectId)),
    clearTasks: () => dispatch(clearTasks()),
    loadProject: (project, userId, oldProjectId) => dispatch(setCurrentProject(project, userId, oldProjectId))
  }
}

export default connect(mapState, mapDispatch)(MainProjectPage);