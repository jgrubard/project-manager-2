import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Button } from '../Library';

import { updateTaskOnServer } from '../../store';

class TaskColumn extends Component {
  constructor() {
    super();
    this.state = {
      colId: ''
    }
    this.changeColumn = this.changeColumn.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ colId: this.props.colId });
  }

  changeColumn(ev) {
    // console.log(ev.target.value);
    this.setState({ colId: ev.target.value * 1 });
    // console.log('onChange:', this.state)
  }

  onSubmit(ev, taskId) {
    ev.preventDefault();
    // console.log(taskId);
    this.props.updateTask(taskId, this.state.colId);
  }

  render() {
    const { name, colId, ownTasks } = this.props;
    const colIds = [1, 2, 3, 4];
    console.log(this.state);
    return (
      <div className='task-col'>
        <h4>{name}</h4>
        {
          ownTasks.map(task => {
            return (
              <div key={task.id} style={{ height: '75px', backgroundColor: 'white', margin: '5px', padding: '5px' }}>
                {task.name}
                <select onChange={this.changeColumn}>
                  <option>
                    Change Column
                  </option>
                  {
                    colIds.map(id => {
                      return (
                        <option key={id} value={id}>
                          {id}
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
  return {
    ownTasks
  }
}

const mapDispatch = (dispatch, { projectId }) => {
  return {
    updateTask: (taskId, colId) => dispatch(updateTaskOnServer(taskId, colId, projectId))
  }
};

export default connect(mapState, mapDispatch)(TaskColumn);