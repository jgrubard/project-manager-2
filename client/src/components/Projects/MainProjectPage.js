import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskColumn from '../Tasks/TaskColumn';
import CreateTask from '../Tasks/CreateTask';
import { getTasksFromServer } from '../../store';

import { Button } from '../Library';

class MainProjectPage extends Component {
  constructor() {
    super();
    this.state = {
      modalActive: false,
      counter: 0
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    const { loadTasks, projectId, location } = this.props;
    console.log('location.state:', location.state);
    // console.log(this.props.history.pathname);
    if(projectId) loadTasks(projectId);
  }

  componentDidUpdate(prevProps) {
    const { projectId, loadTasks } = this.props;
    if(prevProps.projectId !== projectId) {
      loadTasks(projectId);
    }
  }

  toggleModal(ev) {
    ev.preventDefault();
    this.setState({ modalActive: !this.state.modalActive });
  }

  render() {
    const { project, toggleDashboard, showDash } = this.props;
    const { toggleModal } = this;
    const toggleMessage = showDash ? 'hide' : 'show';
    if(!project) return null;
    return (
      <div style={{ padding: '10', marginTop: '75px' }}>
        <div>
          <h2>Main Project Page: {project.name}</h2>
          <span style={{ cursor: 'pointer' }} onClick={toggleDashboard}>({toggleMessage} dashboard menu)</span>
          <Button
            label='New Task'
            onClick={toggleModal}
            active={true}
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
          this.state.modalActive &&
            <div className='modal-container modal-project'>
              <CreateTask toggleModal={toggleModal} project={project} />
            </div>
        }
        </div>

      </div>
    );
  }
}

const mapState = ({ projects }, { projectId, location }) => {
  console.log(location.pathname)
  const project = projects.find(p => p.id === projectId);
  return { project }
}

const mapDispatch = dispatch => {
  return {
    loadTasks: (projectId) => dispatch(getTasksFromServer(projectId))
  }
}

export default connect(mapState, mapDispatch)(MainProjectPage);