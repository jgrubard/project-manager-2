import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateTaskOnServer } from '../../store';
import TaskCard from './TaskCard';

class TaskColumn extends Component {
  constructor() {
    super();
    this.state = { colId: '' };
    this.changeColumn = this.changeColumn.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
  }

  componentDidMount() {
    const { colId } = this.props;
    this.setState({ colId });
  }

  changeColumn(ev) {
    const colId = ev.target.value * 1;
    this.setState({ colId });
  }

  onSubmit(ev, taskId) {
    ev.preventDefault();
    const { updateTask } = this.props;
    const { colId } = this.state;
    updateTask(taskId, colId);
  }

  onDragStart(ev, taskId) {
    ev.dataTransfer.setData('taskId', taskId);
  }

  onDragOver(ev) {
    ev.preventDefault();
    const { colId } = this.props;
    this.setState({ colId });
  }

  onDrop(ev) {
    const taskId = ev.dataTransfer.getData('taskId');
    const { updateTask } = this.props;
    const { colId } = this.state;
    updateTask(taskId, { colId });
  }

  render() {
    const { name, ownTasks } = this.props;
    const { onDragStart, onDragOver, onDrop } = this;
    return (
      <div
        className='task-col'
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <h4 className='task-col-title'>{name}</h4>
        {
          ownTasks.map(task => {
            return (
              <div key={task.id}>
                <TaskCard task={task} onDragStart={onDragStart}/>
              </div>
            );
          })
        }
      </div>
    );
  }
}

const mapState = ({ tasks }, { colId }) => {
  const ownTasks = tasks.filter(task => task.colId === colId);
  return { ownTasks };
};

const mapDispatch = (dispatch, { projectId }) => {
  return {
    updateTask: (taskId, task) => dispatch(updateTaskOnServer(taskId, task, projectId))
  }
};

export default connect(mapState, mapDispatch)(TaskColumn);