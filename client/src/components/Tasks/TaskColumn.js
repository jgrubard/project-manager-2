import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Button } from '../Library';

import { updateTaskOnServer } from '../../store';

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
    updateTask(taskId, colId);
  }

  render() {
    const { name, colId, ownTasks } = this.props;
    const colIds = [1, 2, 3, 4];
    const columns = {
      '1': 'New Tasks',
      '2': 'In-Progress',
      '3': 'Review',
      '4': 'Completed'
    }
    return (
      <div
        className='task-col droppable'
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        <h4>{name}</h4>
        {
          ownTasks.map(task => {
            return (
              <div
                draggable
                key={task.id}
                style={{ height: '75px', backgroundColor: 'white', margin: '5px', padding: '5px' }}
                onDragStart={(ev) => this.onDragStart(ev, task.id)}
              >
                {task.name}
                <select onChange={this.changeColumn}>
                  <option>
                    Change Column
                  </option>
                  {
                    Object.keys(columns).map(colNum => {
                      return (
                        <option key={colNum} value={colNum}>
                          {columns[colNum]}
                        </option>
                      );
                    })
                  }
                </select>
                <Button
                  label='Update'
                  onClick={(ev) => this.onSubmit(ev, task.id)}
                  active={true}
                />
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
    updateTask: (taskId, colId) => dispatch(updateTaskOnServer(taskId, colId, projectId))
  }
};

export default connect(mapState, mapDispatch)(TaskColumn);